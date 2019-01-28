
import Category from "./../../models/category";
import Jimp from "jimp";


// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
   if (!req.body.name) {
    res.status(400).send({
      message: "Category name can not be empty",
    });
  }

  //Initiate the category schema 
  const category = new Category();
  
  //Assign the field of the intances to the body request
  category.name= req.body.name || "Untitled Category",
  category.description= req.body.description,
  category.kind= req.body.kind,
  category.created_by = 2
  

//Convert the thumbnail to file and save
  Jimp.read(Buffer.from(req.body.thumbnail.replace(/data:image\/(png|jpeg);base64,/, ""), 'base64'))
  .then(thumbnail => {
    thumbnail.quality(60).write("public/uploads/filename.jpg");
    category.thumbnail = "http://localhost:5000/uploads/filename.jpg";

    //Convert the banner to file and save
      Jimp.read(Buffer.from(req.body.banner.replace(/data:image\/(png|jpeg);base64,/, ""), 'base64'))
      .then(banner => {
        banner.quality(60).write("public/uploads/banner.jpg");
        category.banner = "http://localhost:5000/uploads/banner.jpg";
        //Save the category instances to database
        category.save()
                .then(data => {
                  //Send back the data to the server
                  res.status(200)
                      .send(data)
                }).catch((err) => {
                  //Check category instances error
                  res.status(500).send({
                    message: err.message || "Some error occurred while creating the Category.",
                  });
                });
      }).catch((err) => {
        //Check banner file save error
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Category.",
        });
      });

  }).catch((err) => {
  //Check thumbnail file save error
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Category.",
    });
  });
  
};

// Retrieve and return all categorys from the database.
exports.findAll = (req, res) => {
  Category.find({}, {__v: false})
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
    name: req.body.name || "Untitled Category",
    description: req.body.description,
    logo: req.body.logo,
    banner: req.body.banner,
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
