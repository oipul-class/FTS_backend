const express = require("express");

const routes = express.Router();

const planController = require("./controllers/plan");
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
const billToReceiveController = require("./controllers/billToReceive");
const billToPayController = require("./controllers/billToPay");
const addressController = require("./controllers/address");
const inventoryReportController = require("./controllers/inventoryReport");
const financialReportController = require("./controllers/financialReport");
const companySiteController = require("./controllers/companySite");

const companyMiddleware = require("./validators/company");
const branchMiddleware = require("./validators/branch");
const userMiddleware = require("./validators/user");
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
const addressMiddleware = require("./validators/address");
const websiteMiddleware = require("./validators/website");

const tokenAuthMiddleware = require("./middleware/tokenAuthorization");

const companySecurityFunctionsMiddleware = require("./middleware/companySecurityFunctions");
const branchSecurityFunctionsMiddleware = require("./middleware/branchSecurityFunctions");
const userSecurityFunctionsMiddleware = require("./middleware/userSecurityFunctions");
const planUsageSecurityFunctions = require("./middleware/planUsageFunctions");
const itemCartSecurityFunctionsMiddleware = require("./middleware/ItemCartSecurityFunctions");
const productSecurityFunctionsMiddleware = require("./middleware/productSecurityFunctions");
const logbookSecurityFunctionsMiddleware = require("./middleware/logbookSecurityFunctions");
const lotSecurityFunctionsMiddleware = require("./middleware/lotSecurityFunctions");
const costumerSecurityFunctionsMiddleware = require("./middleware/costumerSecurityFunctions");
const addressSecurityFunctionsMiddleware = require("./middleware/addressSecurityFunctions");
const purchaseSecurityFunctionsMiddleware = require("./middleware/purchaseSecurityFunctions");
const saleSecurityFunctionsMiddleware = require("./middleware/saleSecurityFunctions");
const billToReceiveSecurityFunctionsMiddleware = require("./middleware/billToReceiveSecurityFunctions");
const billToPaySecurityFunctionsMiddleware = require("./middleware/billToPaySecurityFunctions");
const companySiteFunctionsMiddleware = require("./middleware/companySiteSecurityFunctions");

const { useMulter } = require("./utils");

const firebaseImageUploadService = require("./services/firebase");
const multerInstance = useMulter();

routes.get("/screen", screenController.index);
routes.get("/screen/find/:id", screenController.find);

routes.get("/permission", permissionController.index);
routes.get("/permission/find/:id", permissionController.find);

routes.post("/session", sessionController.store);

routes.post("/company", companyMiddleware.create, companyController.store);
routes.get("/company", companyController.index);
routes.get("/company/find/:id", companyController.find);

routes.get("/branch", branchController.index);
routes.get("/company/:id/branch", branchController.index);
routes.get("/branch/find/:id", branchController.find);

routes.get("/plan", planController.index);
routes.get("/plan/find/:id", planController.find);

routes.get("/company/:company_id/site", companySiteController.index);

routes.use(tokenAuthMiddleware);

routes.put(
  "/company/:id",
  companySecurityFunctionsMiddleware.CompanyUpdateCheck,
  companyMiddleware.update,
  companyController.update
);
routes.delete(
  "/company/:id",
  companySecurityFunctionsMiddleware.CompanyUpdateCheck,
  companyController.delete
);

routes.post(
  "/branch",
  planUsageSecurityFunctions.planBranchLimitCheck,
  branchMiddleware.create,
  branchController.store
);
routes.put(
  "/branch/:id",
  branchSecurityFunctionsMiddleware.BranchUpdateCheck,
  branchMiddleware.update,
  branchController.update
);
routes.delete(
  "/branch/:id",
  branchSecurityFunctionsMiddleware.BranchUpdateCheck,
  branchController.delete
);

routes.get("/role", roleController.index);
routes.get("/role/find/:id", roleController.find);

routes.get("/user", userController.index);
routes.get("/branch/:branch_id/user", userController.index);
routes.get("/company/:company_id/user", userController.index);
routes.get("/user/cpf/:cpf", userController.index);
routes.get("/user/find/:id", userController.find);
routes.post(
  "/user",
  planUsageSecurityFunctions.planUserPerBranchLimit,
  userSecurityFunctionsMiddleware.userStoreCheck,
  userMiddleware.create,
  userController.store
);
routes.put(
  "/user/:id",
  userSecurityFunctionsMiddleware.userUpdateCheck,
  userMiddleware.update,
  userController.update
);
routes.delete(
  "/user/:id",
  userSecurityFunctionsMiddleware.userUpdateCheck,
  userController.delete
);

routes.get("/productType", productTypeController.index);
routes.get("/productType/find/:id", productTypeController.find);

routes.get("/unit", unitOfMeasurementController.index);
routes.get("/unit/find/:id", unitOfMeasurementController.find);

routes.get("/company/:company_id/product", productController.index);
routes.get("/company/:company_id/product/barCode/:bar_code", productController.index);
routes.get("/product/find/:id", productController.find);
routes.post(
  "/product",
  multerInstance.single("image"),
  productSecurityFunctionsMiddleware.productStoreCheck,
  firebaseImageUploadService.uploadProductImage,
  productMiddleware.create,
  productController.store
);
routes.put(
  "/product/:id",
  multerInstance.single("image"),
  firebaseImageUploadService.uploadProductImage,
  productSecurityFunctionsMiddleware.productUpdateCheck,
  productMiddleware.update,
  productController.update
);
routes.delete(
  "/product/:id",
  productSecurityFunctionsMiddleware.productUpdateCheck,
  productController.delete
);

