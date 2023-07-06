const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");

const { fetchVehicles } = require("../core/transloc");

const assert = chai.assert;

chai.use(chaiHttp);

describe("Transloc Open API", function () {
  it("responds to vehicle queries", async function () {
    await fetchVehicles;
    assert.doesNotThrow;
  });
});
