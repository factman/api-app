
import Vendor from "./../../models/vendor";

// Create and Save a new Vendor
exports.create = (req, res) => {
  // Validate request
  if (!req.body.shop_name) {
    res.status(400).send({
      message: "Vendor shop_name can not be empty",
    });
  }

  // Create a Vendor
  const vendor = new Vendor({
    shope_name: req.body.shope_name,
    company: req.body.company,
    language: req.body.language,
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    tagline: req.body.tagline,
    address1: req.body.address1,
    address2: req.body.address2,
    details: req.body.details,
    facebook: req.body.facebook,
    skype: req.body.skype,
    google_plus: req.body.google_plus,
    twitter: req.body.twitter,
    youtube: req.body.youtube,
    pinterest: req.body.pinterest,
    phone: req.body.phone,
    tag: req.body.tag,
    description: req.body.description,
    lat_lang: req.body.lat_lang,
    country: req.body.country,
    city: req.body.city,
    zip: req.body.zip,
    state: req.body.state,
    theme: req.body.theme,
    logo: req.body.logo,
    banner: req.body.banner,
    homepage: req.body.homepage,
    product_page_style: req.body.product_page_style,
    product_detail_page_style: req.body.product_detail_page_style,
    profile_page_style: req.body.profile_page_style,
    blog_page_style: req.body.blog_page_style,
    mail_page_style: req.body.mail_page_style,
    invoice_page_style: req.body.invoice_page_style,
    ticket_page_style: req.body.ticket_page_style,
    view_count: req.body.view_count,
    metamask: req.body.metamask,
    last_access: req.body.last_access,
  });

  // Save Vendor in the database
  vendor.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Vendor.",
      });
    });
};

// Retrieve and return all vendors from the database.
exports.findAll = (req, res) => {
  Vendor.find()
    .then((vendors) => {
      res.send(vendors);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving vendors.",
      });
    });
};

// Find a single vendor with a vendorId
exports.findOne = (req, res) => {
  Vendor.findById(req.params.vendorId)
    .then((vendor) => {
      if (!vendor) {
        res.status(404).send({
          message: `Vendor not found with id ${req.params.vendorId}`,
        });
      }
      res.send(vendor);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Vendor not found with id ${req.params.vendorId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving vendor with id ${req.params.vendorId}`,
      });
    });
};

// Update a vendor identified by the vendorId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    res.status(400).send({
      message: "Vendor content can not be empty",
    });
  }

  // Find vendor and update it with the request body
  Vendor.findByIdAndUpdate(req.params.vendorId, {
    title: req.body.title || "Untitled Vendor",
    content: req.body.content,
  }, { new: true })
    .then((vendor) => {
      if (!vendor) {
        res.status(404).send({
          message: `Vendor not found with id ${req.params.vendorId}`,
        });
      }
      res.send(vendor);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Vendor not found with id ${req.params.vendorId}`,
        });
      }
      res.status(500).send({
        message: `Error updating vendor with id ${req.params.vendorId}`,
      });
    });
};

// Delete a vendor with the specified vendorId in the request
exports.delete = (req, res) => {
  Vendor.findByIdAndRemove(req.params.vendorId)
    .then((vendor) => {
      if (!vendor) {
        res.status(404).send({
          message: `Vendor not found with id ${req.params.vendorId}`,
        });
      }
      res.send({
        message: "Vendor deleted successfully!",
      });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Vendor not found with id ${req.params.vendorId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete vendor with id ${req.params.vendorId}`,
      });
    });
};
