use exif::{Field, In, Tag, Value};
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
    config: Config,
    model: ModelType,
    label: Option<String>,
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

    pub fn detect_label(
        &self,
        image: &Box<DynamicImage>,
    ) -> Result<Option<String>, Box<dyn std::error::Error>> {
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
        Ok(Some(label))
    }
}

impl Default for MobileNet {
    fn default() -> Self {
        MobileNet {
            config: Config::default(),
            model: Self::model(),
            label: None,
        }
    }
}

impl ImageProcessor for MobileNet {
    fn process_image(
        &self,
        image: &mut Box<DynamicImage>,
    ) -> Result<(), Box<dyn std::error::Error>> {
        if self.config.print {
            let mut img = DynamicImage::ImageRgba8(image.to_rgba8());

            let font = Vec::from(include_bytes!("../assets/DejaVuSans.ttf") as &[u8]);
            let font = Font::try_from_vec(font).unwrap();

            let height = self.config.size;
            let scale = Scale {
                x: height * 2.0,
                y: height,
            };
            let label = self.label.clone().unwrap();
            draw_text_mut(
                &mut img,
                Rgba([0u8, 0u8, 0u8, 255u8]),
                self.config.x,
                self.config.y,
                scale,
                &font,
                &label,
            );
            *image = Box::new(img);
        }

        Ok(())
    }
}

impl ExifProcessor for MobileNet {
    fn process_exif(&self, exif: &mut Box<Vec<Field>>) -> Result<(), Box<dyn std::error::Error>> {
        if self.config.exif {
            match self.label.clone() {
                Some(label) => {
                    exif.push(Field {
                        tag: Tag::ImageDescription,
                        ifd_num: In::PRIMARY,
                        value: Value::Ascii(vec![label.clone().into_bytes()]),
                    });
                }
                _ => {}
            }
        }
        Ok(())
    }
}

#[derive(Clone, serde::Serialize, serde::Deserialize)]
struct Config {
    x: u32,
    y: u32,
    size: f32,
    print: bool,
    exif: bool,
}

impl Default for Config {
    fn default() -> Self {
        Config {
            x: 0,
            y: 0,
            size: 12.5,
            print: true,
            exif: false,
        }
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
        config: ProcessorConfig,
        image: &mut Box<lenna_core::LennaImage>,
    ) -> Result<(), Box<dyn std::error::Error>> {
        self.config = serde_json::from_value(config.config).unwrap();
        self.label = self.detect_label(&image.image).unwrap();
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

#[cfg(feature = "python")]
use pyo3::prelude::*;
#[cfg(feature = "python")]
#[allow(non_camel_case_types)]
type lenna_mobilenet_plugin = MobileNet;
#[cfg(feature = "python")]
lenna_core::export_python_plugin!(lenna_mobilenet_plugin);

#[cfg(test)]
mod tests {
    use super::*;
    use lenna_core::ProcessorConfig;

    #[test]
    fn default() {
        let mut mobilenet = MobileNet::default();
        let mut c = mobilenet.default_config();
        c["x"] = serde_json::json!(10);
        c["y"] = serde_json::json!(30);
        c["size"] = serde_json::json!(42.0);
        c["print"] = serde_json::json!(true);
        c["exif"] = serde_json::json!(true);
        mobilenet.config = Config {
            x: 10,
            y: 30,
            size: 42.0,
            print: true,
            exif: true,
        };

        let mut fields = Box::new(Vec::new());
        assert!(mobilenet.process_exif(&mut fields).is_ok());
        assert_eq!(fields.len(), 0);
        mobilenet.label = Some("test".to_string());
        assert!(mobilenet.process_exif(&mut fields).is_ok());
        assert_eq!(fields.len(), 1);

        let config = ProcessorConfig {
            id: "mobilenet".into(),
            config: c,
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
