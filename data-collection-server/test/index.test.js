// index.test.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");

const db = require("../core/db");
const app = require("../core/app");

const expect = chai.expect;
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
  it("connects to the database", function (done) {
    db.authenticate()
      .then(function () {
        done();
      })
      .catch(function (err) {
        console.error(err);
      });
  });

  it("creates a new vehicle entry", function (done) {});
});
