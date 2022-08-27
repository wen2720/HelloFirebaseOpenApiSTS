// Alpaca module
const Broker = require("../Broker/Broker.js");
const newBroker = new Broker();

// Assets
const uri = newBroker.uri + "/assets";
//GET <URI>/assets
newBroker.router.get("/assets",(resquestParameterIsEmpty, response,next) => {
    newBroker.requester.get(uri, {auth: newBroker.basicAuth})
        .then((alpacaResponse) => {
            response.send(alpacaResponse.data);
        })
        .catch((error) => {
            next(error);
        });    
    })
// GET <URI>/assets/ <ASSET ID>
newBroker.router.get('/assets/:id',(request, response,next) => {
    let ID = request.params.id;
    newBroker.requester.get(uri+"/"+ID, {
            auth: newBroker.basicAuth})
        .then((alpacaResponse) => {
        // console.log(alpacaResponse.data);
            response.status(200).send(alpacaResponse.data);
        })
        .catch((error) => {
            next(error);
        });    
    });

// GET <URI>/assets/<SYMBOL>
newBroker.router.get("/assets/:symbol", (request, response,next) => {
    let SYMBOL = request.params.symbol;
    newBroker.requester.get(uri+"/"+SYMBOL,{
        auth: newBroker.basicAuth})
        .then((alpacResponse) => {
            response.status(200).send(alpacResponse.data);
        })
        .catch((error) => {
            next(error);
        });
    });

module.exports = newBroker.router;