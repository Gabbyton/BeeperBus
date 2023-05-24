const axios = require("axios").default;
const dotenv = require("dotenv");

dotenv.config();

const requestHeaders = {
    'x-rapidapi-key': process.env.API_KEY,
    'x-rapidapi-host': 'transloc-api-1-2.p.rapidapi.com'
};

const agencyId = process.env.AGENCIES;

module.exports.getVehicles = async function (routes) {
    var options = {
        method: 'GET',
        url: 'https://transloc-api-1-2.p.rapidapi.com/vehicles.json',
        params: { agencies: agencyId, routes: routes, callback: 'call' },
        headers: requestHeaders,
    };
    const response = await axios.request(options);
    if (response.statusText == 'OK')
        return response.data['data'];
    return [];
}

module.exports.getRoutes = async function () {
    var axios = require("axios").default;

    var options = {
        method: 'GET',
        url: 'https://transloc-api-1-2.p.rapidapi.com/routes.json',
        params: { agencies: agencyId, callback: 'call' },
        headers: requestHeaders,
    };

    const response = await axios.request(options);
    if (response.statusText == 'OK')
        return response.data['data'][agencyId];   
    return [];
}

module.exports.getStops = async function () {
    var options = {
        method: 'GET',
        url: 'https://transloc-api-1-2.p.rapidapi.com/stops.json',
        params: { agencies: agencyId, callback: 'call' },
        headers: requestHeaders,
    };

    const response = await axios.request(options);
    if (response.statusText == 'OK')
        return response.data['data'];
    return [];
}

module.exports.getSegments = async function (route) {
    var axios = require("axios").default;

    var options = {
        method: 'GET',
        url: 'https://transloc-api-1-2.p.rapidapi.com/segments.json',
        params: {
            agencies: agencyId, routes: route, callback: 'call'
        },
        headers: requestHeaders,
    };

    const response = await axios.request(options);
    if (response.statusText == 'OK')
        return response.data['data'];
    return [];
}

module.exports.getArrivalData = async function () {
    var options = {
        method: 'GET',
        url: 'https://feeds.transloc.com/3/vehicle_statuses',
        params: {
            agencies: agencyId, 'include_arrivals': true,
        }
    }
    const response = await axios.request(options);
    if (response.statusText == 'OK')
        return response.data['vehicles'];
    return [];
}