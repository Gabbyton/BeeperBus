// index.test.js
// TODO : document test
// TODO : create more tests for proper error handling
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");

const expect = chai.expect;
chai.use(chaiHttp);

// Replace 'http://localhost:3000' with the actual server URL
chai
  .request("http://localhost:3000")
  .get("/")
  .end((err, res) => {
    describe("Server", () => {
      it("should have a successful status code", () => {
        expect(res).to.have.status(200);
      });
    });
  });

// Run the tests
mocha.run();
