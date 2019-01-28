
import Customer from "./../../models/customer";

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.publicAddress) {
    res.status(400).send({
      message: "Customer publicAddress can not be empty",
    });
  }

  // Create a Customer
  const customer = new Customer({
    publicAddress: req.body.publicAddress,
    nonce: req.body.nonce,
  });

  // Save Customer in the database
  customer.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Customer.",
      });
    });
};

// Retrieve and return all customers from the database.
exports.findAll = (req, res) => {
  Customer.find()
    .then((customers) => {
      res.send(customers);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customers.",
      });
    });
};

// Find a single customer with a customerId
exports.findOne = (req, res) => {
  Customer.findById(req.params.customerId)
    .then((customer) => {
      if (!customer) {
        res.status(404).send({
          message: `Customer not found with id ${req.params.customerId}`,
        });
      }
      res.send(customer);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Customer not found with id ${req.params.customerId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving customer with id ${req.params.customerId}`,
      });
    });
};

// Update a customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.publicAddress) {
    res.status(400).send({
      message: "Customer publicAddress can not be empty",
    });
  }

  // Find customer and update it with the request body
  Customer.findByIdAndUpdate(req.params.customerId, {
    publicAddress: req.body.publicAddress,
    nonce: req.body.nonce,
  }, { new: true })
    .then((customer) => {
      if (!customer) {
        res.status(404).send({
          message: `Customer not found with id ${req.params.customerId}`,
        });
      }
      res.send(customer);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Customer not found with id ${req.params.customerId}`,
        });
      }
      res.status(500).send({
        message: `Error updating customer with id ${req.params.customerId}`,
      });
    });
};

// Delete a customer with the specified customerId in the request
exports.delete = (req, res) => {
  Customer.findByIdAndRemove(req.params.customerId)
    .then((customer) => {
      if (!customer) {
        res.status(404).send({
          message: `Customer not found with id ${req.params.customerId}`,
        });
      }
      res.send({ message: "Customer deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Customer not found with id ${req.params.customerId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete customer with id ${req.params.customerId}`,
      });
    });
};

