/*
* @author 4Dcoder
*/

import Admin from "./../../models/admin";

// Create and Save a new Admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.metamask) {
    res.status(400).send({
      message: "Admin content can not be empty",
    });
  }

  // Create a Admin
  const admin = new Admin({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    metamask: req.body.metamask,
  });

  // Save Admin in the database
  admin.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Admin.",
      });
    });
};

// Retrieve and return all admins from the database.
exports.findAll = (req, res) => {
  Admin.find()
    .then((admins) => {
      res.send(admins);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admins.",
      });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
  Admin.findById(req.params.adminId)
    .then((admin) => {
      if (!admin) {
        res.status(404).send({
          message: `Admin not found with id ${req.params.adminId}`,
        });
      }
      res.send(admin);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Admin not found with id ${req.params.adminId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving admin with id ${req.params.adminId}`,
      });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.email) {
    res.status(400).send({
      message: "Admin email can not be empty",
    });
  }

  // Find admin and update it with the request body
  Admin.findByIdAndUpdate(req.params.adminId, {
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    metamask: req.body.metamask,
  }, { new: true })
    .then((admin) => {
      if (!admin) {
        res.status(404).send({
          message: `Admin not found with id ${req.params.adminId}`,
        });
      }
      res.send(admin);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Admin not found with id ${req.params.adminId}`,
        });
      }
      res.status(500).send({
        message: `Error updating admin with id ${req.params.adminId}`,
      });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
  Admin.findByIdAndRemove(req.params.adminId)
    .then((admin) => {
      if (!admin) {
        res.status(404).send({
          message: `Admin not found with id ${req.params.adminId}`,
        });
      }
      res.send({ message: "Admin deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Admin not found with id ${req.params.adminId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete admin with id ${req.params.adminId}`,
      });
    });
};
