module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    organisationId: { type: DataTypes.INTEGER, allowNull: false },
  });

  Employee.associate = (models) => {
    Employee.belongsTo(models.Organisation, { foreignKey: "organisationId" });
    Employee.belongsToMany(models.Team, {
      through: models.EmployeeTeam,
      foreignKey: "teamId",
      otherKey: "employeeId",
    });
  };

  return Employee;
};
