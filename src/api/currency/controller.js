
import Currency from "./model";

// Create and Save a new Currency
exports.create = (req, res) => {
  // Validate request
  if (!req.body.code) {
    res.status(400).send({
      message: "Currency code can not be empty",
    });
  }

  // Create a Currency
  const currency = new Currency({
    name: req.body.name || "Untitled Currency",
    code: req.body.code,
    description: req.body.description,
    kind: req.body.kind,
    symbol: req.body.symbol,
    exchange: req.body.exchange,
    view_count: req.body.view_count,
  });

  // Save Currency in the database
  currency.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Currency.",
      });
    });
};

// Retrieve and return all currencys from the database.
exports.findAll = (req, res) => {
  Currency.find()
    .then((currencys) => {
      res.send(currencys);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving currencys.",
      });
    });
};

// Find a single currency with a currencyId
exports.findOne = (req, res) => {
  // Get currency by currencyId
  Currency.findById(req.params.currencyId)
    .then((currency) => {
      if (!currency) {
        res.status(404).send({
          message: `Currency not found with id ${req.params.currencyId}`,
        });
      }
      res.send(currency);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Currency not found with id ${req.params.currencyId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving currency with id ${req.params.currencyId}`,
      });
    });
};

// Update a currency identified by the currencyId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.code) {
    res.status(400).send({
      message: "Currency code can not be empty",
    });
  }

  // Find currency and update it with the request body
  Currency.findByIdAndUpdate(req.params.currencyId, {
    name: req.body.name || "Untitled Currency",
    code: req.body.code,
    description: req.body.description,
    kind: req.body.kind,
    symbol: req.body.symbol,
    exchange: req.body.exchange,
    view_count: req.body.view_count,
  }, { new: true })
    .then((currency) => {
      if (!currency) {
        res.status(404).send({
          message: `Currency not found with id ${req.params.currencyId}`,
        });
      }
      res.send(currency);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Currency not found with id ${req.params.currencyId}`,
        });
      }
      res.status(500).send({
        message: `Error updating currency with id ${req.params.currencyId}`,
      });
    });
};

// Delete a currency with the specified currencyId in the request
exports.delete = (req, res) => {
  Currency.findByIdAndRemove(req.params.currencyId)
    .then((currency) => {
      if (!currency) {
        res.status(404).send({
          message: `Currency not found with id ${req.params.currencyId}`,
        });
      }
      res.send({ message: "Currency deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Currency not found with id ${req.params.currencyId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete currency with id ${req.params.currencyId}`,
      });
    });
};
