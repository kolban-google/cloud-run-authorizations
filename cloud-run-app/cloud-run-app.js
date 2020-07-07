/**
 * Cloud Run app that executes in a container in Cloud Run that services
 * REST operations that are checked for authorization.
 * 
 * We listen on GET /operation
 * 
 * The caller is expected to provide an authnentication token in the header:
 * 
 * authorization: Bearer [JWT Token]
 * 
 * We check that it contains a claim called "forum-role".  If it does and the value is "moderator"
 * then we allow the operation.
 */

const express = require('express');
const cors = require('cors')
const admin = require('firebase-admin');

admin.initializeApp(); // Initialize the Firebase admin environment

const app = express();
app.use(cors());


async function getToken(req) {
  if (!req.headers['authorization'] || !req.headers['authorization'].startsWith('Bearer ')) {
    throw "No or bad authorization header"
  }
  const jwtValue = req.headers['authorization'].substring(7);
  const decodedToken = await admin.auth().verifyIdToken(jwtValue);
  console.log(`decodedToken: ${JSON.stringify(decodedToken)}`);
  return decodedToken;
}

app.get('/', (req, res) => {
  console.log('Received a request.');

  const target = process.env.TARGET || 'World';
  res.send(`Hello ${target}!`);
});

app.get('/operation', async (req, res) => {
  try {
    const token = await getToken(req);
    console.log(`token: ${JSON.stringify(token)}`);
    const result = {
      "email": token.email,
      "forum-role": token["forum-role"]
    };
    if (token["forum-role"] == "moderator") {
      result.message = "Operation was allowed";
    } else {
      result.message = "Operation was not authorized";
    }
    res.send(JSON.stringify(result));
  }
  catch(ex) {
    console.log(ex);
    res.send(`Failed: ${ex}`);
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});