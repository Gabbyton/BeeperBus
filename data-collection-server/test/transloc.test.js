const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");

const { getVehicles } = require("../core/transloc");

const Vehicle = require("../models/vehicle");
const { scheduleCollect } = require("../core/collect");

const assert = chai.assert;
chai.use(chaiHttp);

describe("Transloc Open API", function () {
  it("responds to vehicle queries", async function () {
    const data = await getVehicles();
    assert.isDefined(data);
    assert.isArray(data);
  });

  it("responds to arrival queries", async function () {
    const data = await getArrivals()
    assert.isDefined(data);
    assert.isArray(data["data"])
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
});
