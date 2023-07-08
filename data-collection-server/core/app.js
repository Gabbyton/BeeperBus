const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();

const errlogFilePath = path.join(__dirname, "app-error.log");
const errorLogStream = fs.createWriteStream(errlogFilePath, { flags: "a" });

// Middleware for logging errors
app.use((err, req, res, next) => {
  console.error(err);
  errorLogStream.write(`${new Date().toISOString()} - ${err.stack}\n`);
  next(err);
});

app.get("/", (req, res) => {
  res.send("this is working!");
});

module.exports = app;
