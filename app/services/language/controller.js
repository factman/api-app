
import Language from "./../../models/language";

// Create and Save a new Language
exports.create = (req, res) => {
  // Validate request
  if (!req.body.word) {
    res.status(400).send({
      message: "Language word can not be empty",
    });
  }

  // Create a Language
  const language = new Language({
    word: req.body.word || "Empty Word",
    english: req.body.english,
    french: req.body.french,
    spanish: req.body.spanish,
    bangla: req.body.bangla,
    arabic: req.body.arabic,
    chinese: req.body.chinese,
  });

  // Save Language in the database
  language.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Language.",
      });
    });
};

// Retrieve and return all languages from the database.
exports.findAll = (req, res) => {
  Language.find()
    .then((languages) => {
      res.send(languages);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving languages.",
      });
    });
};

// Find a single language with a languageId
exports.findOne = (req, res) => {
  Language.findById(req.params.languageId)
    .then((language) => {
      if (!language) {
        res.status(404).send({
          message: `Language not found with id ${req.params.languageId}`,
        });
      }
      res.send(language);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Language not found with id ${req.params.languageId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving language with id ${req.params.languageId}`,
      });
    });
};

// Update a language identified by the languageId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.word) {
    res.status(400).send({
      message: "Language word can not be empty",
    });
  }

  // Find language and update it with the request body
  Language.findByIdAndUpdate(req.params.languageId, {
    word: req.body.word || "Empty Word",
    english: req.body.english,
    french: req.body.french,
    spanish: req.body.spanish,
    bangla: req.body.bangla,
    arabic: req.body.arabic,
    chinese: req.body.chinese,
  }, { new: true })
    .then((language) => {
      if (!language) {
        res.status(404).send({
          message: `Language not found with id ${req.params.languageId}`,
        });
      }
      res.send(language);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Language not found with id ${req.params.languageId}`,
        });
      }
      res.status(500).send({
        message: `Error updating language with id ${req.params.languageId}`,
      });
    });
};

// Delete a language with the specified languageId in the request
exports.delete = (req, res) => {
  Language.findByIdAndRemove(req.params.languageId)
    .then((language) => {
      if (!language) {
        res.status(404).send({
          message: `Language not found with id ${req.params.languageId}`,
        });
      }
      res.send({ message: "Language deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Language not found with id ${req.params.languageId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete language with id ${req.params.languageId}`,
      });
    });
};
