
import Stock from "./../../models/stock";

// Create and Save a new Stock
exports.create = (req, res) => {
  // Validate request
  if (!req.body.kind) {
    res.status(400).send({
      message: "Stock kind can not be empty",
    });
  }

  // Create a Stock
  const stock = new Stock({
    vendor_id: req.body.vendor_id,
    product_id: req.body.product_id,
    order_num: req.body.order_num,
    kind: req.body.kind,
    quantity: req.body.quantity,
    avaialable: req.body.avaialable,
    unit_cost: req.body.unit_cost,
    unit_price: req.body.unit_price,
    description: req.body.description,
  });

  // Save Stock in the database
  stock.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Stock.",
      });
    });
};

// Retrieve and return all stocks from the database.
exports.findAll = (req, res) => {
  Stock.find()
    .then((stocks) => {
      res.send(stocks);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stocks.",
      });
    });
};

// Find a single stock with a stockId
exports.findOne = (req, res) => {
  Stock.findById(req.params.stockId)
    .then((stock) => {
      if (!stock) {
        res.status(404).send({
          message: `Stock not found with id ${req.params.stockId}`,
        });
      }
      res.send(stock);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Stock not found with id ${req.params.stockId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving stock with id ${req.params.stockId}`,
      });
    });
};

// Update a stock identified by the stockId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    res.status(400).send({
      message: "Stock content can not be empty",
    });
  }

  // Find stock and update it with the request body
  Stock.findByIdAndUpdate(req.params.stockId, {
    title: req.body.title || "Untitled Stock",
    content: req.body.content,
  }, { new: true })
    .then((stock) => {
      if (!stock) {
        res.status(404).send({
          message: `Stock not found with id ${req.params.stockId}`,
        });
      }
      res.send(stock);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Stock not found with id ${req.params.stockId}`,
        });
      }
      res.status(500).send({
        message: `Error updating stock with id ${req.params.stockId}`,
      });
    });
};

// Delete a stock with the specified stockId in the request
exports.delete = (req, res) => {
  Stock.findByIdAndRemove(req.params.stockId)
    .then((stock) => {
      if (!stock) {
        res.status(404).send({
          message: `Stock not found with id ${req.params.stockId}`,
        });
      }
      res.send({ message: "Stock deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Stock not found with id ${req.params.stockId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete stock with id ${req.params.stockId}`,
      });
    });
};
