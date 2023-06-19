// db.js

const Sequelize = require("sequelize");
const config = require("./config");

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

// Create the database if it doesn't exist
if (dbConfig.createDatabase) {
  sequelize
    .query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database};`)
    .then(() => {
      console.log("Database created or already exists");
    })
    .catch((err) => {
      console.error("Error creating database:", err);
      process.exit(1);
    });
}

module.exports = sequelize;
