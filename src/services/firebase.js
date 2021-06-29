var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-key.js");

const firebaseBucket = "flow-trading-system.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: firebaseBucket,
});

const uploadImage = (req, res, next) => {
  if (!req.file) return next();

  const bucketInstance = admin.storage().bucket();

  const image = req.file;
  const imageName = Date.now() + "." + image.originalName.split(".").pop();

  const imageFile = bucketInstance.file(imageName);

  const stream = imageFile.createWriteStream
};

module.exports = [uploadImage];
