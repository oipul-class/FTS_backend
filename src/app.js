const express = require("express");

const cors = require("cors");

const routes = require("./routes");
const { errors } = require("celebrate");

require("dotenv").config();

require("./database");

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);
app.use(errors());

module.exports = app;
