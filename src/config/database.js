module.exports = {
  host: "localhost",
  username: "root",
  password: "bcd127",
  database: process.env.NODE_ENV === "test" ? "test_db_fts" : "db_fts",
  dialect: "mysql",
  define: {
    timestamp: true,
    underscored: true,
  },
};
