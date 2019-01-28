
import Brand from "./../../models/brand";

// Create and Save a new Brand
exports.create = (req, res) => {
  // Validate request
  if (!req.body.decription) {
    res.status(400).send({
      message: "Brand description can not be empty",
    });
  }

  // Create a Brand
  const brand = new Brand({
    title: req.body.title || "Untitled Brand",
    description: req.body.description,
    logo: req.body.logo,
    banner: req.body.banner,
  });

  // Save Brand in the database
  brand.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Brand.",
      });
    });
};

// Retrieve and return all brands from the database.
exports.findAll = (req, res) => {
  Brand.find()
    .then((brands) => {
      res.send(brands);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving brands.",
      });
    });
};

// Find a single brand with a brandId
exports.findOne = (req, res) => {
  Brand.findById(req.params.brandId)
    .then((brand) => {
      if (!brand) {
        res.status(404).send({
          message: `Brand not found with id ${req.params.brandId}`,
        });
      }
      res.send(brand);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Brand not found with id ${req.params.brandId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving brand with id ${req.params.brandId}`,
      });
    });
};

// Update a brand identified by the brandId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.decription) {
    res.status(400).send({
      message: "Brand description can not be empty",
    });
  }

  // Find brand and update it with the request body
  Brand.findByIdAndUpdate(req.params.brandId, {
    title: req.body.title || "Untitled Brand",
    description: req.body.description,
    logo: req.body.logo,
    banner: req.body.banner,
  }, { new: true })
    .then((brand) => {
      if (!brand) {
        res.status(404).send({
          message: `Brand not found with id ${req.params.brandId}`,
        });
      }
      res.send(brand);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Brand not found with id ${req.params.brandId}`,
        });
      }
      res.status(500).send({
        message: `Error updating brand with id ${req.params.brandId}`,
      });
    });
};

// Delete a brand with the specified brandId in the request
exports.delete = (req, res) => {
  Brand.findByIdAndRemove(req.params.brandId)
    .then((brand) => {
      if (!brand) {
        res.status(404).send({
          message: `Brand not found with id ${req.params.brandId}`,
        });
      }
      res.send({ message: "Brand deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Brand not found with id ${req.params.brandId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete brand with id ${req.params.brandId}`,
      });
    });
};
