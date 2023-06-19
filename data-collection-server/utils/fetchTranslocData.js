// utils/fetchTranslocData.js

const axios = require("axios");

const fetchTranslocData = async () => {
  try {
    const response = await axios.get(
      "https://api.transloc.com/v1/your-endpoint"
    );
    const data = response.data; // Modify this line according to the Transloc API response structure

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
