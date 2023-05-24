const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
// const appSocket = require('./modules/app_socket')(http);
const dotenv = require('dotenv');
const appTransloc = require('./modules/app_transloc');

dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
  res.json('hello from the server!');
})

app.get('/get-segment', async (req, res) => {
  const route = req.query['route'];
  return res.json(await appTransloc.getSegments(route));
});

app.get('/get-arrivals', async (req, res) => {
  return res.json(await appTransloc.getArrivalData());
});

app.get('/get-stops', async (req, res) => {
  return res.json(await appTransloc.getStops());
});

app.get('/get-routes', async (req, res) => {
  return res.json(await appTransloc.getRoutes());
});

app.get('/get-vehicles', async (req, res) => {
  const routes = req.params['routes'];
  return res.json(await appTransloc.getVehicles(routes));
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});