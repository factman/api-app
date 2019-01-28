
import Setting from "./../../models/setting";

// Create and Save a new Setting
exports.create = (req, res) => {
  // Validate request
  if (!req.body.kind) {
    res.status(400).send({
      message: "Setting kind can not be empty",
    });
  }

  // Create a Setting
  const setting = new Setting({
    code: req.body.code,
    kind: req.body.kind,
    name: req.body.name,
    value: req.body.value,
    description: req.body.description,
  });

  // Save Setting in the database
  setting.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Setting.",
      });
    });
};

// Retrieve and return all settings from the database.
exports.findAll = (req, res) => {
  Setting.find()
    .then((settings) => {
      res.send(settings);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving settings.",
      });
    });
};

// Find a single setting with a settingId
exports.findOne = (req, res) => {
  Setting.findById(req.params.settingId)
    .then((setting) => {
      if (!setting) {
        res.status(404).send({
          message: `Setting not found with id ${req.params.settingId}`,
        });
      }
      res.send(setting);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Setting not found with id ${req.params.settingId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving setting with id ${req.params.settingId}`,
      });
    });
};

// Update a setting identified by the settingId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    res.status(400).send({
      message: "Setting content can not be empty",
    });
  }

  // Find setting and update it with the request body
  Setting.findByIdAndUpdate(req.params.settingId, {
    title: req.body.title || "Untitled Setting",
    content: req.body.content,
  }, { new: true })
    .then((setting) => {
      if (!setting) {
        res.status(404).send({
          message: `Setting not found with id ${req.params.settingId}`,
        });
      }
      res.send(setting);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Setting not found with id ${req.params.settingId}`,
        });
      }
      res.status(500).send({
        message: `Error updating setting with id ${req.params.settingId}`,
      });
    });
};

// Delete a setting with the specified settingId in the request
exports.delete = (req, res) => {
  Setting.findByIdAndRemove(req.params.settingId)
    .then((setting) => {
      if (!setting) {
        res.status(404).send({
          message: `Setting not found with id ${req.params.settingId}`,
        });
      }
      res.send({ message: "Setting deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Setting not found with id ${req.params.settingId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete setting with id ${req.params.settingId}`,
      });
    });
};
