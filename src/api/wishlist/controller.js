
import Wishlist from "./model";

// Create and Save a new Wishlist
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.customer_id) {
    res.status(400).send({
      message: "Wishlist list name, type and customer can not be empty",
    });
  }

  // Create a Wishlist
  const wishlist = new Wishlist({
    name: req.body.name,
    product_array: req.body.product_array,
    customer_id: req.body.customer_id,
  });

  // Save Wishlist in the database
  wishlist.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Wishlist.",
      });
    });
};

// Retrieve and return all wishlists from the database.
exports.findAll = (req, res) => {
  Wishlist.find()
    .then((wishlists) => {
      res.send(wishlists);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving wishlists.",
      });
    });
};

// Find a single wishlist with a wishlistId
exports.findOne = (req, res) => {
  Wishlist.findById(req.params.wishlistId)
    .then((wishlist) => {
      if (!wishlist) {
        res.status(404).send({
          message: `Wishlist not found with id ${req.params.wishlistId}`,
        });
      }
      res.send(wishlist);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Wishlist not found with id ${req.params.wishlistId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving wishlist with id ${req.params.wishlistId}`,
      });
    });
};

// Update a wishlist identified by the wishlistId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name || !req.body.customer_id || !req.body.kind) {
    res.status(400).send({
      message: "Wishlist name can not be empty",
    });
  }

  // Find wishlist and update it with the request body
  Wishlist.findByIdAndUpdate(req.params.wishlistId, {
    name: req.body.name,
    product_array: req.body.product_array,
    customer_id: req.body.customer_id,
  }, { new: true })
    .then((wishlist) => {
      if (!wishlist) {
        res.status(404).send({
          message: `Wishlist not found with id ${req.params.wishlistId}`,
        });
      }
      res.send(wishlist);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Wishlist not found with id ${req.params.wishlistId}`,
        });
      }
      res.status(500).send({
        message: `Error updating wishlist with id ${req.params.wishlistId}`,
      });
    });
};

// Delete a wishlist with the specified wishlistId in the request
exports.delete = (req, res) => {
  Wishlist.findByIdAndRemove(req.params.wishlistId)
    .then((wishlist) => {
      if (!wishlist) {
        res.status(404).send({
          message: `Wishlist not found with id ${req.params.wishlistId}`,
        });
      }
      res.send({ message: "Wishlist deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Wishlist not found with id ${req.params.wishlistId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete wishlist with id ${req.params.wishlistId}`,
      });
    });
};
