require("dotenv").config();

let dbName = process.env.DATABASE_DB;

if (process.env.NODE_ENV && process.env.NODE_ENV == "test")
  dbName = `test_${process.env.DATABASE_DB}`;

module.exports = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: dbName,
  dialect: "mysql",
  define: {
    timezone: "-2:00",
    timestamp: true,
    underscored: true,
    timezone: "America/Sao_Paulo",
  },
};
