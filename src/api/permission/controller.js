
import Permission from "./model";

// Create and Save a new Permission
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Permission name can not be empty",
    });
  }

  // Create a Permission
  const permission = new Permission({
    name: req.body.name,
    codename: req.body.codename,
    parent_status: req.body.parent_status,
    description: req.body.description,
  });

  // Save Permission in the database
  permission.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Permission.",
      });
    });
};

// Retrieve and return all permissions from the database.
exports.findAll = (req, res) => {
  Permission.find()
    .then((permissions) => {
      res.send(permissions);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving permissions.",
      });
    });
};

// Find a single permission with a permissionId
exports.findOne = (req, res) => {
  Permission.findById(req.params.permissionId)
    .then((permission) => {
      if (!permission) {
        res.status(404).send({
          message: `Permission not found with id ${req.params.permissionId}`,
        });
      }
      res.send(permission);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Permission not found with id ${req.params.permissionId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving permission with id ${req.params.permissionId}`,
      });
    });
};

// Update a permission identified by the permissionId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "Permission name can not be empty",
    });
  }

  // Find permission and update it with the request body
  Permission.findByIdAndUpdate(req.params.permissionId, {
    name: req.body.name,
    codename: req.body.codename,
    parent_status: req.body.parent_status,
    description: req.body.description,
  }, { new: true })
    .then((permission) => {
      if (!permission) {
        res.status(404).send({
          message: `Permission not found with id ${req.params.permissionId}`,
        });
      }
      res.send(permission);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Permission not found with id ${req.params.permissionId}`,
        });
      }
      res.status(500).send({
        message: `Error updating permission with id ${req.params.permissionId}`,
      });
    });
};

// Delete a permission with the specified permissionId in the request
exports.delete = (req, res) => {
  Permission.findByIdAndRemove(req.params.permissionId)
    .then((permission) => {
      if (!permission) {
        res.status(404).send({
          message: `Permission not found with id ${req.params.permissionId}`,
        });
      }
      res.send({ message: "Permission deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Permission not found with id ${req.params.permissionId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete permission with id ${req.params.permissionId}`,
      });
    });
};
