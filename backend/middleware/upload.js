var storage = new GridFsStorage({
    url: dbConfig.url + dbConfig.database,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];
  
      if (match.indexOf(file.mimetype) === -1) {
        const filename = `${Date.now()}-${file.originalname}`;
        return filename;
      }
  
      return {
        bucketName: dbConfig.imgBucket,
        filename: `${Date.now()}-${file.originalname}`
      };
    }
  });
  
  var uploadFiles = multer({ storage: storage }).single("file");
  var uploadFilesMiddleware = util.promisify(uploadFiles);
  module.exports = uploadFilesMiddleware;