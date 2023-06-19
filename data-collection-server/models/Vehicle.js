// routes/vehicles.js

const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const fetchTranslocData = require("../utils/fetchTranslocData");

router.get("/", async (req, res) => {
  try {
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
