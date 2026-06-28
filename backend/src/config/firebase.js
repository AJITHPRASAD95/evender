const admin = require('firebase-admin');
function getFirebase() {
  if (admin.apps.length) return admin;
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) return null;
  admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)) });
  return admin;
}
async function notify(token, notification, data = {}) {
  const firebase = getFirebase();
  if (!firebase || !token) return false;
  await firebase.messaging().send({ token, notification, data });
  return true;
}
module.exports = { getFirebase, notify };
