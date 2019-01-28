import Media from "./model";

// Create and Save a new Media
exports.create = (req, res) => {
  // Validate request
  if (!req.body.subject) {
    res.status(400).send({
      message: "Media subject can not be empty",
    });
  }

  // Create a Media
  const media = new Media({
    title: req.body.title || "Untitled Media",
    description: req.body.description,
    media_type: req.body.media_type,
    vendor_id: req.body.vendor_id,
    purpose: req.body.purpose,
    subject: req.body.subject,
    page: req.body.page,
    place: req.body.place,
    num: req.body.num,
    status: req.body.status,
    url: req.body.url,
    style: req.body.style,
  });

  // Save Media in the database
  media.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Media.",
      });
    });
};

// Retrieve and return all medias from the database.
exports.findAll = (req, res) => {
  Media.find()
    .then((medias) => {
      res.send(medias);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving medias.",
      });
    });
};

// Find a single media with a mediaId
exports.findOne = (req, res) => {
  Media.findById(req.params.mediaId)
    .then((media) => {
      if (!media) {
        res.status(404).send({
          message: `Media not found with id ${req.params.mediaId}`,
        });
      }
      res.send(media);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Media not found with id ${req.params.mediaId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving media with id ${req.params.mediaId}`,
      });
    });
};

// Update a media identified by the mediaId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    res.status(400).send({
      message: "Media content can not be empty",
    });
  }

  // Find media and update it with the request body
  Media.findByIdAndUpdate(req.params.mediaId, {
    title: req.body.title || "Untitled Media",
    description: req.body.description,
    media_type: req.body.media_type,
    vendor_id: req.body.vendor_id,
    purpose: req.body.purpose,
    subject: req.body.subject,
    page: req.body.page,
    place: req.body.place,
    num: req.body.num,
    status: req.body.status,
    url: req.body.url,
    style: req.body.style,
  }, { new: true })
    .then((media) => {
      if (!media) {
        res.status(404).send({
          message: `Media not found with id ${req.params.mediaId}`,
        });
      }
      res.send(media);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Media not found with id ${req.params.mediaId}`,
        });
      }
      res.status(500).send({
        message: `Error updating media with id ${req.params.mediaId}`,
      });
    });
};

// Delete a media with the specified mediaId in the request
exports.delete = (req, res) => {
  Media.findByIdAndRemove(req.params.mediaId)
    .then((media) => {
      if (!media) {
        res.status(404).send({
          message: `Media not found with id ${req.params.mediaId}`,
        });
      }
      res.send({ message: "Media deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Media not found with id ${req.params.mediaId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete media with id ${req.params.mediaId}`,
      });
    });
};
