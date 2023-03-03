const admin = require("firebase-admin");
const env = require("dotenv").config()?.parsed;

const serviceAccount = {
  type: "service_account",
  project_id: env.FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: env.FIREBASE_ADMIN_PRIVATE_KEY,
  client_email: env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: env.FIREBASE_ADMIN_AUTH_URI,
  token_uri: env.FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: env.FIREBASE_ADMIN_auth_provider_x509_cert_url,
  client_x509_cert_url: env.FIREBASE_ADMIN_client_x509_cert_url,
};

if (admin.apps.length === 0) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

module.exports = admin;
