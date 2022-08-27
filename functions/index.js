// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const newFunctions = require("firebase-functions");

// Express middleware object, helps routes and manage server
const oExpress = require("express");
// Cross-Origin Resource Sharing object
const oCors = require("cors");


// Instance of express object
const newAlpaca = oExpress();
// const oRouter = tMiddleMan.Router();
newAlpaca.use( oCors( {origin: true}));
// REST API routing and packaging section
// HelloWorl

// alpaca.get("/hello-world", (req, res) => {
//   // res.send('Hello World From Wenhao');
//   return res.status(200).send("Hello World From Wenhao");
// });

// Account Management
newAlpaca.use(require("./Routes/Alpaca/Customers/Accounts.js"));
exports.newAlpaca = newFunctions
    .https
    .onRequest(newAlpaca);

// Assets Management
newAlpaca.use(require("./Routes/Alpaca/Stocks/Assets.js"));
exports.newAlpaca = newFunctions
    .https
    .onRequest(newAlpaca);

// Funding management
newAlpaca.use(require("./Routes/Alpaca/Funding/ACHRelationships.js"));
exports.newAlpaca = newFunctions
    .https
    .onRequest(newAlpaca);

// Trading management
newAlpaca.use(require("./Routes/Alpaca/Trading/Customers.js"));
exports.newAlpaca = newFunctions
    .https
    .onRequest(newAlpaca);

newAlpaca.use(require("./Routes/Alpaca/Trading/Orders.js"));
exports.newAlpaca = newFunctions
    .https
    .onRequest(newAlpaca);
    
