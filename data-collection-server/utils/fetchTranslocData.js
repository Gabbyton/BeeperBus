// utils/fetchTranslocData.js

const axios = require("axios");

const config = require("./config"); // GitHub #2

const env = process.env.NODE_ENV || "development";
const apiConfig = config[env];

const options = {
  method: "GET",
  url: "https://transloc-api-1-2.p.rapidapi.com/arrival-estimates.json",
  params: {
    agencies: "1199",
    callback: "call",
  },
  headers: {
    "X-RapidAPI-Key": apiConfig.apikey,
    "X-RapidAPI-Host": apiConfig.apihost,
  },
};

const fetchTranslocData = async () => {
  try {
    const response = await axios.request(options);

    const data = response.data; // Modify this line according to the Transloc API response structure
    // TODO: model the data
    // Process and transform the data as needed
    // For example, if the data is an array of objects and you only need specific fields, you can use the map() method to extract those fields
    const transformedData = data.map((item) => ({
      field1: item.field1,
      field2: item.field2,
      // Add more fields as needed
    }));

    return transformedData;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data from the Transloc API");
  }
};

module.exports = fetchTranslocData;
