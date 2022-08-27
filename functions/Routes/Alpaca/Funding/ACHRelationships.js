const Broker = require("../Broker/Broker.js");
const newBroker = new Broker();
const uri = newBroker.uri + "/accounts"
// HTTPS POST
// application uri : <ApplicationEntry>/customers/:id/ach
// service uri: <ServiceEntri>/v1/accounts/:account_id/ach_relationships
// predication, exists ACH -> true -> 409
//                          | false -> 200 
newBroker.router.post('/customers/:id/ach',(request,response,next) => {
    let ID = request.params.id;
    newBroker.requester.post(uri + '/' + ID + "/ach_relationships", {
        "account_owner_name" : request.body.account_owner_name,
        "bank_account_type" : request.body.bank_account_type,
        "bank_account_number" : request.body.bank_account_number,
        "bank_routing_number" : request.body.bank_routing_number,
        "nickname": request.body.nickname}, {
        auth : newBroker.basicAuth
    }).then((alpacaResponse) => {
        response.status(200).send("The ACH relationship is created.");
    }).catch((error) => {
        next(error);
    });
});

// HTTPS GET, customer ACH relationship
// application uri : <ApplicationEntry>/customers/:id/ach
// service uri: <ServiceEntri>/v1/accounts/:account_id/ach_relationships/:relationship_id
newBroker.router.get('/customers/:achId/ach',(request,response,next) => {
    newBroker.requester.get(uri + '/' + request.params.achId + "/ach_relationships", {
            auth : newBroker.basicAuth
        }).then((alpacaResponse) => {
            response.status(200).send(alpacaResponse.data);
        }).catch((error) => {
            next(error);
        });
    });

// HTTPS DELETE, delete customer ACH relation ship
// application uri : <ApplicationEntry>/customers/:customerId/ach/:achId
// service uri: <ServiceEntri>/v1/accounts/:account_id/ach_relationships/:relationship_id
newBroker.router.delete('/customers/:customerId/ach/:achId',(request,response,next) => {
    newBroker.requester.delete(uri + '/' + request.params.customerId + "/ach_relationships" + request.params.achId, {
            auth : newBroker.basicAuth
        }).then((alpacaResponse) => {
            response.status(200).send(alpacaResponse.data);
        }).catch((error) => {
            next(error);
        });
    });

// HTTPS PATCH
// HTTPS DELETE

module.exports = newBroker.router;