routes.get("/logbook", logbookController.index);
routes.get("/branch/:branch_id/logbook", logbookController.index);
routes.get("/company/:company_id/logbook", logbookController.index);
routes.get("/logbook/find/:id", logbookController.find);
routes.post(
  "/logbook",
  logbookSecurityFunctionsMiddleware.logbookStoreCheck,
  logBookInventoryMiddleware.create,
  logbookController.store
);
routes.put(
  "/logbook/:id",
  logbookSecurityFunctionsMiddleware.logbookUpdateCheck,
  logBookInventoryMiddleware.update,
  logbookController.update
);

routes.get("/lot", lotController.index);
routes.get("/logbook/:logbook_id/lot", lotController.index);
routes.get("/lot/find/:id", lotController.find);
routes.put(
  "/lot/:id",
  lotSecurityFunctionsMiddleware.lotUpdateCheck,
  lotMiddleware.update,
  lotController.update
);

routes.get("/costumer", costumerController.index);
routes.get("/costumer/cpf/:cpf", costumerController.index);
routes.get("/costumer/:id", costumerController.find);
routes.post(
  "/costumer",
  costumerSecurityFunctionsMiddleware.costumerStoreCheck,
  costumerMiddleware.create,
  costumerController.store
);
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
routes.get("/company/:company_id/purchase", purchaseController.index);
routes.get("/purchase/find/:id", purchaseController.find);
routes.post(
  "/purchase",
  itemCartSecurityFunctionsMiddleware.verfityArrayOfItems,
  purchaseSecurityFunctionsMiddleware.userStoreCheck,
  purchaseMiddleware.create,
  purchaseController.store
);
routes.put(
  "/purchase/:id",
  purchaseSecurityFunctionsMiddleware.userUpdateCheck,
  purchaseMiddleware.update,
  purchaseController.update
);
routes.delete(
  "/purchase/:id",
  purchaseSecurityFunctionsMiddleware.userUpdateCheck,
  purchaseController.delete
);

routes.get("/itemPurchase", itemPurchaseController.index);
routes.get("/purchase/:purhcase_id/itemPurchase", itemPurchaseController.index);
routes.get("/itemPurchase/:id", itemPurchaseController.find);
routes.post(
  "/itemPurchase",
  itemCartSecurityFunctionsMiddleware.verfityItem,
  itemPurchaseMiddle.create,
  itemPurchaseController.store
);
routes.delete("/itemPurchase/:id", itemPurchaseController.delete);

routes.get("/sale", saleController.index);
routes.get("/branch/:branch_id/sale", saleController.index);
routes.get("/company/:company_id/sale", saleController.index);
routes.get("/sale/find/:id", saleController.find);
routes.post(
  "/sale",
  itemCartSecurityFunctionsMiddleware.verfityArrayOfItems,
  saleSecurityFunctionsMiddleware.userStoreCheck,
  saleMiddleware.create,
  saleController.store
);
routes.put(
  "/sale/:id",
  saleSecurityFunctionsMiddleware.userUpdateCheck,
  saleMiddleware.update,
  saleController.update
);
routes.delete("/sale/:id", saleController.delete);

routes.get("/itemSale", itemSaleController.index);
routes.get("/sale/:sale_id/itemSale", itemSaleController.index);
routes.get("/itemSale/:id", itemSaleController.find);
routes.post(
  "/itemSale",
  itemCartSecurityFunctionsMiddleware.verfityItem,
  itemSaleMiddleware.create,
  itemSaleController.store
);
routes.delete("/itemSale/:id", itemSaleController.delete);

routes.get("/branch/:branch_id/billToReceive", billToReceiveController.index);
routes.get("/billToReceive/find/:id", billToReceiveController.find);
routes.put(
  "/billToReceive/:id",
  billToReceiveSecurityFunctionsMiddleware.userUpdateCheck,
  billToReceiveMiddleware.update,
  billToReceiveController.update
);

routes.get("/branch/:branch_id/billToPay", billToPayController.index);
routes.get("/billToPay/find/:id", billToPayController.find);
routes.put(
  "/billToPay/:id",
  billToPaySecurityFunctionsMiddleware.userUpdateCheck,
  billToPayMiddleware.update,
  billToPayController.update
);

routes.put(
  "/address/:id",
  addressSecurityFunctionsMiddleware.addressUpdateCheck,
  addressMiddleware.update,
  addressController.update
);

routes.get(
  "/branch/:branch_id/inventory/report",
  inventoryReportController.index
);

routes.get(
  "/branch/:branch_id/financial/report",
  financialReportController.index
);

routes.post(
  "/site/company/:company_id",
  planUsageSecurityFunctions.planWebsiteCreate,
  companySiteFunctionsMiddleware.companySiteCheck,
  multerInstance.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
  ]),
  firebaseImageUploadService.uploadWebsiteImages,
  websiteMiddleware.create,
  companySiteController.store
);
routes.put(
  "/site/company/:company_id",
  companySiteFunctionsMiddleware.companySiteCheck,
  multerInstance.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
  ]),
  firebaseImageUploadService.uploadWebsiteImagesWithSkip,
  websiteMiddleware.update,
  companySiteController.update
);

module.exports = routes;
