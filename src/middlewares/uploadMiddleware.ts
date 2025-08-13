import multer from 'multer';

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/webp',
];

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB max
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

export default upload;
