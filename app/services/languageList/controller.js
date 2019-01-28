
import LanguageList from "./../../models/languageList";

// Create and Save a new LanguageList
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "LanguageList name can not be empty",
    });
  }

  // Create a LanguageList
  const languageList = new LanguageList({
    name: req.body.name || "Untitled LanguageList",
    db_field: req.body.db_field,
    image: req.body.image,
  });

  // Save LanguageList in the database
  languageList.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the LanguageList.",
      });
    });
};

// Retrieve and return all languageLists from the database.
exports.findAll = (req, res) => {
  LanguageList.find()
    .then((languageLists) => {
      res.send(languageLists);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving languageLists.",
      });
    });
};

// Find a single languageList with a languageListId
exports.findOne = (req, res) => {
  LanguageList.findById(req.params.languageListId)
    .then((languageList) => {
      if (!languageList) {
        res.status(404).send({
          message: `LanguageList not found with id ${req.params.languageListId}`,
        });
      }
      res.send(languageList);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `LanguageList not found with id ${req.params.languageListId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving languageList with id ${req.params.languageListId}`,
      });
    });
};

// Update a languageList identified by the languageListId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "LanguageList name can not be empty",
    });
  }

  // Find languageList and update it with the request body
  LanguageList.findByIdAndUpdate(req.params.languageListId, {
    name: req.body.name || "Untitled LanguageList",
    db_field: req.body.db_field,
    image: req.body.image,
  }, { new: true })
    .then((languageList) => {
      if (!languageList) {
        res.status(404).send({
          message: `LanguageList not found with id ${req.params.languageListId}`,
        });
      }
      res.send(languageList);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `LanguageList not found with id ${req.params.languageListId}`,
        });
      }
      res.status(500).send({
        message: `Error updating languageList with id ${req.params.languageListId}`,
      });
    });
};

// Delete a languageList with the specified languageListId in the request
exports.delete = (req, res) => {
  LanguageList.findByIdAndRemove(req.params.languageListId)
    .then((languageList) => {
      if (!languageList) {
        res.status(404).send({
          message: `LanguageList not found with id ${req.params.languageListId}`,
        });
      }
      res.send({ message: "LanguageList deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `LanguageList not found with id ${req.params.languageListId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete languageList with id ${req.params.languageListId}`,
      });
    });
};
