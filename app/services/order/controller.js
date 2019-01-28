/**
 * @author 4DCoder
 * @co-author Odewale Ifeoluwa
 */

import Order from "./../../models/order";
import { mailConfiguration } from "../mailTemplate/controller";

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.order_num) {
    res.status(400).send({
      message: "Order number can not be empty",
    });
  }

  // Create a Order
  const order = new Order({
    order_num: req.body.order_num,
    kind: req.body.kind,
    customer_id: req.body.customer_id,
    vendor_id: req.body.vendor_id,
    product_array: req.body.product_array,
    payment_array: req.body.payment_array,
    shipment_array: req.body.shipment_array,
    delivery_array: req.body.delivery_array,
    tracking_num: req.body.tracking_num,
    vat: req.body.vat,
    payable: req.body.payable,
    coupon_id: req.body.coupon_id,
    order_status: req.body.order_status,
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    organization: req.body.organization,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    postcode: req.body.postcode,
    country: req.body.country,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    email1: req.body.email1,
    email2: req.body.email2,
  });

  // Save Order in the database
  order.save()
    .then((data) => {
      mailConfiguration().send({
        template: "invoice",
        message: {
          to: "\"Ifeoluwa Odewale\" ifeoluwa.odewale@gmail.com, \"Venica Odewale\" oduveronica22@gmail.com",
          cc: "\"Oladipupo\" dipong200@gmail.com",
          subject: "The Second DB mail",
        },
        locals: {
          color: "#ffffff",
          bgcolor: "#0056c1",
        },
      })
        .then(() => {
          // res.send(mails);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while retrieving mails.",
          });
        });
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
  Order.find()
    .then((orders) => {
      res.send(orders);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find a single order with a orderId
exports.findOne = (req, res) => {
  Order.findById(req.params.orderId)
    .then((order) => {
      if (!order) {
        res.status(404).send({
          message: `Order not found with id ${req.params.orderId}`,
        });
      }
      res.send(order);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Order not found with id ${req.params.orderId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving order with id ${req.params.orderId}`,
      });
    });
};

// Update a order identified by the orderId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.order_num) {
    res.status(400).send({
      message: "Order number can not be empty",
    });
  }

  // Find order and update it with the request body
  Order.findByIdAndUpdate(req.params.orderId, {
    order_num: req.body.order_num,
    kind: req.body.kind,
    customer_id: req.body.customer_id,
    vendor_id: req.body.vendor_id,
    product_array: req.body.product_array,
    payment_array: req.body.payment_array,
    shipment_array: req.body.shipment_array,
    delivery_array: req.body.delivery_array,
    tracking_num: req.body.tracking_num,
    vat: req.body.vat,
    payable: req.body.payable,
    coupon_id: req.body.coupon_id,
    order_status: req.body.order_status,
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    organization: req.body.organization,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    postcode: req.body.postcode,
    country: req.body.country,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    email1: req.body.email1,
    email2: req.body.email2,
  }, { new: true })
    .then((order) => {
      if (!order) {
        res.status(404).send({
          message: `Order not found with id ${req.params.orderId}`,
        });
      }
      res.send(order);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Order not found with id ${req.params.orderId}`,
        });
      }
      res.status(500).send({
        message: `Error updating order with id ${req.params.orderId}`,
      });
    });
};

// Delete a order with the specified orderId in the request
exports.delete = (req, res) => {
  Order.findByIdAndRemove(req.params.orderId)
    .then((order) => {
      if (!order) {
        res.status(404).send({
          message: `Order not found with id ${req.params.orderId}`,
        });
      }
      res.send({ message: "Order deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Order not found with id ${req.params.orderId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete order with id ${req.params.orderId}`,
      });
    });
};
