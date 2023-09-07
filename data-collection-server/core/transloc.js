const axios = require("axios");

const config = require("../secrets/config");

const env = process.env.NODE_ENV || "development";
const apiConfig = config[env];

const vehicleOptions = {
  method: "GET",
  url: "https://casewestern.transloc.com/Services/JSONPRelay.svc/GetMapVehiclePoints",
  params: {
    apiKey: "8882812681",
  },
};

const arrivalOptions = {
  method: "GET",
  url: "https://casewestern.transloc.com/Services/JSONPRelay.svc/GetRoutesForMapWithScheduleWithEncodedLine",
  params: {
    apiKey: "8882812681",
    isDispatch: false,
  },
};

getVehicles = async function () {
  try {
    const response = await axios.request(vehicleOptions);
    rawVehicleData = response.data;
    return rawVehicleData;
  } catch (error) {
    console.error(error);
  }
};

getArrivals = async function () {
  try {
    const response = await axios.request(arrivalOptions);
    const rawArrivalsData = response.data;
    return rawArrivalsData;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getVehicles, getArrivals };
