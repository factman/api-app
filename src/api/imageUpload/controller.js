/**
 * @author Odewale Ifeoluwa
 */
import Jimp from "jimp";
import FileSys from "../../helpers/FileSystem";
import Product from "../product/controller";

function updateImageUpload(Collection, req, res, collectionType) {
  return Collection.findById(req.params.collectionId)
    .then((collection) => {
      if (!collection) {
        return res.status(404).send({
          message: `${collectionType} not found with id ${req.params.collectionId}`,
        });
      }
      const imageExtension = `${req.params.collectionId}${FileSys.getBase64Extension(req.body.image)}`;
      if (["png", "jpeg"].indexOf(imageExtension) > -1) {
        return Jimp.read(Buffer.from(req.body.image.replace(/^data:image\/(png|jpeg);base64,/, ""), "base64"))
          .then((image) => {
            const filename = FileSys.generateRandomFilename(imageExtension);
            image.write(filename);
          });
      }
      return res.status(404).send({
        message: `${collectionType} not found with id ${req.params.collectionId}`,
      });
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `${collectionType} not found with id ${req.params.collectionId}`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving ${collectionType.toLowerCase()} with id ${req.params.collectionId}`,
      });
    });
}


exports.update = (req, res) => {
  if (!req.body.collection) {
    res.status(400).send({
      message: "image collection can not be empty",
    });
  }
  switch (req.body.collection) {
    case "product":
      return updateImageUpload(Product, req, res, "Product");
    default:
      return res.status(400).send({
        message: "image collection does not exist",
      });
  }
};

