const fs = require("fs");
const path = require("path");

const cron = require("node-cron");

const Vehicle = require("../models/vehicle");
const { getVehicles } = require("./transloc");

// Create a log file for error logging
const parentPath = path.resolve(__dirname, "..");
const errlogFilePath = path.join(parentPath, "logs", "app-error.log");
const savelogFilePath = path.join(parentPath, "logs", "save-log.log");
const errorLogStream = fs.createWriteStream(errlogFilePath, { flags: "a" });
const saveLogStream = fs.createWriteStream(savelogFilePath, { flags: "a" });

// Function to collect and save data
async function collectAndSaveData() {
  try {
    const vehicleData = await getVehicles();
    await Vehicle.serialize(vehicleData, (doSave = true));
    saveLogStream.write(`[${new Date().toISOString()}]\tSaved vehicle data\n`);
  } catch (err) {
    errorLogStream.write(
      `[${new Date().toISOString()}]\tError collecting vehicle data:\n${err}\n`
    );
  }
}

scheduleCollect = function () {
  // Schedule the data collection using cron (every second
  const cronJob = cron.schedule("* * * * * *", collectAndSaveData);
  return cronJob;
};

module.exports = { scheduleCollect };
