const { Model, DataTypes } = require("sequelize");
const sequelize = require("../core/db");

class Vehicle extends Model {
  static async serialize(vehicles, doSave = false) {
    const vehicleEntries = [];
    const badEntries = [];

    var hasBadEntries = false;

    vehicles.forEach((rawVehicle) => {
      try {
        const vehicleEntry = Vehicle.build({
          callName: rawVehicle["call_name"],
          vehicleId: parseInt(rawVehicle["vehicle_id"]),
          routeId: parseInt(rawVehicle["route_id"]),
          lat: parseFloat(rawVehicle["location"]["lat"]),
          long: parseFloat(rawVehicle["location"]["lng"]),
          heading: parseInt(rawVehicle["heading"]),
        });
 
        vehicleEntries.push(vehicleEntry);
        
        if (doSave) {
          vehicleEntry.save();
        }
      } catch (e) {
        hasBadEntries = true;
        badEntries.push(rawVehicle);
      }
    });

    if (hasBadEntries) {
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
  }
);

module.exports = Vehicle;
