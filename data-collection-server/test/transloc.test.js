const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");

const { getVehicles, getArrivals } = require("../core/transloc");

const Vehicle = require("../models/vehicle");
const Arrival = require("../models/arrival");

const assert = chai.assert;
chai.use(chaiHttp);

describe("Transloc Open API", function () {
  it("responds to vehicle queries", async function () {
    const data = await getVehicles();
    assert.isDefined(data);
    assert.isArray(data);
  });

  it("returns a serialized vehicle", async function () {
    const data = await getVehicles();
    const [vehicleEntries, badEntries] = Vehicle.serialize(data);

    assert.isArray(vehicleEntries);
    assert.isArray(badEntries);

    if (vehicleEntries.length > 0) {
      vehicleEntries.forEach(function (entry) {
        assert.isObject(entry);
      });
    } else {
      console.warn("packet did not return vehicles");
    }
    if (badEntries.length > 0) {
      badEntries.forEach(function (entry) {
        assert.isObject(entry);
        console.warn(`encountered serialize error at object: ${entry}`);
      });
    }
  });

  it("responds to arrival queries", async function () {
    const data = await getArrivals();
    assert.isDefined(data);
    assert.isArray(data["data"]);
  });

  it("returns a serialized arrival", async function () {
    const rawArrivalsData = await getArrivals();
    const [arrivalEntries, badEntries] = Arrival.serialize(rawArrivalsData);

    assert.isArray(arrivalEntries);
    assert.isArray(badEntries);

    if (arrivalEntries.length) {
      arrivalEntries.forEach(function (arrival) {
        assert.isObject(arrival);
      });
    } else {
      console.warn("serialization function did not return arrival objects");
    }
    if (badEntries.length) {
      badEntries.forEach(function (badEntry) {
        assert.isObject(badEntry);
        console.warn(`encountered serialization error at object: ${badEntry}`);
      });
    }
  });
});
