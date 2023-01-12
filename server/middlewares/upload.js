import multer from "multer";
//const upload = multer({dest:'./uploads'})

// Configuration for multer
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './storages/uploads');
     },
    filename: function (req, file, cb) {
      const fileName = file.originalname.split(' ').join('-')
        cb(null ,Date.now() +'-'+ fileName);
    }
});
const extensionList = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp'
]
// Multer Filter
const multerFilter = (req, file, cb) => {
    if (extensionList.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Not an image!"), false);
    }
  };
const upload = multer({storage: storage, fileFilter: multerFilter});

export default upload;