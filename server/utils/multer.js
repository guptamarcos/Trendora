const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const ExpressError = require("./ExpressError.js");
const { cloudStorage } = require("../cloudConfig.js");

// FOR STORING FILES IN LOCAL SYSTEM 

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "upload");
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(12, function (err, bytes) {
//       if (err) {
//         console.log(err);
//         return cb(err);
//       }
//       const fileName = bytes.toString("hex") + path.extname(file.originalname);
//       cb(null, fileName);
//     });
//   },
// });

const fileFilter = (req, file, cb) => {
 
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ExpressError(400, "Only image files are allowed"), false);
  }

};


const upload = multer({
  storage: cloudStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter
});

module.exports = upload;
