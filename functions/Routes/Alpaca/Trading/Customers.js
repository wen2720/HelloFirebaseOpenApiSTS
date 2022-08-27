const Broker = require("../Broker/Broker.js")
const newBroker = new Broker();
// the balance is in the trading information
const uri = newBroker.uri + "/trading/accounts/";

// HTTP GET, customer trading information, 
// application uri: <ApplicaitonUri>/trading/customers/:id
// service uri: <AlpacaSandboxUri>/trading/accounts/:account_id/account
newBroker.router.get("/trading/customers/:id",(request, response,next) => {
    let ID = request.params.id;
    newBroker.requester.get(uri + ID + "/account", {
        auth: newBroker.basicAuth})
        .then((alpacaResponse) => {
            response.send(alpacaResponse.data);
        })
        .catch((error) => {
            next(error);
        });    
    });
    
module.exports = newBroker.router;