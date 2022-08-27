// Firebase<Firebase-Admin>
// const oFirebaseAdmin = require("firebase-admin");
// const vServiceAcount = require("../../../HelloFirebase/hellofirebase-b144c-firebase-adminsdk-md1qg-975d5d9f8b.json");
// oFirebaseAdmin.initializeApp({
//   credential: oFirebaseAdmin.credential.cert(vServiceAcount)
// });
// const oFirestore = oFirebaseAdmin.firestore();

const Broker = require("../Broker/Broker.js")
const newBroker = new Broker();
// uri of Accounts 
const uri = newBroker.uri + "/accounts";

// HTTPS POST
// application uri: <ApplicationUri>/customer 
// service uri: <AlpacaSanboxUri>/v1/accounts
newBroker.router.post("/customers", (request,response,next) => {
    newBroker.requester.post(uri,  {    
        "enabled_assets": request.body.enabled_assets,
        "contact": request.body.contact,
        "identity": request.body.identity,
        "disclosures": request.body.disclosures,
        "agreements": request.body.agreements,
        "documents": request.body.documents,
        "trusted_contact": request.body.trusted_contact},{ 
            auth: newBroker.basicAuth
        }).then((alpacaResPonse) => {
            response.status(200).send();
        }).catch((error) => {
            //console.error(error);
            next(error);
        })
    });

// Function:
// Firebase<Firestore> fExists ACCCOUNTID in vDoc in vCollection 
// The predication checks whether an unique ID exists in a collection

// HTTPS GET, all customers idetifier under a broker
// application uri: <AplicationEntry>/customers
// service uri:  <AlpacaSandboxEntry>/v1/accounts
newBroker.router.get("/customers",(request,response,next) => {
    newBroker.requester.get(uri, {
        auth: newBroker.basicAuth
        }).then((alacaResponse) => {
            response.send(alacaResponse.data);
            // // The function below writes to the database, if the entry exists then the data.
            // oFirestore.collection('Customers').doc('Newest').create({
            //     CustomerId: alacaResponse.data
            // })
        }).catch((error) => {
            next(error);
        });
    });

// HTTPS GET, customer information
// application uri: <ApplicationEntry>/cutomers/:id
// service uri: <AlpacaSanboxApi>/accounts/:account_id
newBroker.router.get('/customers/:id',(request, response,next) => {
    let ID = request.params.id;
    newBroker.requester.get(uri+"/"+ID, {
            auth: newBroker.basicAuth})
        .then((alpacaResponse) => {
        // console.log(alpacaResponse.data);
            response.send(alpacaResponse.data);
        })
        .catch((error) => {
            next(error);
        });    
    });

// HTTPS PATCH
// HTTPS DELETE

module.exports = newBroker.router;