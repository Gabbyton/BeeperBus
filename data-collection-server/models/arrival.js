const { Model, DataTypes } = require("sequelize");
const sequelize = require("../core/db");

class Arrival extends Model {
  static serialize(rawArrivalsData, doSave = false) {
    const arrivalEntries = [];
    const badEntries = [];

    const routes = rawArrivalsData;

    routes.forEach(async function (route) {
      const stopId = route["RouteStopID"];
      const stops = routes["Stops"];

      stops.forEach(async function (stop) {
        const routeId = parseInt(stop["RouteID"]);
        // const vehicleId = parseInt(stop[""]);
        const arrivalAt = stop["SecondsToNextStop"]; // arrivalAt now in seconds to current stop
        // const type = stop["type"];

        try {
          const arrivalEntry = Arrival.build({
            // generatedOn: generatedOn, // TODO: replace with timestamp of record
            // agencyId: agencyId,
            stopId: stopId,
            routeId: routeId,
            // vehicleId: vehicleId,
            arrivalAt: arrivalAt,
            // type: type,
          });
          arrivalEntries.push(arrivalEntry);
          if (doSave) {
            await arrivalEntry.save();
          }
        } catch (e) {
          badEntries.push({
            // generated_on: generatedOn,
            // agency_id: agencyId,
            stopId: stopId,
            routeId: routeId,
            // vehicle_id: stop["vehicle_id"],
            arrivalAt: arrivalAt,
            type: type,
          });
        }
      });
    });

    if (badEntries.length) {
      console.warn("arrivals has bad entries");
    }

    return [arrivalEntries, badEntries];
  }
}

Arrival.init(
  {
    // generatedOn: DataTypes.STRING,
    // agencyId: DataTypes.STRING,
    stopId: DataTypes.STRING,
    routeId: DataTypes.INTEGER,
    // vehicleId: DataTypes.INTEGER,
    arrivalAt: DataTypes.STRING,
    // type: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "arrival",
    allowNull: false,
  },
);

module.exports = Arrival;
