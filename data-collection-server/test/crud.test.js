// crud.test.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");

const db = require("../core/db");
const app = require("../core/app");

const Vehicle = require("../models/vehicle");

const expect = chai.expect;
const assert = chai.assert;
chai.use(chaiHttp);

describe("express server", function () {
  it("runs", function (done) {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("database", function () {
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
