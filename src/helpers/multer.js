const multer = require("multer")
// const path = require('path')
const crypto = require("crypto")

const storage = multer.diskStorage({
  limits: { fileSize: 10485760 },
  fileFilter(req, file, cb) {
      if(!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
        return cb(new Error('Please upload an image file(.jpg .png . jpeg'))
      }
      cb(undefined, true)
  },
  destination: 'public/uploads',
  // destination: (req, file, cb) => cb(null, path.join(__dirname + '../../public/uploads')),
  filename: (req, file, cb) => {
    const generatedId = crypto.randomBytes(3).toString("hex")
    const date = new Date()
    const prefix = `${date.getDay()}${date.getMonth()}${date.getFullYear()}`
    cb(null, (`${prefix}-${generatedId}-${file.originalname}`).replace(/\s+/g, ""))
  },
})

exports.upload = multer({ storage: storage })