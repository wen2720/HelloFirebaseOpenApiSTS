// Alpaca module
const newAxios = require("axios");
const newAlpacaUsernamePasswordWen = require("../BasicAuth/usernamePassword.json");

// Middle-ware
const newExpress = require("express");

// Alpaca End point
const newAlpacaSandBoxUri = "https://broker-api.sandbox.alpaca.markets/v1";

class Broker {
    requester;
    basicAuth;
    middleware;
    router;
    uri;
    constructor() {
        // Axios module
        this.requester = newAxios;
        // Developer API key
        this.basicAuth = newAlpacaUsernamePasswordWen;
        // Middle-ware
        this.express = newExpress;
        // Middle-ware express mini app
        this.router = newExpress.Router();
        // Alpaca End point
        this.uri = newAlpacaSandBoxUri;    
    }
}

module.exports = Broker;