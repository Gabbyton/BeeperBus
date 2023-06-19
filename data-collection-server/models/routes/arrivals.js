// routes/arrivals.js

const express = require("express");
const router = express.Router();
const Arrival = require("../models/Arrival");
const fetchTranslocData = require("../utils/fetchTranslocData");

router.get("/", async (req, res) => {
  try {
    const data = await fetchTranslocData(); // Implement the logic to fetch data from the Transloc API
    // Save the data to the database
    const arrivals = await Arrival.bulkCreate(data);
    res.json(arrivals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
