
import Template from "./../../models/template";

// Create and Save a new Template
exports.create = (req, res) => {
  // Validate request
  if (!req.body.page) {
    res.status(400).send({
      message: "Template page can not be empty",
    });
  }

  // Create a Template
  const template = new Template({
    name: req.body.name,
    page: req.body.page,
    icon: req.body.icon,
    style: req.body.style,
  });

  // Save Template in the database
  template.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Template.",
      });
    });
};

// Retrieve and return all templates from the database.
exports.findAll = (req, res) => {
  Template.find()
    .then((templates) => {
      res.send(templates);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving templates.",
      });
    });
};

// Find a single template with a templateId
exports.findOne = (req, res) => {
  Template.findById(req.params.templateId)
    .then((template) => {
      if (!template) {
        res.status(404).send({
          message: `Template not found with id ${req.params.templateId}`,
        });
      }
      res.send(template);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Template not found with id ${req.params.templateId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving template with id ${req.params.templateId}`,
      });
    });
};

// Update a template identified by the templateId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.page) {
    res.status(400).send({
      message: "Template page can not be empty",
    });
  }

  // Find template and update it with the request body
  Template.findByIdAndUpdate(req.params.templateId, {
    name: req.body.name,
    page: req.body.page,
    icon: req.body.icon,
    style: req.body.style,
  }, { new: true })
    .then((template) => {
      if (!template) {
        res.status(404).send({
          message: `Template not found with id ${req.params.templateId}`,
        });
      }
      res.send(template);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Template not found with id ${req.params.templateId}`,
        });
      }
      res.status(500).send({
        message: `Error updating template with id ${req.params.templateId}`,
      });
    });
};

// Delete a template with the specified templateId in the request
exports.delete = (req, res) => {
  Template.findByIdAndRemove(req.params.templateId)
    .then((template) => {
      if (!template) {
        res.status(404).send({
          message: `Template not found with id ${req.params.templateId}`,
        });
      }
      res.send({ message: "Template deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Template not found with id ${req.params.templateId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete template with id ${req.params.templateId}`,
      });
    });
};
