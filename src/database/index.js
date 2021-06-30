const Sequelize = require("sequelize");
const DBConfig = require("../config/database");

const connection = new Sequelize(DBConfig);

const Branch = require("../models/Branch");
const Company = require("../models/Company");
const Plan = require("../models/Plan");
const Role = require("../models/Role");
const User = require("../models/User");
const Permission = require("../models/Permission");
const Screen = require("../models/Screen");
const ProductType = require("../models/ProductType");
const UnitOfMeasurement = require("../models/UnitOfMeasurement");
const Product = require("../models/Product");
const Lot = require("../models/Lot");
const Costumer = require("../models/Costumer");
const LogBookInventory = require("../models/LogBookInventory");
const PaymentMethod = require("../models/PaymentMethod");
const Purchase = require("../models/Purchase");
const Sale = require("../models/Sale");
const ItemPurchase = require("../models/ItemPurchase");
const ItemSale = require("../models/ItemSale");
const BillToPay = require("../models/BillToPay");
const BillToReceive = require("../models/BillToReceive");
const Address = require("../models/Address");
const Website = require("../models/Website");
const Phone = require("../models/Phone");

Branch.init(connection);
Company.init(connection);
Plan.init(connection);
Role.init(connection);
User.init(connection);
Permission.init(connection);
Screen.init(connection);
ProductType.init(connection);
UnitOfMeasurement.init(connection);
Product.init(connection);
Lot.init(connection);
Costumer.init(connection);
LogBookInventory.init(connection);
PaymentMethod.init(connection);
Purchase.init(connection);
Sale.init(connection);
ItemPurchase.init(connection);
ItemSale.init(connection);
BillToPay.init(connection);
BillToReceive.init(connection);
Address.init(connection);
Website.init(connection);
Phone.init(connection);

Branch.associate(connection.models);
Company.associate(connection.models);
Plan.associate(connection.models);
Role.associate(connection.models);
User.associate(connection.models);
Permission.associate(connection.models);
Screen.associate(connection.models);
ProductType.associate(connection.models);
UnitOfMeasurement.associate(connection.models);
Product.associate(connection.models);
Lot.associate(connection.models);
Costumer.associate(connection.models);
LogBookInventory.associate(connection.models);
PaymentMethod.associate(connection.models);
Purchase.associate(connection.models);
Sale.associate(connection.models);
ItemPurchase.associate(connection.models);
ItemSale.associate(connection.models);
BillToPay.associate(connection.models);
BillToReceive.associate(connection.models);
Address.associate(connection.models);
Website.associate(connection.models);
Phone.associate(connection.models);

module.exports = connection;


for (let assoc of Object.keys(Branch.associations)) {
     for (let accessor of Object.keys(Branch.associations[assoc].accessors)) {
         console.log(Branch.name + '.' + Branch.associations[assoc].accessors[accessor] + '()');
     }
}
