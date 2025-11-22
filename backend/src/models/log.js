module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define("Log", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    organisationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    action: DataTypes.STRING,
    meta: DataTypes.JSON,
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  return Log;
};
