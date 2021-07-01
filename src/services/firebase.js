var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-key.js");

const firebaseBucket = "flow-trading-system.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: firebaseBucket,
});

let logoUrl;
let bannerUrl;

const uploadImages = async (req, res, next) => {
  if (!req.files.logo || !req.files.banner)
    return res.status(404).send({ error: "Imagens não enviadas" });

  await Promise.all(
    req.files.logo.map((imageOnFile) => {
      const bucketInstance = admin.storage().bucket();

      const image = imageOnFile;

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
        } catch (error) {
          console.log(error);
          return res.status(500).sned(error);
        }
      });

      stream.end(image.buffer);
      logoUrl = `https://storage.googleapis.com/${firebaseBucket}/${imageName}`;
    }),
    req.files.banner.map((imageOnFile) => {
      const bucketInstance = admin.storage().bucket();

      const image = imageOnFile;

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
        } catch (error) {
          console.log(error);
          return res.status(500).sned(error);
        }
      });

      stream.end(image.buffer);
      bannerUrl = `https://storage.googleapis.com/${firebaseBucket}/${imageName}`;
    })
  );

  if (!logoUrl || !bannerUrl)
    return res
      .status(500)
      .send({ error: "Falha ao tentar fazer upload de uma das imagens" });

  req.body.logo_firebase_url = logoUrl;
  req.body.banner_firebase_url = bannerUrl;
  next();
};

module.exports = {
  uploadImages,
};
