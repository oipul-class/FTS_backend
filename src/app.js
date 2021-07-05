const express = require("express");

const cors = require("cors");

const routes = require("./routes");
const { errors } = require("celebrate");

require("dotenv").config();

require("./database");

const app = express();

app.use(express.json());

app.use(
  cors({
    methods: ["POST"],
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(routes);
app.use(errors());

module.exports = app;
