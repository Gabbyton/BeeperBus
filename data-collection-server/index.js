const app = require("./core/app");
const port = 3000;

const { scheduleCollect } = require("./core/collect");
const { scheduleDump } = require("./core/dump");

console.log("starting data collection operation...");
scheduleCollect();

console.log("scheduling dump operation...");
scheduleDump();

app.listen(port, function () {
  console.log(`server listening at port ${port}...`);
});
