const express = require("express");

const routes = express.Router();

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
const billToReceiveController = require("./controllers/BillToReceive");
const billToPayController = require("./controllers/billToPay");

const companyMiddleware = require("./validators/company");
const branchMiddleware = require("./validators/branch");
const userMiddleware = require("./validators/user");
const roleMiddleware = require("./validators/role");
const productTypeMiddleware = require("./validators/productType");
const productMiddleware = require("./validators/product");
const logBookInventoryMiddleware = require("./validators/logbookInventory");
const lotMiddleware = require("./validators/lot");
const costumerMiddleware = require("./validators/costumer");
const purchaseMiddleware = require("./validators/purchase");
const itemPurchaseMiddle = require("./validators/itemPurchase");
const saleMiddleware = require("./validators/sale");
const itemSaleMiddleware = require("./validators/itemSale");
const billToReceiveMiddleware = require("./validators/billToReceive");
const billToPayMiddleware = require("./validators/billToPay");

const tokenAuthMiddleware = require("./middleware/tokenAuthorization");

routes.get("/screen", screenController.index);
routes.get("/screen/find/:id", screenController.find);

routes.get("/permission", permissionController.index);
routes.get("/permission/find/:id", permissionController.find);

routes.post("/session", sessionController.store);

routes.post("/company", companyMiddleware.create, companyController.store);
routes.get("/company", companyController.index);
routes.get("/company/find/:id", companyController.find);

//routes.use(tokenAuthMiddleware);

routes.put("/company/:id", companyMiddleware.update, companyController.update);
routes.delete("/company/:id", companyController.delete);

routes.get("/branch", branchController.index);
routes.get("/company/:id/branch", branchController.index);
routes.get("/branch/find/:id", branchController.find);
routes.post("/branch", branchMiddleware.create, branchController.store);
routes.put("/branch/:id", branchMiddleware.update, branchController.update);
routes.delete("/branch/:id", branchController.delete);

routes.get("/role", roleController.index);
routes.get("/role/find/:id", roleController.find);
routes.post("/role", roleMiddleware.create, roleController.store);
routes.put("/role/:id", roleMiddleware.create, roleController.update);
routes.delete("/role/:id", roleController.delete);

routes.get("/user", userController.index);
routes.get("/user/find/:id", userController.find);
routes.post("/user", userMiddleware.create, userController.store);
routes.put("/user/:id", userMiddleware.update, userController.update);
routes.delete("/user/:id", userController.delete);

routes.get("/productType", productTypeController.index);
routes.get("/productType/find/:id", productTypeController.find);

routes.get("/unit", unitOfMeasurementController.index);
routes.get("/unit/find/:id", unitOfMeasurementController.find);

routes.get("/company/:company_id/product", productController.index);
routes.get("/product/barCode/:bar_code", productController.index);
routes.get("/product/find/:id", productController.find);
routes.post("/product", productMiddleware.create, productController.store);
routes.put("/product/:id", productMiddleware.update, productController.update);
routes.delete("/product/:id", productController.delete);

routes.get("/logbook", logbookController.index);
routes.get("/branch/:branch_id/logbook", logbookController.index);
routes.get("/logbook/find/:id", logbookController.find);
routes.post(
  "/logbook",
  logBookInventoryMiddleware.create,
  logbookController.store
);
routes.put(
  "/logbook/:id",
  logBookInventoryMiddleware.update,
  logbookController.update
);

routes.get("/lot", lotController.index);
routes.get("/logbook/:logbook_id/lot", lotController.index);
routes.get("/lot/find/:id", lotController.find);
routes.put("/lot/:id", lotMiddleware.update, lotController.update);

routes.get("/costumer", costumerController.index);
routes.get("/costumer/:id", costumerController.find);
routes.post("/costumer", costumerMiddleware.create, costumerController.store);
routes.put(
  "/costumer/:id",
  costumerMiddleware.update,
  costumerController.update
);
routes.delete("/costumer/:id", costumerController.delete);

routes.get("/paymentMethod", paymentMethodController.index);
routes.get("/paymentMethod/find/:id", paymentMethodController.find);

routes.get("/purchase", purchaseController.index);
routes.get("/branch/:branch_id/purchase", purchaseController.index);
routes.get("/purchase/find/:id", purchaseController.find);
routes.post("/purchase", purchaseMiddleware.create, purchaseController.store);
routes.put(
  "/purchase/:id",
  purchaseMiddleware.update,
  purchaseController.update
);
routes.delete("/purchase/:id", purchaseController.delete);

routes.get("/itemPurchase", itemPurchaseController.index);
routes.get("/itemPurchase/:id", itemPurchaseController.find);
routes.post(
  "/itemPurchase",
  itemPurchaseMiddle.create,
  itemPurchaseController.store
);
routes.delete("/itemPurchase/:id", itemPurchaseController.delete);

routes.get("/sale", saleController.index);
routes.get("/branch/:branch_id/sale", saleController.index);
routes.get("/sale/find/:id", saleController.find);
routes.post("/sale", saleMiddleware.create, saleController.store);
routes.put("/sale/:id", saleMiddleware.update, saleController.update);
routes.delete("/sale/:id", saleController.delete);

routes.get("/itemSale", itemSaleController.index);
routes.get("/itemSale/:id", itemSaleController.find);
routes.post("/itemSale", itemSaleMiddleware.create, itemSaleController.store);
routes.delete("/itemSale/:id", itemSaleController.delete);

routes.get("/billToReceive/:branch_id", billToReceiveController.index);
routes.get("/billToReceive/find/:id", billToReceiveController.find);
routes.put(
  "/billToReceive/:id",
  billToReceiveMiddleware.update,
  billToReceiveController.update
);

routes.get("/billToPay/:branch_id", billToPayController.index);
routes.get("/billToPay/find/:id", billToPayController.find);
routes.put(
  "/billToPay/:id",
  billToPayMiddleware.update,
  billToPayController.update
);

module.exports = routes;
