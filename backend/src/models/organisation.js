module.exports = (sequelize, DataTypes) => {
  const Organisation = sequelize.define("Organisation", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  });

  Organisation.associate = (models) => {
    Organisation.hasMany(models.User, { foreignKey: "organisationId" });
    Organisation.hasMany(models.Employee, { foreignKey: "organisationId" });
    Organisation.hasMany(models.Team, { foreignKey: "organisationId" });
    Organisation.hasMany(models.Log, { foreignKey: "organisationId" });
  };

  return Organisation;
};
