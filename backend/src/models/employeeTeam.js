module.exports = (sequelize, DataTypes) => {
  const EmployeeTeam = sequelize.define(
    "EmployeeTeam",
    {
      // Explicitly define the foreign keys so they match your controller code
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Employees",
          key: "id",
        },
      },
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Teams",
          key: "id",
        },
      },
    },
    { timestamps: true }
  );
  return EmployeeTeam;
};
