const Broker = require("../Broker/Broker.js");
const newBroker = new Broker();
const uri = newBroker.uri + "/trading/accounts";
// HTTP POST, create an order with account identifier and the request body
// application uri: <ApplicationUri>/trading/customers/:id/orders
// service uri: <ServiceUri>/v1/trading/accounts/:account_id/orders
newBroker.router.post("/trading/customers/:id/orders", (request,response,next) => {
    newBroker.requester.post(uri + "/" + request.params.id + "/orders", {
        "symbol": request.body.symbol,
        "qty": request.body.qty,
        "side": request.body.side,
        "type": request.body.type,
        "time_in_force": request.body.time_in_force},{ 
            auth: newBroker.basicAuth
        }).then((alpacaResponse) => {
        response.status(200).send(alpacaResponse.data);
    }).catch((alpacaError) =>{
        next(alpacaError);
    }); 
});

// HTTP GET, get all orders of a customer
// application uri: <ApplicationUri>/trading/customers/:id/orders
// service uri: <ServiceUri>/v1/trading/accounts/:account_id/orders
newBroker.router.get("/trading/customers/:id/orders", (request,response,next) => {
    newBroker.requester.get(uri + "/" + request.params.id + "/orders", { 
            auth: newBroker.basicAuth
        }).then((alpacaResponse) => {
        response.status(200).send(alpacaResponse.data);
    }).catch((alpacaError) =>{
        next(alpacaError);
    }); 
});

module.exports = newBroker.router;