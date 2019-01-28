/*
* @author 4Dcoder
*/

import Admin from "./model";


// Retrieve and return all admins from the database.
export function findAll(req, res) {
  Admin.find()
    .then((admins) => {
      res.status(200)
        .json({
          success: true,
          data: admins,
          message: "Record(s)",
        });
    }).catch((err) => {
      res.status(500)
        .json({
          success: false,
          data: [],
          message: err.message || "Some error occurred while retrieving admins.",
        });
    });
}

// Find a single admin with a adminId
export function findOne(req, res) {
  Admin.findById(req.params.adminId)
    .then((admin) => {
      if (!admin) {
        res.status(404)
          .json({
            success: false,
            data: [],
            message: `Admin not found with id ${req.params.adminId}`,
          });
      }
      res.status(200)
        .json({
          success: true,
          data: admin,
          message: "Record(s) Found!",
        });
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404)
          .json({
            success: false,
            data: [],
            message: `Admin not found with id ${req.params.adminId}`,
          });
      }
      res.status(500)
        .json({
          success: false,
          data: [],
          message: `Error retrieving admin with id ${req.params.adminId}`,
        });
    });
}

// Update a admin identified by the adminId in the request
export function update(req, res) {
  // Validate Request
  if (!req.body.publicAddress) {
    res.status(400)
      .json({
        success: false,
        data: [],
        message: "Admin publicAddress can not be empty",
      });
  }
  const publicAddress = req.body.publicAddress || "";
  const username = req.body.username || "";
  const fullname = req.body.fullname || "";
  const phone = req.body.phone || "";
  const address = req.body.address || "";
  const email = req.body.email || "";

  const newUser = { username, fullname, phone, address, email, publicAddress };
  // Find admin and update it with the request body
  Admin.findByIdAndUpdate(req.params.adminId, newUser, { new: true })
    .then((admin) => {
      if (!admin) {
        res.status(404)
          .json({
            success: false,
            data: [],
            message: `Admin not found with id ${req.params.adminId}`,
          });
      }
      res.status(200)
        .json({
          success: true,
          data: admin,
          message: `Operation successful with id ${req.params.adminId}`,
        });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404)
          .json({
            success: false,
            data: [],
            message: `${err.message} Admin not found with id ${req.params.adminId}`,
          });
      }
      res.status(500)
        .json({
          success: false,
          data: [],
          message: `${err.message} Error updating admin with id ${req.params.adminId}`,
        });
    });
}

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
