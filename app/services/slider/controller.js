
import Slider from "./../../models/slider";

// Create and Save a new Slider
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Slider name can not be empty",
    });
  }

  // Create a Slider
  const slider = new Slider({
    name: req.body.name,
    vendor_id: req.body.vendor_id,
    kind: req.body.kind,
    elements: req.body.elements,
    place: req.body.place,
    title: req.body.title,
    style: req.body.style,
    standing: req.body.standing,
  });

  // Save Slider in the database
  slider.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Slider.",
      });
    });
};

// Retrieve and return all sliders from the database.
exports.findAll = (req, res) => {
  Slider.find()
    .then((sliders) => {
      res.send(sliders);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving sliders.",
      });
    });
};

// Find a single slider with a sliderId
exports.findOne = (req, res) => {
  Slider.findById(req.params.sliderId)
    .then((slider) => {
      if (!slider) {
        res.status(404).send({
          message: `Slider not found with id ${req.params.sliderId}`,
        });
      }
      res.send(slider);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Slider not found with id ${req.params.sliderId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving slider with id ${req.params.sliderId}`,
      });
    });
};

// Update a slider identified by the sliderId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    res.status(400).send({
      message: "Slider content can not be empty",
    });
  }

  // Find slider and update it with the request body
  Slider.findByIdAndUpdate(req.params.sliderId, {
    title: req.body.title || "Untitled Slider",
    content: req.body.content,
  }, { new: true })
    .then((slider) => {
      if (!slider) {
        res.status(404).send({
          message: `Slider not found with id ${req.params.sliderId}`,
        });
      }
      res.send(slider);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Slider not found with id ${req.params.sliderId}`,
        });
      }
      res.status(500).send({
        message: `Error updating slider with id ${req.params.sliderId}`,
      });
    });
};

// Delete a slider with the specified sliderId in the request
exports.delete = (req, res) => {
  Slider.findByIdAndRemove(req.params.sliderId)
    .then((slider) => {
      if (!slider) {
        res.status(404).send({
          message: `Slider not found with id ${req.params.sliderId}`,
        });
      }
      res.send({ message: "Slider deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Slider not found with id ${req.params.sliderId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete slider with id ${req.params.sliderId}`,
      });
    });
};
