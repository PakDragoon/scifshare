const multer = require("multer")
const crypto = require("crypto")

const storage = multer.diskStorage({
    limits: { fileSize: 10485760 },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
            return cb(new Error('Please upload an image file(.jpg .png . jpeg'))
        }
        cb(undefined, true)
    },
    filename: (req, file, cb) => {
      const generatedId = crypto.randomBytes(3).toString("hex")
      const date = new Date()
      const prefix = `${date.getDay()}${date.getMonth()}${date.getFullYear()}`
      cb(null, (`${prefix}-${generatedId}-${file.originalname}`).replace(/\s+/g, ""))
    },
  })

exports.upload = multer({ storage: storage })