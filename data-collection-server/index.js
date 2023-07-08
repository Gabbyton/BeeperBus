const app = require("./core/app");
const port = 3000;

const { scheduleCollect } = require("./core/collect");

console.log("starting data collection operation...");
scheduleCollect();

app.listen(port, function () {
  console.log(`server listening at port ${port}...`);
});
