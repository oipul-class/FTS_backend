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

for (let assoc of Object.keys(Sale.associations)) {
     for (let accessor of Object.keys(Sale.associations[assoc].accessors)) {
         console.log(Sale.name + '.' + Sale.associations[assoc].accessors[accessor] + '()');
     }
}