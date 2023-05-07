const admin = require("firebase-admin");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const downloadFirebaseJsonKey = async () => {
  const params = {
    Bucket: "firebase-json-key",
    Key: "team-project-171e5-firebase-adminsdk-544nx-a0738ab9f8.json",
  };

  const data = await s3.getObject(params).promise();
  return JSON.parse(data.Body.toString());
};

const initializeFirebaseApp = async () => {
  try {
    const serviceAccount = await downloadFirebaseJsonKey();
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    return admin.auth();
  } catch (error) {
    process.exit(1);
  }
};

let auth;

const initPromise = initializeFirebaseApp().then((authInstance) => {
  auth = authInstance;
});

module.exports = {
  admin,
  getAuth: () => auth,
  initPromise,
};
