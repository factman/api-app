
import Subscriber from "./model";

// Create and Save a new Subscriber
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Subscriber email can not be empty",
    });
  }

  // Create a Subscriber
  const subscriber = new Subscriber({
    email: req.body.email,
    frequency: req.body.frequency,
    interest: req.body.interest,
  });

  // Save Subscriber in the database
  subscriber.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Subscriber.",
      });
    });
};

// Retrieve and return all subscribers from the database.
exports.findAll = (req, res) => {
  Subscriber.find()
    .then((subscribers) => {
      res.send(subscribers);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving subscribers.",
      });
    });
};

// Find a single subscriber with a subscriberId
exports.findOne = (req, res) => {
  Subscriber.findById(req.params.subscriberId)
    .then((subscriber) => {
      if (!subscriber) {
        res.status(404).send({
          message: `Subscriber not found with id ${req.params.subscriberId}`,
        });
      }
      res.send(subscriber);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Subscriber not found with id ${req.params.subscriberId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving subscriber with id ${req.params.subscriberId}`,
      });
    });
};

// Update a subscriber identified by the subscriberId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.email) {
    res.status(400).send({
      message: "Subscriber email can not be empty",
    });
  }

  // Find subscriber and update it with the request body
  Subscriber.findByIdAndUpdate(req.params.subscriberId, {
    email: req.body.email,
    frequency: req.body.frequency,
    interest: req.body.interest,
  }, { new: true })
    .then((subscriber) => {
      if (!subscriber) {
        res.status(404).send({
          message: `Subscriber not found with id ${req.params.subscriberId}`,
        });
      }
      res.send(subscriber);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Subscriber not found with id ${req.params.subscriberId}`,
        });
      }
      res.status(500).send({
        message: `Error updating subscriber with id ${req.params.subscriberId}`,
      });
    });
};

// Delete a subscriber with the specified subscriberId in the request
exports.delete = (req, res) => {
  Subscriber.findByIdAndRemove(req.params.subscriberId)
    .then((subscriber) => {
      if (!subscriber) {
        res.status(404).send({
          message: `Subscriber not found with id ${req.params.subscriberId}`,
        });
      }
      res.send({ message: "Subscriber deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Subscriber not found with id ${req.params.subscriberId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete subscriber with id ${req.params.subscriberId}`,
      });
    });
};
