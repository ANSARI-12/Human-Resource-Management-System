const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./db");
const authRoutes = require("./src/routes/auth");
const teamsRoutes = require("./src/routes/teams");
const employeesRoutes = require("./src/routes/employees");
const errorLogger = require("./src/middlewares/errorLogger");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/employees", employeesRoutes);

// Error Logger MUST be last
app.use(errorLogger);

app.get("/", (req, res) => res.send("HRMS Backend Running"));

// Sync DB + Start Server
sequelize.sync().then(() => {
  console.log("Database Synced");
  app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
  });
});

// Inside backend/index.js

const db = require("./src/models");

// CHANGE THIS LINE:
// db.sequelize.sync().then(() => {
db.sequelize.sync({ alter: true }).then(() => {
  // <--- Add { alter: true } here
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});
