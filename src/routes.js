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
const productTypeController = require("./controllers/productType");
const unitOfMeasurementController = require("./controllers/unitOfMeasurement");
const productController = require("./controllers/product");
const logbookController = require("./controllers/logBookInventory");
const lotController = require("./controllers/lot");
const costumerController = require("./controllers/costumer");
const paymentMethodController = require("./controllers/paymentMethod");
const purchaseController = require("./controllers/purchase");
const itemPurchaseController = require("./controllers/itemPurchase");
const saleController = require("./controllers/sale");
const itemSaleController = require("./controllers/itemSale");

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
routes.post("/productType", productTypeController.store);
routes.put("/productType/:id", productTypeController.update);
routes.delete("/productType/:id", productTypeController.delete);

routes.get("/unit", unitOfMeasurementController.index);
routes.get("/unit/:id", unitOfMeasurementController.find);

routes.get("/product", productController.index);
routes.get("/product/:id", productController.find);
routes.post("/product", productController.store);
routes.put("/product/:id", productController.update);
routes.delete("/product/:id", productController.delete);

routes.get("/logbook", logbookController.index);
routes.get("/logbook/:id", logbookController.find);
routes.post("/logbook", logbookController.store);
routes.put("/logbook/:id", logbookController.update);

routes.get("/lot", lotController.index);
routes.get("/lot/:id", lotController.find);
routes.put("/lot/:id", lotController.update);

routes.get("/costumer", costumerController.index);
routes.get("/costumer/:id", costumerController.find);
routes.post("/costumer", costumerController.store);
routes.put("/costumer/:id", costumerController.update);
routes.delete("/costumer/:id", costumerController.delete);

routes.get("/paymentMethod", paymentMethodController.index);
routes.get("/paymentMethod/:id", paymentMethodController.find);

routes.get("/purchase", purchaseController.index);
routes.get("/purchase/:id", purchaseController.find);
routes.post("/purchase", purchaseController.store);
routes.put("/purchase/:id", purchaseController.update);
routes.delete("/purchase/:id", purchaseController.delete);

routes.get("/itemPurchase", itemPurchaseController.index);
routes.get("/itemPurchase/:id", itemPurchaseController.find);
routes.post("/itemPurchase", itemPurchaseController.store);
routes.delete("/itemPurchase/:id", itemPurchaseController.delete);

routes.get("/sale", purchaseController.index);
routes.get("/sale/:id", purchaseController.find);
routes.post("/sale", purchaseController.store);
routes.put("/sale/:id", purchaseController.update);
routes.delete("/sale/:id", purchaseController.delete);

routes.get("/itemSale", itemSaleController.index);
routes.get("/itemSale/:id", itemSaleController.find);
routes.post("/itemSale", itemSaleController.store);
routes.put("/itemSale/:id", itemSaleController.update);
routes.delete("/itemSale/:id", itemSaleController.delete);
