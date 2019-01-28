/*
* @author 4Dcoder
*/

import Blog from "./model";

// Create and Save a new Blog
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({
      message: "Blog content can not be empty",
    });
  }

  // Create a Blog
  const blog = new Blog({
    kind: req.body.kind,
    title: req.body.title,
    summary: req.body.summary,
    author: req.body.author,
    content: req.body.content,
    tag: req.body.tag,
    image: req.body.image,
  });

  // Save Blog in the database
  blog.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Blog.",
      });
    });
};

// Retrieve and return all blogs from the database.
exports.findAll = (req, res) => {
  Blog.find()
    .then((blogs) => {
      res.send(blogs);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving blogs.",
      });
    });
};

// Find a single blog with a blogId
exports.findOne = (req, res) => {
  Blog.findById(req.params.blogId)
    .then((blog) => {
      if (!blog) {
        res.status(404).send({
          message: `Blog not found with id ${req.params.blogId}`,
        });
      }
      res.send(blog);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Blog not found with id ${req.params.blogId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving blog with id ${req.params.blogId}`,
      });
    });
};

// Update a blog identified by the blogId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    res.status(400).send({
      message: "Blog content can not be empty",
    });
  }

  // Find blog and update it with the request body
  Blog.findByIdAndUpdate(req.params.blogId, {
    kind: req.body.kind,
    title: req.body.title,
    summary: req.body.summary,
    author: req.body.author,
    content: req.body.content,
    tag: req.body.tag,
    image: req.body.image,
  }, { new: true })
    .then((blog) => {
      if (!blog) {
        res.status(404).send({
          message: `Blog not found with id ${req.params.blogId}`,
        });
      }
      res.send(blog);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Blog not found with id ${req.params.blogId}`,
        });
      }
      res.status(500).send({
        message: `Error updating blog with id ${req.params.blogId}`,
      });
    });
};

// Delete a blog with the specified blogId in the request
exports.delete = (req, res) => {
  Blog.findByIdAndRemove(req.params.blogId)
    .then((blog) => {
      if (!blog) {
        res.status(404).send({
          message: `Blog not found with id ${req.params.blogId}`,
        });
      }
      res.send({ message: "Blog deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Blog not found with id ${req.params.blogId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete blog with id ${req.params.blogId}`,
      });
    });
};
