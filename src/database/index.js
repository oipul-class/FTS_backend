const Sequelize = require("sequelize");
const DBConfig = require("../config/database");

const connection = new Sequelize(DBConfig);

const Branch = require("../models/Branch");
const Company = require("../models/Company");
const Manager = require("../models/Manager");
const Plan = require("../models/Plan");
const Role = require("../models/Role");
const User = require("../models/User");
const Permission = require("../models/Permission");
const Screen = require("../models/Screen");
const Employer = require("../models/Employer");

Branch.init(connection);
Company.init(connection);
Manager.init(connection);
Plan.init(connection);
Role.init(connection);
User.init(connection);
Permission.init(connection);
Screen.init(connection);
Employer.init(connection);

Branch.associate(connection.models);
Company.associate(connection.models);
Manager.associate(connection.models);
Plan.associate(connection.models);
Role.associate(connection.models);
User.associate(connection.models);
Permission.associate(connection.models);
Screen.associate(connection.models);
Employer.associate(connection.models);
