const admin = require("firebase-admin");

const serviceAccount = require("../config/firebase-key.js");

const firebaseBucket = "flow-trading-system.appspot.com"; 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:  firebaseBucket,
});

const uploadImage = (req, res, next) => {
  if (!req.file) return next();

  const image = req.file;

  
}