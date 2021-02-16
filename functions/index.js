const functions = require("firebase-functions");
const server = require("./server/server");
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.webapi = functions
    .region("europe-west2") // London
    .https.onRequest(server.webApi);
