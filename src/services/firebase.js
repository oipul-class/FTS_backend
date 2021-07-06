var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-key.js");

const firebaseBucket = "flow-trading-system.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: firebaseBucket,
});

let logoUrl;
let bannerUrl;

const uploadWebsiteImages = async (req, res, next) => {
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

const uploadWebsiteImagesWithSkip = async (req, res, next) => {
  try {
    if (req.files) {
      if (req.files.logo) {
        await Promise.all(
          req.files.logo.map((imageOnFile) => {
            const bucketInstance = admin.storage().bucket();

            const image = imageOnFile;

            const imageName =
              Date.now() + "." + image.originalname.split(".").pop();

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
          })
        );
      }

      if (req.files.banner) {
        await Promise.all(
          req.files.banner.map((imageOnFile) => {
            const bucketInstance = admin.storage().bucket();

            const image = imageOnFile;

            const imageName =
              Date.now() + "." + image.originalname.split(".").pop();

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
      }
    }

    req.body.logo_firebase_url = logoUrl;
    req.body.banner_firebase_url = bannerUrl;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const uploadProductImage = async (req, res, next) => {
  try {
    if (!req.file) return next();
    const bucketInstance = admin.storage().bucket();

    const image = req.file;

    const imageName = Date.now() + "." + image.originalname.split(".").pop();

    const imageFile = bucketInstance.file(imageName);

    const stream = imageFile.createWriteStream({
      //criandpo um stream
      metadata: {
        contentType: image.mimetype,
      },
    });

    stream.on("error", (error) => {
      console.error(error);
    });

    stream.on("finish", () => {
      imageFile.makePublic();

      req.file.imageName = imageName;

      req.body.product_url = `https://storage.googleapis.com/${firebaseBucket}/${imageName}`;
      next();
    });

    stream.end(image.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = {
  uploadWebsiteImages,
  uploadWebsiteImagesWithSkip,
  uploadProductImage,
};
