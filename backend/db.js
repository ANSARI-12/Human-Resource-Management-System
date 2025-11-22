const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

async function createDatabaseIfNotExists() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
    });
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
    );
    await connection.end();
    console.log("Database checked/created");
  } catch (err) {
    console.error("Error creating database:", err);
  }
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

(async () => {
  await createDatabaseIfNotExists();
  sequelize
    .authenticate()
    .then(() => console.log("MySQL Connected"))
    .catch((err) => console.error("DB Error:", err));
})();

module.exports = sequelize;
