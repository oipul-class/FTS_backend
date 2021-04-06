const express = require("express");

const routes = express.Router();

module.exports = routes;

const companyController = require("./controllers/company");
const branchController = require("./controllers/branch");
const managerController = require("./controllers/manager");
const roleController = require("./controllers/role");
const userController = require("./controllers/user");

routes.get("/company", companyController.index);
routes.post("/company", companyController.store);
routes.put("/company/:id", companyController.update);
routes.put("/company/plan", companyController.setPlan);
routes.delete("/company/:id", companyController.delete);

routes.get("/branch", branchController.index);
routes.post("/branch", branchController.store);
routes.put("/branch/:id", branchController.update);
routes.delete("/branch/:id", branchController.delete);

routes.get("/role", roleController.index);
routes.post("/role", roleController.store);
routes.put("/role/:id", roleController.update);
routes.delete("/role/:id", roleController.delete);

routes.get("/manager", managerController.index);
routes.post("/manager", managerController.store);
routes.put("/manager/:id", managerController.update);
routes.delete("/manager/:id", managerController.delete);

routes.get("/user", userController.index);
routes.post("/user", userController.store);
routes.put("/user/:id", userController.update);
routes.delete("/user/:id", userController.delete);
