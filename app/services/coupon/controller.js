
import Coupon from "./../../models/coupon";

// Create and Save a new Coupon
exports.create = (req, res) => {
  // Validate request
  if (!req.body.code) {
    res.status(400).send({
      message: "Coupon code can not be empty",
    });
  }

  // Create a Coupon
  const coupon = new Coupon({
    title: req.body.title || "Untitled Coupon",
    code: req.body.code,
    spec: req.body.spec,
    vendor_id: req.body.vendor_id,
    till: new Date(req.body.till),
  });

  // Save Coupon in the database
  coupon.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Coupon.",
      });
    });
};

// Retrieve and return all coupons from the database.
exports.findAll = (req, res) => {
  Coupon.find()
    .then((coupons) => {
      res.send(coupons);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving coupons.",
      });
    });
};

// Find a single coupon with a couponId
exports.findOne = (req, res) => {
  Coupon.findById(req.params.couponId)
    .then((coupon) => {
      if (!coupon) {
        res.status(404).send({
          message: `Coupon not found with id ${req.params.couponId}`,
        });
      }
      res.send(coupon);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Coupon not found with id ${req.params.couponId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving coupon with id ${req.params.couponId}`,
      });
    });
};

// Update a coupon identified by the couponId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.code) {
    res.status(400).send({
      message: "Coupon code can not be empty",
    });
  }

  // Find coupon and update it with the request body
  Coupon.findByIdAndUpdate(req.params.couponId, {
    title: req.body.title || "Untitled Coupon",
    code: req.body.code,
    spec: req.body.spec,
    vendor_id: req.body.vendor_id,
    till: new Date(req.body.till),
  }, { new: true })
    .then((coupon) => {
      if (!coupon) {
        res.status(404).send({
          message: `Coupon not found with id ${req.params.couponId}`,
        });
      }
      res.send(coupon);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Coupon not found with id ${req.params.couponId}`,
        });
      }
      res.status(500).send({
        message: `Error updating coupon with id ${req.params.couponId}`,
      });
    });
};

// Delete a coupon with the specified couponId in the request
exports.delete = (req, res) => {
  Coupon.findByIdAndRemove(req.params.couponId)
    .then((coupon) => {
      if (!coupon) {
        res.status(404).send({
          message: `Coupon not found with id ${req.params.couponId}`,
        });
      }
      res.send({ message: "Coupon deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Coupon not found with id ${req.params.couponId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete coupon with id ${req.params.couponId}`,
      });
    });
};

