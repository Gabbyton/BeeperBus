// index.js

const express = require("express");
const app = express();
const sequelize = require("./db");
//
// Create the database and tables if they don't exist
sequelize.sync({ force: false }).then(() => {
  console.log("Database and tables synced!");
  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
