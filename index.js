"use strict";
require("express-async-errors");
const PORT = process.env?.PORT || 8000;
require("dotenv").config();
const express = require("express");
const app = express();

const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

app.use(express.json());

app.use("/upload", express.static("./upload"));

app.use(require("./src/middlewares/authentication"));

app.use(require("./src/middlewares/logger"));

app.use(require("./src/middlewares/findSearchSortPage"));

app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Stock Management API",
    documents: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

app.use(require("./src/routes"));

app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});

// require('./src/helpers/sync')() // !!! It clear database.
