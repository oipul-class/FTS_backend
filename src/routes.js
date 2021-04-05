const express = require("express");

const routes = express.Router();

module.exports = routes;

const companyController = require("./controllers/company");

routes.get("/company", companyController.index);
routes.post("/company", companyController.store);
routes.put("/company/:id", companyController.update);
routes.put("/company/plan", companyController.setPlan);
routes.delete("/company/:id", companyController.delete);
