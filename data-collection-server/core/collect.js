const fs = require("fs");
const path = require("path");

const cron = require("node-cron");
const winston = require("winston");

const Vehicle = require("../models/vehicle");
const Arrival = require("../models/arrival");
const { getVehicles, getArrivals } = require("./transloc");

logger = winston.loggers.get("main");

// Function to collect and save data
async function collectAndSaveData() {
  try {
    // make sure that the tables are present before collection
    Vehicle.sync();
    Arrival.sync();
  } catch (e) {
    logger.error(`Error syncing Vehicle and Arrival tables, ${err}`);
  }

  try {
    const vehicleData = await getVehicles();
    await Vehicle.serialize(vehicleData, (doSave = true));
    logger.info("Saved vehicle data");
  } catch (err) {
    logger.error(`Error collecting vehicle data, ${err}`);
  }
  try {
    const rawArrivalsData = await getArrivals();
    await Arrival.serialize(rawArrivalsData, (doSave = true));
    logger.info("Saved arrivals data");
  } catch (err) {
    logger.error(`Error collecting arrivals data, ${err}`);
  }
}

scheduleCollect = function () {
  // Schedule the data collection using cron (every 7 seconds)
  const cronJob = cron.schedule("*/7 * * * * *", collectAndSaveData);
  return cronJob;
};

module.exports = { scheduleCollect };
