require("dotenv").config();
const admin = require("firebase-admin");

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// if (!serviceAccountPath) {
//   throw new Error("GOOGLE_APPLICATION_CREDENTIALS 환경변수를 설정하세요.");
// }

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  admin,
  auth: admin.auth(),
};
