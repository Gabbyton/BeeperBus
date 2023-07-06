// index.test.js
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
  it("connects to the database", async function () {
    return db.authenticate();
  });

  it("syncs the table and creates a new vehicle entry", async function () {
    await Vehicle.sync({ force: true });

    const val = await Vehicle.create({
      callName: "abc123",
      vehicleId: 1234,
      routeId: 4567,
      lat: -35.4343,
      long: 36.545,
      heading: 101,
    });

    assert.ok(val);
    assert.isNotNull(val);
    assert.isDefined(val);
  });
});
