
import Product from "./../../models/product";

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Product name can not be empty",
    });
  }

  // Create a Product
  const product = new Product({
    code: req.body.code,
    sku: req.body.sku,
    upc: req.body.upc,
    name: req.body.name,
    tag: req.body.tag,
    vendor_id: req.body.vendor_id,
    category_id: req.body.category_id,
    brand_id: req.body.brand_id,
    description: req.body.description,
    short_description: req.body.short_description,
    unit_cost: req.body.unit_cost,
    unit_price: req.body.unit_price,
    alt_price: req.body.alt_price,
    shipping_cost: req.body.shipping_cost,
    image_sm: req.body.image_sm,
    image_md: req.body.image_md,
    image_lg: req.body.image_lg,
    image_front: req.body.image_front,
    image_back: req.body.image_back,
    logo: req.body.logo,
    unit: req.body.unit,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    color: req.body.color,
    option: req.body.option,
    discount: req.body.discount,
    tax: req.body.tax,
    tax_type: req.body.tax_type,
    download: req.body.download,
    download_name: req.body.download_name,
    deal: req.body.deal,
    download_num: req.body.download_num,
    requirements: req.body.requirements,
    currency: req.body.currency,
    featured: req.body.featured,
    view_date: req.body.view_date,
    view_count: req.body.view_count,
  });

  // Save Product in the database
  product.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Product.",
      });
    });
};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
  Product.find()
    .then((products) => {
      res.send(products);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products.",
      });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
  Product.findById(req.params.productId)
    .then((product) => {
      if (!product) {
        res.status(404).send({
          message: `Product not found with id ${req.params.productId}`,
        });
      }
      res.send(product);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Product not found with id ${req.params.productId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving product with id ${req.params.productId}`,
      });
    });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "Product name can not be empty",
    });
  }

  // Find product and update it with the request body
  Product.findByIdAndUpdate(req.params.productId, {
    code: req.body.code,
    sku: req.body.sku,
    upc: req.body.upc,
    name: req.body.name,
    tag: req.body.tag,
    vendor_id: req.body.vendor_id,
    category_id: req.body.category_id,
    brand_id: req.body.brand_id,
    description: req.body.description,
    short_description: req.body.short_description,
    unit_cost: req.body.unit_cost,
    unit_price: req.body.unit_price,
    alt_price: req.body.alt_price,
    shipping_cost: req.body.shipping_cost,
    image_sm: req.body.image_sm,
    image_md: req.body.image_md,
    image_lg: req.body.image_lg,
    image_front: req.body.image_front,
    image_back: req.body.image_back,
    logo: req.body.logo,
    unit: req.body.unit,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    color: req.body.color,
    option: req.body.option,
    discount: req.body.discount,
    tax: req.body.tax,
    tax_type: req.body.tax_type,
    download: req.body.download,
    download_name: req.body.download_name,
    deal: req.body.deal,
    download_num: req.body.download_num,
    requirements: req.body.requirements,
    currency: req.body.currency,
    featured: req.body.featured,
    view_date: req.body.view_date,
    view_count: req.body.view_count,
  }, { new: true })
    .then((product) => {
      if (!product) {
        res.status(404).send({
          message: `Product not found with id ${req.params.productId}`,
        });
      }
      res.send(product);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Product not found with id ${req.params.productId}`,
        });
      }
      res.status(500).send({
        message: `Error updating product with id ${req.params.productId}`,
      });
    });
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.productId)
    .then((product) => {
      if (!product) {
        res.status(404).send({
          message: `Product not found with id ${req.params.productId}`,
        });
      }
      res.send({ message: "Product deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Product not found with id ${req.params.productId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete product with id ${req.params.productId}`,
      });
    });
};
