
import Mail from "./model";

// Create and Save a new Mail
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Mail name can not be empty",
    });
  }

  // Create a Mail
  const mail = new Mail({
    name: req.body.name || "Untitled Mail",
    mail_title: req.body.mail_title,
    mail_subject: req.body.mail_subject,
    mail_body: req.body.mail_body,
  });

  // Save Mail in the database
  mail.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Mail.",
      });
    });
};

// Retrieve and return all mails from the database.
exports.findAll = (req, res) => {
  Mail.find()
    .then((mails) => {
      res.send(mails);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving mails.",
      });
    });
};

// Find a single mail with a mailId
exports.findOne = (req, res) => {
  Mail.findById(req.params.mailId)
    .then((mail) => {
      if (!mail) {
        res.status(404).send({
          message: `Mail not found with id ${req.params.mailId}`,
        });
      }
      res.send(mail);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Mail not found with id ${req.params.mailId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving mail with id ${req.params.mailId}`,
      });
    });
};

// Update a mail identified by the mailId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "Mail name can not be empty",
    });
  }

  // Find mail and update it with the request body
  Mail.findByIdAndUpdate(req.params.mailId, {
    name: req.body.name || "Untitled Mail",
    mail_title: req.body.mail_title,
    mail_subject: req.body.mail_subject,
    mail_body: req.body.mail_body,
  }, { new: true })
    .then((mail) => {
      if (!mail) {
        res.status(404).send({
          message: `Mail not found with id ${req.params.mailId}`,
        });
      }
      res.send(mail);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Mail not found with id ${req.params.mailId}`,
        });
      }
      res.status(500).send({
        message: `Error updating mail with id ${req.params.mailId}`,
      });
    });
};

// Delete a mail with the specified mailId in the request
exports.delete = (req, res) => {
  Mail.findByIdAndRemove(req.params.mailId)
    .then((mail) => {
      if (!mail) {
        res.status(404).send({
          message: `Mail not found with id ${req.params.mailId}`,
        });
      }
      res.send({ message: "Mail deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Mail not found with id ${req.params.mailId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete mail with id ${req.params.mailId}`,
      });
    });
};
