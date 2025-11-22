const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS
db.Organisation = require("./organisation")(sequelize, DataTypes);
db.User = require("./user")(sequelize, DataTypes);
db.Employee = require("./employee")(sequelize, DataTypes);
db.Team = require("./team")(sequelize, DataTypes);
db.EmployeeTeam = require("./employeeTeam")(sequelize, DataTypes);
db.Log = require("./log")(sequelize, DataTypes);

// ASSOCIATIONS
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
