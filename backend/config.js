require("dotenv").config();

module.exports = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: "mysql",
  },
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
};
