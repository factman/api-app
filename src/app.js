// import dependencies
import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// import routes
import api from "./api";

dotenv.config();
// process.env.NODE_ENV = "production";

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(cors());

const env = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;
let database = process.env.DB_HOST;

if (env === "development") {
  database = process.env.DB_HOST_TEST;
}

// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(database)
  .then(() => {
    console.log("Successfully connected to the database!");
  }).catch((err) => {
    console.log(err, "Could not connect to the database. Exiting now...");
    process.exit();
  });


// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Bezop Marketplace API." });
});

// Use Routes
app.use("/api/v1", api);

app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  next();
});

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
