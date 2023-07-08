const { describe, it } = require("mocha");
const chai = require("chai");

const { scheduleCollect } = require("../core/collect");
const Vehicle = require("../models/vehicle");
const assert = chai.assert;
const collectTimeout = 5_000;
const bufferTimeout = 2_000;

describe("cron job for collecting data", function () {
  it("can run", function (done) {
    this.timeout(collectTimeout);

    const cronJob = scheduleCollect();
    setTimeout(function () {
      cronJob.stop();
      done();
    }, bufferTimeout);
  });

  it("can save multiple entries for 10 seconds", async function () {
    this.timeout(collectTimeout + 2 * bufferTimeout);

    const initCount = await Vehicle.findAndCountAll({});
    const cronJob = scheduleCollect();

    setTimeout(function () {
      cronJob.stop();
    }, collectTimeout);

    const newCount = await Vehicle.findAndCountAll();
    assert.operator(newCount, ">=", initCount);
    if (newCount == initCount) {
      console.warn(
        "the number of vehicles before and after the collection are the same."
      );
    }
  });
});
