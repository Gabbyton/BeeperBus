const { Model, DataTypes } = require("sequelize");
const sequelize = require("../core/db");

class Vehicle extends Model {}

Vehicle.init(
  {
    callName: DataTypes.STRING,
    vehicleId: DataTypes.INTEGER,
    routeId: DataTypes.INTEGER,
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT,
    heading: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "vehicle",
    allowNull: false,
  }
);

module.exports = Vehicle;
