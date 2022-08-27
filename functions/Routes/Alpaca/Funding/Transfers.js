const Broker = require("../Broker/Broker.js");
const newBroker = new Broker();
const uri = newBroker.uri + "/accounts";
// HTTP POST, funding with customer identifier and transfer request body
// application uri : <ApplicationEntry>/customers/:id/transfers
// alpaca uri : <SandBoxUri>/v1/accounts/:account_id/transfers
// 422, Unprocessable Entity, server understands the request but not able to procceed due to the previous uncleared transfer

newBroker.router.post("/customers/:id/transfers",(request,response,next) => {
    newBroker.requester.post(uri + '/' + request.params.id + "/transfers", {
            "transfer_type": request.body.transfer_type,
            "relationship_id": request.body.relationship_id,
            "amount": request.body.amount,
            "direction": request.body.direction},{
            auth: newBroker.basicAuth})
        .then((alpacaResponse) => {
            response.status(200).send("The funcding is queued, at that pont, we should send a message to the customer.");
        }).catch((alpacaError) => {
            next(alpacaError);  //axios error message, <ERROR>.response.status
        })
    });


// HTTP GET, funding
// application uri : <ApplicationEntry>/customers/:id/transfers
// alpaca uri : <SandBoxUri>/v1/accounts/:account_id/transfers
newBroker.router.get("/customers/:id/transfers",(request,response,next) => {
    newBroker.requester.get(uri + '/' + request.params.id + "/transfers", {
        auth: newBroker.basicAuth})
        .then((alpacaResponse) => {
            response.status(200).send(alpacaResponse.data);
        }).catch((alpacaError) => {
            next(alpacaError);
        })
    });

module.exports = newBroker.router;


// HTTP DELETE, cancel transfer before cleared