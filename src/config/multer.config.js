const multer = require('multer');
const config = require("./upload.config");

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, config.uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.pdf') {
//       return cb(new Error('Only images or pdf files can be uploaded!'), false);
//     }
//     cb(null, true)
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// });

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
});

module.exports = upload;