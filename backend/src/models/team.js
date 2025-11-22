module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define("Team", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    organisationId: { type: DataTypes.INTEGER, allowNull: false },
  });

  Team.associate = (models) => {
    Team.belongsTo(models.Organisation, { foreignKey: "organisationId" });
    Team.belongsToMany(models.Employee, {
      through: models.EmployeeTeam,
      foreignKey: "teamId",
      otherKey: "employeeId",
    });
  };

  return Team;
};
