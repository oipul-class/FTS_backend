const express = require("express");

const routes = express.Router();

module.exports = routes;

const screenController = require("./controllers/screen");
const permissionController = require("./controllers/permission");
const companyController = require("./controllers/company");
const branchController = require("./controllers/branch");
const roleController = require("./controllers/role");
const userController = require("./controllers/user");
const sessionController = require("./controllers/session");
const productTypeController = require("./controllers/productType")

const companyMiddleware = require("./validators/company");
const branchMiddleware = require("./validators/branch");
const userMiddleware = require("./validators/user");
const roleMiddleware = require("./validators/role");


routes.get("/screen", screenController.index);
routes.get("/screen/:id", screenController.find);

routes.get("/permission", permissionController.index);
routes.get("/permission/:id", permissionController.find);

const tokenAuthMiddleware = require("./middleware/tokenAuthorization");

routes.post("/session", sessionController.store);

routes.get("/company", companyController.index);
routes.get("/company/search", companyController.find);
routes.post("/company", companyMiddleware.create, companyController.store);
routes.put("/company/:id", companyMiddleware.update, companyController.update);
routes.put("/company/plan", companyController.setPlan);
routes.delete("/company/:id", companyController.delete);

// routes.use(tokenAuthMiddleware);

routes.get("/branch", branchController.index);
routes.get("/branch/search", branchController.find);
routes.post("/branch", branchMiddleware.create, branchController.store);
routes.put("/branch/:id", branchMiddleware.update, branchController.update);
routes.delete("/branch/:id", branchController.delete);

routes.get("/role", roleController.index);
routes.get("/role/search", roleController.find);
routes.post("/role", roleMiddleware.create, roleController.store);
routes.put("/role/:id", roleMiddleware.create, roleController.update);
routes.delete("/role/:id", roleController.delete);

routes.get("/user", userController.index);
routes.get("/user/:id", userController.find);
routes.post("/user", userMiddleware.create, userController.store);
routes.put("/user/:id", userMiddleware.update, userController.update);
routes.delete("/user/:id", userController.delete);

routes.get("/productType", productTypeController.index);
routes.get("/productType/:id", productTypeController.find);
routes.post("/productType",  productTypeController.store);
routes.put("/productType/:id",  productTypeController.update);
routes.delete("/productType/:id", productTypeController.delete);
