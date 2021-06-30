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
  const imageName = Date.now() + "." + image.originalname.split(".").pop();

  const imageFile = bucketInstance.file(imageName);

  const stream = imageFile.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  stream.on("error", (error) => {
    console.error(error);
    return res.status(500).send(error);
  });

  stream.on("finish", async () => {
    try {
      await imageFile.makePublic();

      req.file.firebase_url = `https://storage.googleapis.com/${firebaseBucket}/${imageName}`;

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).sned(error);
    }
  });

  stream.end(image.buffer);
};


module.exports = {
  uploadImage,
};
