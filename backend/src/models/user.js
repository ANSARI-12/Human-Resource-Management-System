module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: DataTypes.STRING,
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    organisationId: { type: DataTypes.INTEGER, allowNull: false },
  });

  User.associate = (models) => {
    User.belongsTo(models.Organisation, { foreignKey: "organisationId" });
  };

  return User;
};
