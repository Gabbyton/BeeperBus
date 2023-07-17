// crud.test.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");

const db = require("../core/db");

const Vehicle = require("../models/vehicle");
const Arrival = require("../models/arrival");

const expect = chai.expect;
const assert = chai.assert;
chai.use(chaiHttp);

describe("database: vehicle", function () {
  it("connects to the database", function () {
    return db.authenticate();
  });

  it("syncs the table and creates a new vehicle entry", async function () {
    await Vehicle.sync({ force: true });

    const val1 = await Vehicle.create({
      callName: "abc123",
      vehicleId: 1234,
      routeId: 4567,
      lat: -35.4343,
      long: 36.545,
      heading: 101,
    });

    const val2 = await Vehicle.create({
      callName: "abc456",
      vehicleId: 1234,
      routeId: 4567,
      lat: -35.4343,
      long: 36.545,
      heading: 101,
    });
  });

  it("retrieves an entry from the database", async function () {
    const entries = await Vehicle.findAll({
      attributes: ["callName"],
    });

    const callNames = [];
    entries.forEach(function (entry) {
      callNames.push(entry.callName);
    });

    expect(callNames).to.have.members(["abc123", "abc456"]);
  });

  it("can update an item", async function () {
    await Vehicle.update(
      { callName: "efg456" },
      {
        where: {
          callName: "abc456",
        },
      }
    );
    const entries = await Vehicle.findAll({
      attributes: ["callName"],
    });

    const callNames = [];
    entries.forEach(function (entry) {
      callNames.push(entry.callName);
    });

    expect(callNames).to.have.members(["abc123", "efg456"]);
  });

  it("can delete an item", async function () {
    await Vehicle.destroy({
      where: {
        callName: "efg456",
      },
    });

    const { count, _ } = await Vehicle.findAndCountAll({});
    assert.equal(count, 1);
  });
});

describe("database: arrival", function () {
  it("connects to the database", function () {
    return db.authenticate();
  });

  const generatedOnValues = {
    originalValues: ["original-value-1", "original-value-2"],
    updateValue: "updated-value-1",
  };

  it("syncs the table and creates a new arrival entry", async function () {
    await Arrival.sync({ force: true });

    await Arrival.create({
      generatedOn: generatedOnValues.originalValues[0],
      agencyId: "def456",
      stopId: "xyz789",
      routeId: 4567,
      vehicleId: 1234,
      arrivalAt: "tuv123",
      type: "typeA",
    });

    await Arrival.create({
      generatedOn: generatedOnValues.originalValues[1],
      agencyId: "def456",
      stopId: "xyz789",
      routeId: 4567,
      vehicleId: 1234,
      arrivalAt: "tuv123",
      type: "typeA",
    });
  });

  it("retrieves an entry from the database", async function () {
    const entries = await Arrival.findAll({
      attributes: ["generatedOn"],
    });

    const retrievedGeneratedOnValues = [];
    entries.forEach(function (entry) {
      retrievedGeneratedOnValues.push(entry.generatedOn);
    });

    expect(retrievedGeneratedOnValues).to.have.members(
      generatedOnValues.originalValues
    );
  });

  it("can update an item", async function () {
    await Arrival.update(
      { generatedOn: generatedOnValues.updateValue },
      {
        where: {
          generatedOn: generatedOnValues.originalValues[1],
        },
      }
    );
    const entries = await Arrival.findAll({
      attributes: ["generatedOn"],
    });

    const retrievedGeneratedOnValues = [];
    entries.forEach(function (entry) {
      retrievedGeneratedOnValues.push(entry.generatedOn);
    });

    expect(retrievedGeneratedOnValues).to.have.members([
      generatedOnValues.originalValues[0],
      generatedOnValues.updateValue,
    ]);
  });

  it("can delete an item", async function () {
    await Arrival.destroy({
      where: {
        generatedOn: generatedOnValues.updateValue,
      },
    });

    const { count, _ } = await Arrival.findAndCountAll({});
    assert.equal(count, 1);
  });
});
