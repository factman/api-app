/*
* @author 4Dcoder
*/

import Arbitration from "./model";

// Create and Save a new Arbitration
exports.create = (req, res) => {
  // Validate request
  if (!req.body.order_id) {
    res.status(400).send({
      message: "Arbitration sales order cannot be empty",
    });
  }

  // Create a Arbitration
  const arbitration = new Arbitration({
    order_id: req.body.order_id,
    vendor_id: req.body.vendor_id,
    customer_id: req.body.customer_id,
    amount: req.body.amount,
    customer_complaint: req.body.customer_complaint,
    vendor_complaint: req.body.vendor_complaint,
    arbitration_status: req.body.arbitration_status,
    arbiter: req.body.arbiter,
    verdict: req.body.verdict,
  });

  // Save Arbitration in the database
  arbitration.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Arbitration.",
      });
    });
};

// Retrieve and return all arbitrations from the database.
exports.findAll = (req, res) => {
  Arbitration.find()
    .then((arbitrations) => {
      res.send(arbitrations);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving arbitrations.",
      });
    });
};

// Find a single arbitration with a arbitrationId
exports.findOne = (req, res) => {
  Arbitration.findById(req.params.arbitrationId)
    .then((arbitration) => {
      if (!arbitration) {
        res.status(404).send({
          message: `Arbitration not found with id ${req.params.arbitrationId}`,
        });
      }
      res.send(arbitration);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Arbitration not found with id ${req.params.arbitrationId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving arbitration with id ${req.params.arbitrationId}`,
      });
    });
};

// Update a arbitration identified by the arbitrationId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.order_id) {
    res.status(400).send({
      message: "Arbitration order can not be empty",
    });
  }

  // Find arbitration and update it with the request body
  Arbitration.findByIdAndUpdate(req.params.arbitrationId, {
    order_id: req.body.order_id,
    vendor_id: req.body.vendor_id,
    customer_id: req.body.customer_id,
    amount: req.body.amount,
    customer_complaint: req.body.customer_complaint,
    vendor_complaint: req.body.vendor_complaint,
    arbitration_status: req.body.arbitration_status,
    arbiter: req.body.arbiter,
    verdict: req.body.verdict,
  }, { new: true })
    .then((arbitration) => {
      if (!arbitration) {
        res.status(404).send({
          message: `Arbitration not found with id ${req.params.arbitrationId}`,
        });
      }
      res.send(arbitration);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Arbitration not found with id ${req.params.arbitrationId}`,
        });
      }
      res.status(500).send({
        message: `Error updating arbitration with id ${req.params.arbitrationId}`,
      });
    });
};

// Delete a arbitration with the specified arbitrationId in the request
exports.delete = (req, res) => {
  Arbitration.findByIdAndRemove(req.params.arbitrationId)
    .then((arbitration) => {
      if (!arbitration) {
        res.status(404).send({
          message: `Arbitration not found with id ${req.params.arbitrationId}`,
        });
      }
      res.send({ message: "Arbitration deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Arbitration not found with id ${req.params.arbitrationId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete arbitration with id ${req.params.arbitrationId}`,
      });
    });
};
