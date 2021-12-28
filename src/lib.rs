use image::{DynamicImage, Rgba};
use imageproc::drawing::draw_text_mut;
use lenna_core::plugins::PluginRegistrar;
use lenna_core::ProcessorConfig;
use lenna_core::{core::processor::ExifProcessor, core::processor::ImageProcessor, Processor};
use rusttype::{Font, Scale};
use std::io::Cursor;
use tract_onnx::prelude::*;

extern "C" fn register(registrar: &mut dyn PluginRegistrar) {
    registrar.add_plugin(Box::new(MobileNet::default()));
}

lenna_core::export_plugin!(register);

type ModelType = SimplePlan<TypedFact, Box<dyn TypedOp>, Graph<TypedFact, Box<dyn TypedOp>>>;

#[derive(Clone)]
pub struct MobileNet {
    model: ModelType,
}

impl MobileNet {
    pub fn model() -> ModelType {
        let data = include_bytes!("../assets/mobilenetv2-7.onnx");
        let mut cursor = Cursor::new(data);
        let model = tract_onnx::onnx()
            .model_for_read(&mut cursor)
            .unwrap()
            .with_input_fact(
                0,
                InferenceFact::dt_shape(f32::datum_type(), tvec!(1, 3, 224, 224)),
            )
            .unwrap()
            .into_optimized()
            .unwrap()
            .into_runnable()
            .unwrap();
        model
    }

    pub fn labels() -> Vec<String> {
        let collect = include_str!("../assets/imagenet_slim_labels.txt")
            .to_string()
            .lines()
            .map(|s| s.to_string())
            .collect();
        collect
    }
}

impl Default for MobileNet {
    fn default() -> Self {
        MobileNet {
            model: Self::model(),
        }
    }
}

impl ImageProcessor for MobileNet {
    fn process_image(
        &self,
        image: &mut Box<DynamicImage>,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let image_rgb = image.to_rgb8();
        let resized = image::imageops::resize(
            &image_rgb,
            224,
            224,
            ::image::imageops::FilterType::Triangle,
        );
        let tensor: Tensor =
            tract_ndarray::Array4::from_shape_fn((1, 3, 224, 224), |(_, c, y, x)| {
                let mean = [0.485, 0.456, 0.406][c];
                let std = [0.229, 0.224, 0.225][c];
                (resized[(x as _, y as _)][c] as f32 / 255.0 - mean) / std
            })
            .into();

        let result = self.model.run(tvec!(tensor)).unwrap();
        let best = result[0]
            .to_array_view::<f32>()?
            .iter()
            .cloned()
            .zip(1..)
            .max_by(|a, b| a.0.partial_cmp(&b.0).unwrap());
        let index = best.unwrap().1;
        let label = Self::labels()[index].to_string();
        println!("{}", label);

        let mut img = DynamicImage::ImageRgba8(image.to_rgba8());

        let font = Vec::from(include_bytes!("../assets/DejaVuSans.ttf") as &[u8]);
        let font = Font::try_from_vec(font).unwrap();

        let height = 12.4;
        let scale = Scale {
            x: height * 2.0,
            y: height,
        };
        draw_text_mut(
            &mut img,
            Rgba([0u8, 0u8, 0u8, 255u8]),
            0,
            0,
            scale,
            &font,
            &label,
        );
        *image = Box::new(img);
        Ok(())
    }
}

impl ExifProcessor for MobileNet {}

#[derive(Clone, serde::Serialize, serde::Deserialize)]
struct Config {}

impl Default for Config {
    fn default() -> Self {
        Config {}
    }
}

impl Processor for MobileNet {
    fn name(&self) -> String {
        "mobilenet".into()
    }

    fn title(&self) -> String {
        "MobileNet".into()
    }

    fn author(&self) -> String {
        "chriamue".into()
    }

    fn description(&self) -> String {
        "Plugin to classify images.".into()
    }

    fn process(
        &mut self,
        _config: ProcessorConfig,
        image: &mut Box<lenna_core::LennaImage>,
    ) -> Result<(), Box<dyn std::error::Error>> {
        self.process_exif(&mut image.exif).unwrap();
        self.process_image(&mut image.image).unwrap();
        Ok(())
    }

    fn default_config(&self) -> serde_json::Value {
        serde_json::to_value(Config::default()).unwrap()
    }
}

#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;
#[cfg(target_arch = "wasm32")]
lenna_core::export_wasm_plugin!(MobileNet);

#[cfg(test)]
mod tests {
    use super::*;
    use lenna_core::ProcessorConfig;

    #[test]
    fn default() {
        let mut mobilenet = MobileNet::default();
        let config = ProcessorConfig {
            id: "mobilenet".into(),
            config: mobilenet.default_config(),
        };
        assert_eq!(mobilenet.name(), "mobilenet");
        let mut img =
            Box::new(lenna_core::io::read::read_from_file("assets/lenna.png".into()).unwrap());
        mobilenet.process(config, &mut img).unwrap();
        img.name = "test".to_string();
        lenna_core::io::write::write_to_file(&img, image::ImageOutputFormat::Jpeg(80)).unwrap();
    }

    #[cfg(target_arch = "wasm32")]
    mod wasm {
        use super::*;
        use lenna_core::LennaImage;
        use wasm_bindgen_test::*;

        #[wasm_bindgen_test]
        fn default() {
            let mut mobilenet = MobileNet::default();
            let config = ProcessorConfig {
                id: "mobilenet".into(),
                config: mobilenet.default_config(),
            };
            assert_eq!(mobilenet.name(), "mobilenet");
            let mut img = Box::new(LennaImage::default());
            mobilenet.process(config, &mut img).unwrap();
        }
    }
}
