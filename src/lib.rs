use image::DynamicImage;
use lenna_core::plugins::PluginRegistrar;
use lenna_core::ProcessorConfig;
use lenna_core::{core::processor::ExifProcessor, core::processor::ImageProcessor, Processor};

extern "C" fn register(registrar: &mut dyn PluginRegistrar) {
    registrar.add_plugin(Box::new(MobileNet {}));
}

lenna_core::export_plugin!(register);

#[derive(Default, Clone)]
pub struct MobileNet;

impl ImageProcessor for MobileNet {
    fn process_image(
        &self,
        _image: &mut Box<DynamicImage>,
    ) -> Result<(), Box<dyn std::error::Error>> {
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
}
