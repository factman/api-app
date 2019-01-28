
import ProductExtra from "./../../models/productExtra";

// Create and Save a new ProductExtra
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "ProductExtra name can not be empty",
    });
  }

  // Create a ProductExtra
  const productExtra = new ProductExtra({
    name: req.body.name,
    value: req.body.value,
    product_id: req.body.product_id,
    vendor_id: req.body.vendor_id,
  });

  // Save ProductExtra in the database
  productExtra.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the ProductExtra.",
      });
    });
};

// Retrieve and return all productExtras from the database.
exports.findAll = (req, res) => {
  ProductExtra.find()
    .then((productExtras) => {
      res.send(productExtras);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving productExtras.",
      });
    });
};

// Find a single productExtra with a productExtraId
exports.findOne = (req, res) => {
  ProductExtra.findById(req.params.productExtraId)
    .then((productExtra) => {
      if (!productExtra) {
        res.status(404).send({
          message: `ProductExtra not found with id ${req.params.productExtraId}`,
        });
      }
      res.send(productExtra);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `ProductExtra not found with id ${req.params.productExtraId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving productExtra with id ${req.params.productExtraId}`,
      });
    });
};

// Update a productExtra identified by the productExtraId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "ProductExtra name can not be empty",
    });
  }

  // Find productExtra and update it with the request body
  ProductExtra.findByIdAndUpdate(req.params.productExtraId, {
    name: req.body.name,
    value: req.body.value,
    product_id: req.body.product_id,
    vendor_id: req.body.vendor_id,
  }, { new: true })
    .then((productExtra) => {
      if (!productExtra) {
        res.status(404).send({
          message: `ProductExtra not found with id ${req.params.productExtraId}`,
        });
      }
      res.send(productExtra);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `ProductExtra not found with id ${req.params.productExtraId}`,
        });
      }
      res.status(500).send({
        message: `Error updating productExtra with id ${req.params.productExtraId}`,
      });
    });
};

// Delete a productExtra with the specified productExtraId in the request
exports.delete = (req, res) => {
  ProductExtra.findByIdAndRemove(req.params.productExtraId)
    .then((productExtra) => {
      if (!productExtra) {
        res.status(404).send({
          message: `ProductExtra not found with id ${req.params.productExtraId}`,
        });
      }
      res.send({ message: "ProductExtra deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `ProductExtra not found with id ${req.params.productExtraId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete productExtra with id ${req.params.productExtraId}`,
      });
    });
};
