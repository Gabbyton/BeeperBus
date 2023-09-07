const path = require("path");
const fs = require("fs");

const winston = require('winston');
const { format } = winston;
const { combine, timestamp, label, json, colorize, splat } = format;

const express = require("express");
const app = express();

mainLabel = label({ label: 'main' })
const consoleFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
winston.loggers.add('main', {
  format: combine(
    mainLabel,
    timestamp(),
    json()
  ),
  transports: [
    new winston.transports.Console({
      level: 'silly',
      format: combine(
        colorize({all:true}),
        mainLabel,
        timestamp(),
        splat(),
        consoleFormat
      )
    }),
    new winston.transports.File({ filename: 'logs/combined.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/errors.log', level: 'error' })
  ]
});
const logger = winston.loggers.get('main');

// Middleware for logging errors
app.use((err, req, res, next) => {
  logger.error(err.message)
  next(err);
});

app.get("/", (req, res) => {
  res.send("this is working!");
});

module.exports = app;
