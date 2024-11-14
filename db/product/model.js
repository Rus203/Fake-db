const { DataTypes } = require("sequelize");

exports.connectProductModule = (sequelize) => {
  return sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      inActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      mapHash: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
