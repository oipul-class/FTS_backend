const express = require("express");

const routes = express.Router();

module.exports = routes;

const companyController = require("./controllers/company");
const branchController = require("./controllers/branch");
const managerController = require("./controllers/manager");
const roleController = require("./controllers/role");
const userController = require("./controllers/user");
const sessionController = require("./controllers/session");

const tokenAuthMiddleware = require("./middleware/tokenAuthorization");

routes.post("/session", sessionController.store);

routes.use(tokenAuthMiddleware);

routes.get("/company", companyController.index);
routes.get("/company/search", companyController.find);
routes.post("/company", companyController.store);
routes.put("/company/:id", companyController.update);
routes.put("/company/plan", companyController.setPlan);
routes.delete("/company/:id", companyController.delete);

routes.get("/branch", branchController.index);
routes.get("/branch/search", branchController.find);
routes.post("/branch", branchController.store);
routes.put("/branch/:id", branchController.update);
routes.delete("/branch/:id", branchController.delete);

routes.get("/role", roleController.index);
routes.get("/role/search", roleController.find);
routes.post("/role", roleController.store);
routes.put("/role/:id", roleController.update);
routes.delete("/role/:id", roleController.delete);

routes.get("/manager", managerController.index);
routes.get("/manager/search", managerController.find);
routes.post("/manager", managerController.store);
routes.put("/manager/:id", managerController.update);
routes.delete("/manager/:id", managerController.delete);

routes.get("/user", userController.index);
routes.get("/user/search", userController.find);
routes.post("/user", userController.store);
routes.put("/user/:id", userController.update);
routes.delete("/user/:id", userController.delete);
