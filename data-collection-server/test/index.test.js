const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");

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
