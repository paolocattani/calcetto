const functions = require("firebase-functions");
import { webApi } from '../server/server';

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest(webApi);
