const axios = require("axios");

const config = require("../secrets/config");

const env = process.env.NODE_ENV || "development";
const apiConfig = config[env];

const vehicleOptions = {
  method: "GET",
  url: "https://transloc-api-1-2.p.rapidapi.com/vehicles.json",
  params: {
    agencies: "1199",
    callback: "call",
  },
  headers: {
    "X-RapidAPI-Key": apiConfig.apikey,
    "X-RapidAPI-Host": apiConfig.apihost,
  },
};

const arrivalOptions = {
  method: "GET",
  url: "https://transloc-api-1-2.p.rapidapi.com/arrival-estimates.json",
  params: {
    agencies: "1199",
    routes: '4000421,4000592,4005122',  // TODO add actual routes and stops
    stops: '4002123,4023414,4021521',
    callback: "call",
  },
  headers: {
    "X-RapidAPI-Key": apiConfig.apikey,
    "X-RapidAPI-Host": apiConfig.apihost,
  },
}

getVehicles = async function () {
  try {
    const response = await axios.request(vehicleOptions);
    rawVehicleData = response.data["data"]["1199"];
    return rawVehicleData;
  } catch (error) {
    console.error(error);
  }
};

getVehicles();

getArrivals = async function () {
  try {
    const response = await axios.request(arrivalOptions);
    const rawArrivalsData = response.data["data"]
    return rawArrivalsData;
  } catch (error) {
    console.error(error);
  }
}

getArrivals();