// index.test.js
// TODO : document test
// TODO : create more tests for proper error handling
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");
const app = require("../index");

chai.use(chaiHttp);

const expect = chai.expect;
const assert = chai.assert;

describe("mocha runs", function () {
  it("must be equal", function (done) {
    assert.equal(1, 1);
    done();
  });
});

describe("express server", function () {
  it("runs", function () {
    chai
      .request(app)
      .get("/")
      .end(function (_, res) {
        expect(res).to.have.status(200);
      });
  });
});
