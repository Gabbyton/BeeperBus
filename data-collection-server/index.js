// index.js

const express = require("express");
const app = express();
const sequelize = require("./db");

// Import route handlers
const vehiclesRoute = require("./routes/vehicles");
const arrivalsRoute = require("./routes/arrivals");

// Define routes
app.use("/vehicles", vehiclesRoute);
app.use("/arrivals", arrivalsRoute);

// Sync the Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  console.log("Database and tables synced!");
  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
