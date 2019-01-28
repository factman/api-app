
import Subscribe from "./../../models/subscribe";

// Create and Save a new Subscribe
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Subscribe email can not be empty",
    });
  }

  // Create a Subscribe
  const subscribe = new Subscribe({
    email: req.body.email,
    frequency: req.body.frequency,
    interest: req.body.interest,
  });

  // Save Subscribe in the database
  subscribe.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Subscribe.",
      });
    });
};

// Retrieve and return all subscribes from the database.
exports.findAll = (req, res) => {
  Subscribe.find()
    .then((subscribes) => {
      res.send(subscribes);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving subscribes.",
      });
    });
};

// Find a single subscribe with a subscribeId
exports.findOne = (req, res) => {
  Subscribe.findById(req.params.subscribeId)
    .then((subscribe) => {
      if (!subscribe) {
        res.status(404).send({
          message: `Subscribe not found with id ${req.params.subscribeId}`,
        });
      }
      res.send(subscribe);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Subscribe not found with id ${req.params.subscribeId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving subscribe with id ${req.params.subscribeId}`,
      });
    });
};

// Update a subscribe identified by the subscribeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.email) {
    res.status(400).send({
      message: "Subscribe email can not be empty",
    });
  }

  // Find subscribe and update it with the request body
  Subscribe.findByIdAndUpdate(req.params.subscribeId, {
    email: req.body.email,
    frequency: req.body.frequency,
    interest: req.body.interest,
  }, { new: true })
    .then((subscribe) => {
      if (!subscribe) {
        res.status(404).send({
          message: `Subscribe not found with id ${req.params.subscribeId}`,
        });
      }
      res.send(subscribe);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Subscribe not found with id ${req.params.subscribeId}`,
        });
      }
      res.status(500).send({
        message: `Error updating subscribe with id ${req.params.subscribeId}`,
      });
    });
};

// Delete a subscribe with the specified subscribeId in the request
exports.delete = (req, res) => {
  Subscribe.findByIdAndRemove(req.params.subscribeId)
    .then((subscribe) => {
      if (!subscribe) {
        res.status(404).send({
          message: `Subscribe not found with id ${req.params.subscribeId}`,
        });
      }
      res.send({ message: "Subscribe deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Subscribe not found with id ${req.params.subscribeId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete subscribe with id ${req.params.subscribeId}`,
      });
    });
};
