import multer from 'multer';

// Max file size: 100kb
const upload = multer({ limits: { fileSize: 100000 } });

export { upload };