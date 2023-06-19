// models/Arrival.js

const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Arrival = sequelize.define("Arrival", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // Add other relevant fields here
});

module.exports = Arrival;
