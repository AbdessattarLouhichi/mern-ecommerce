import multer from "multer";
//const upload = multer({dest:'./uploads'})

// Configuration for multer
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './storages/uploads');
     },
    filename: function (req, file, cb) {
        cb(null ,Date.now()+'-'+file.originalname);
    }
});

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif '|| file.mimetype == 'image/png') {
      cb(null, true);
    } else {
      cb(new Error("Not an image!"), false);
    }
  };
const upload = multer({storage: storage, fileFilter: multerFilter});

module.exports = upload;