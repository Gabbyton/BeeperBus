const { Model, DataTypes } = require("sequelize");
const sequelize = require("../core/db");

class Arrival extends Model {
  static serialize(rawArrivalsData, doSave = false) {
    const arrivalEntries = [];
    const badEntries = [];

    const routes = rawArrivalsData;

    routes.forEach(async function (route) {
      const stopId = route["RouteStopID"];
      const stops = route["Stops"];

      stops.forEach(async function (stop) {
        const routeId = parseInt(stop["RouteID"]);
        const arrivalAt = stop["SecondsToNextStop"]; // arrivalAt now in seconds to current stop

        try {
          const arrivalEntry = Arrival.build({
            stopId: stopId,
            routeId: routeId,
            arrivalAt: arrivalAt,
          });
          arrivalEntries.push(arrivalEntry);
          if (doSave) {
            await arrivalEntry.save();
          }
        } catch (e) {
          badEntries.push({
            stopId: stopId,
            routeId: routeId,
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
    stopId: DataTypes.STRING,
    routeId: DataTypes.INTEGER,
    arrivalAt: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "arrival",
    allowNull: false,
  },
);

module.exports = Arrival;
