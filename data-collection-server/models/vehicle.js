const { Model, DataTypes } = require("sequelize");
const sequelize = require("../core/db");

class Vehicle extends Model {
  static serialize(vehicles, doSave = false) {
    const vehicleEntries = [];
    const badEntries = [];

    var hasBadEntries = false;

    vehicles.forEach(async function (rawVehicle) {
      try {
        const vehicleEntry = Vehicle.build({
          callName: rawVehicle["Name"],
          vehicleId: parseInt(rawVehicle["VehicleID"]),
          routeId: parseInt(rawVehicle["RouteID"]),
          lat: parseFloat(rawVehicle["Latitude"]),
          long: parseFloat(rawVehicle["Longitude"]),
          heading: parseInt(rawVehicle["Heading"]),
        });

        vehicleEntries.push(vehicleEntry);

        if (doSave) {
          await vehicleEntry.save();
        }
      } catch (e) {
        hasBadEntries = true;
        badEntries.push(rawVehicle);
      }
    });

    if (hasBadEntries) {
      // TODO: put in log instead
      console.warn("vehicles have bad entries.");
    }

    return [vehicleEntries, badEntries];
  }
}

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
  },
);

module.exports = Vehicle;
