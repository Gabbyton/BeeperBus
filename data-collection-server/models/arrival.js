const { Model, DataTypes } = require("sequelize");
const sequelize = require("../core/db");

class Arrival extends Model {}

Arrival.init( // TODO change this to match the expected data from arrivals
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
    modelName: "arrival",
    allowNull: false,
  }
);

module.exports = Arrival;
