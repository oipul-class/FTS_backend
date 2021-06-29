require("dotenv").config();
module.exports = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.NODE_ENV === "test" ? process.env.TESTE_DATABASE_DB  : process.env.DATABASE_DB ,
  dialect: "mysql",
  define: {
    timezone: "-2:00",
    timestamp: true,
    underscored: true,
    timezone: "America/Sao_Paulo",
  },
};
