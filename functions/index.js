const functions = require('firebase-functions');
var admin = require('firebase-admin');
var adminManager = admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.checkToken = functions.https.onRequest(function (request, response) {
    userGeneratedToken = request.body["token"]
    adminManager.auth().verifyIdToken(userGeneratedToken)
        .then(function (decodedToken) {
            responseMsg = {
                "Result": "OK"
            }
            response.setHeader('Content-Type', 'application/json');
            response.status(200).send(JSON.stringify(responseMsg))
        })
        .catch(function (error) {
            console.log("error accured: " + JSON.stringify(error))
            errorMsg = {
                "Result": "Fail"
            }
            response.setHeader('Content-Type', 'application/json');
            response.status(500).send(JSON.stringify(errorMsg))
        })
})