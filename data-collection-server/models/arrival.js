const { Model, DataTypes } = require("sequelize");
const sequelize = require("../core/db");

class Arrival extends Model {}

Arrival.init(
  {
    generatedOn: DataTypes.STRING,
    agencyId: DataTypes.STRING,
    stopId: DataTypes.STRING,
    routeId: DataTypes.INTEGER,
    vehicleId: DataTypes.INTEGER,
    arrivalAt: DataTypes.STRING,
    type: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "arrival",
    allowNull: false,
  }
);

module.exports = Arrival;
