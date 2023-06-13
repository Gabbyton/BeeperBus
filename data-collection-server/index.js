// index.js
//
// This file contains the server code for collecting data from Transloc.
//
// The sequence is as follows:
//
// 1. Import necessary libraries.
// 2. Connect to database using sequelize (we don't have one yet, you
//    can create your own local database instance and test it out)
// 3. Initialize credentials for API. I'll update the repo with the
//    env file. It should contain the credentials.
// 4. Every second, fetch data from API. Save it into the specified Sequelize
//    object and save it to database.
// 5. If error encountered, print to log.
//
// TODO : plan code structure and procedure
// TODO : split file into workable modules
// TODO : create env file with credentials
const axios = require("axios"); // module for external API calls
const express = require("express"); // module for building REST APIs
const { Sequelize, DataTypes } = require("sequelize"); // interfaces SQL and js operations

const app = express(); // module for starting REST server
// TODO : update keywords with credentials
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres",
});

// Define a model for the data
const Data = sequelize.define("Data", {
  // Define your data fields here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // TODO : model the data with an appropriate object
});

// Connect to the PostgreSQL database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database has been established successfully.");
    // Sync the model with the database (create the table if it doesn't exist)
    return Data.sync();
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Fetch data from Transloc API every second and save to the database
setInterval(() => {
  axios
    // TODO : change endpoint to vehicles
    .get("https://transloc-api-1-2.p.rapidapi.com/your-endpoint", {
      headers: {
        "x-rapidapi-host": "transloc-api-1-2.p.rapidapi.com",
        // TODO : change key to appropriate label
        "x-rapidapi-key": "YOUR-RAPIDAPI-KEY",
      },
    })
    .then((response) => {
      const data = response.data;
      // Save the data to the database
      Data.create(data)
        .then(() => {
          // TODO : change the message to a silent time log
          console.log("Data saved to the database.");
        })
        .catch((error) => {
          // TODO : structured file handling
          console.error("Error saving data:", error);
        });
    })
    .catch((error) => {
      // TODO : output to log the error
      // TODO : find an api that can alert us whenever our server has problems
      console.error("Error fetching data from Transloc API:", error);
    });
}, 1000);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
