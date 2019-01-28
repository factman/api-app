
import Category from "./model";


// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Category name can not be empty",
    });
  }


  // Initiate the category schema
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
    kind: req.body.kind,
  });

  // Assign the field of the intances to the body request
  category.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      // Check thumbnail file save error
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Category.",
      });
    });
};

// Retrieve and return all categorys from the database.
exports.findAll = (req, res) => {
  Category.find()
    .then((categorys) => {
      res.send(categorys);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving categorys.",
      });
    });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {
  Category.findById(req.params.categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).send({
          message: `Category not found with id ${req.params.categoryId}`,
        });
      }
      res.send(category);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Category not found with id ${req.params.categoryId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving category with id ${req.params.categoryId}`,
      });
    });
};

// Update a category identified by the categoryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "Category name can not be empty",
    });
  }

  // Find category and update it with the request body
  Category.findByIdAndUpdate(req.params.categoryId, {
    name: req.body.name,
    description: req.body.description,
    kind: req.body.kind,
  }, { new: true })
    .then((category) => {
      if (!category) {
        res.status(404).send({
          message: `Category not found with id ${req.params.categoryId}`,
        });
      }


      res.send(category);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Category not found with id ${req.params.categoryId}`,
        });
      }
      res.status(500).send({
        message: `Error updating category with id ${req.params.categoryId}`,
      });
    });
};

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).send({
          message: `Category not found with id ${req.params.categoryId}`,
        });
      }
      res.send({ message: "Category deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Category not found with id ${req.params.categoryId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete category with id ${req.params.categoryId}`,
      });
    });
};
