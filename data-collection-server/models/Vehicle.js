// routes/vehicles.js

const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const fetchTranslocData = require("../utils/fetchTranslocData");

const Vehicle = sequelize.define("Vehicle", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // TODO: model vehicle data
  // Add other relevant fields here
  //
  // TODO: add REST implementation
  //
});

router.get("/", async (req, res) => {
  try {
    // TODO: separate utilities for data types
    const data = await fetchTranslocData(); // Implement the logic to fetch data from the Transloc API
    // Save the data to the database
    const vehicles = await Vehicle.bulkCreate(data);
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
