// db.test.js
// TODO: document test
const chai = require("chai");
const chaiHttp = require("chai-http");
const { Sequelize } = require("sequelize");

const config = require("../config");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

chai.use(chaiHttp);
const expect = chai.expect;

describe("Express Server Test", function () {
  before(async function () {
    await sequelize.authenticate();
  });

  // Check if the "beeperbus" database exists
  it('should have the "beeperbus" database', async function () {
    const query = `SELECT datname FROM pg_catalog.pg_database WHERE datname = 'beeperbus'`;
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    expect(result.length).to.equal(1);
  });

  // Check if the "arrivals" table exists
  it('should have the "arrivals" table', async function () {
    const query = `SELECT to_regclass('beeperbus.arrivals')`;
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    expect(result[0].to_regclass).to.equal("beeperbus.arrivals");
  });

  // Check if the "vehicles" table exists
  it('should have the "vehicles" table', async function () {
    const query = `SELECT to_regclass('beeperbus.vehicles')`;
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    expect(result[0].to_regclass).to.equal("beeperbus.vehicles");
  });

  after(async function () {
    await sequelize.close();
  });
});
