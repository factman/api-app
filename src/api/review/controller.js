
import Review from "./model";

// Create and Save a new Review
exports.create = (req, res) => {
  // Validate request
  if (!req.body.subject) {
    res.status(404)
      .json({
        success: false,
        data: [],
        message: "Review content can not be empty",
      });
  }

  // Create a Review
  const newReview = new Review({
    customer_id: req.body.customer_id,
    subject: req.body.subject,
    subject_id: req.body.subject_id,
    comment: req.body.comment,
    rating: req.body.rating,
  });

  // Save Review in the database
  newReview.save()
    .then((review) => {
      res.status(200)
        .json({
          success: true,
          data: review,
          message: "Record(s)",
        });
    }).catch((err) => {
      res.status(500)
        .json({
          success: false,
          data: [],
          message: err.message || "Some error occurred while creating the Review.",
        });
    });
};

// Retrieve and return all reviews from the database.
exports.findAll = (req, res) => {
  Review.find()
    .then((reviews) => {
      res.status(200)
        .json({
          success: true,
          data: reviews,
          message: "Record(s)",
        });
    }).catch((err) => {
      res.status(500)
        .json({
          success: false,
          data: [],
          message: err.message || "Some error occurred while retrieving the Review.",
        });
    });
};

// Find a single review with a reviewId
exports.findOne = (req, res) => {
  Review.findById(req.params.reviewId)
    .then((review) => {
      if (!review) {
        return res.status(404)
          .json({
            success: false,
            data: [],
            message: `Review not found with id ${req.params.reviewId}`,
          });
      }
      return res.status(200)
        .json({
          success: true,
          data: review,
          message: "Record(s)",
        });
    }).catch(err => res.status(404)
      .json({
        success: false,
        data: [],
        message: err.message || `Review not found with id ${req.params.reviewId}`,
      }));
};

// Update a review identified by the reviewId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.subject) {
    res.status(400)
      .json({
        success: false,
        data: [],
        message: "Review subject can not be empty",
      });
  }

  // Find review and update it with the request body
  Review.findByIdAndUpdate(req.params.reviewId, {
    customer_id: req.body.customer_id,
    subject: req.body.subject,
    subject_id: req.body.subject_id,
    comment: req.body.comment,
    rating: req.body.rating,
  }, { new: true })
    .then((review) => {
      if (!review) {
        res.status(404)
          .json({
            success: false,
            data: [],
            message: `Review not found with id ${req.params.reviewId}`,
          });
      }
      res.send(review);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404)
          .json({
            success: false,
            data: [],
            message: err.message || `Review not found with id ${req.params.reviewId}`,
          });
      }
      res.status(500).send({
        message: `Error updating review with id ${req.params.reviewId}`,
      });
    });
};

// Delete a review with the specified reviewId in the request
exports.delete = (req, res) => {
  Review.findByIdAndRemove(req.params.reviewId)
    .then((review) => {
      if (!review) {
        res.status(404)
          .json({
            success: false,
            data: [],
            message: `Review not found with id ${req.params.reviewId}`,
          });
      }
      res.status(200)
        .json({
          success: true,
          data: [],
          message: "Review deleted successfully!",
        });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404)
          .json({
            success: false,
            data: [],
            message: err.message || `Review not found with id ${req.params.reviewId}`,
          });
      }
      res.status(500)
        .json({
          success: false,
          data: [],
          message: `Could not delete review with id ${req.params.reviewId}`,
        });
    });
};
