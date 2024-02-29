const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const { postFile } = require('../controllers/upload.controller');

// multerの設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), './public/images'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// * /api/upload
router.post('/', upload.single("file"), postFile);

module.exports = router;