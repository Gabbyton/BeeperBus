// models/Arrival.js

const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Arrival = sequelize.define("Arrival", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // TODO: model arrival data
  // Add other relevant fields here
});

router.get("/", async (req, res) => {
  try {
    const data = await fetchTranslocData(); // Implement the logic to fetch data from the Transloc API
    // Save the data to the database
    const arrival = await Arrival.bulkCreate(data);
    res.json(arrival);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = Arrival;
