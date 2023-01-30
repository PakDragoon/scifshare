const express = require('express')
const router = new express.Router()
const fileController = require("../controllers/file.controller")
const { upload } = require("../helpers/multer")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

//create file
router.post("/api/create", upload.single("image"), async (req, res) => {
  fileController.create(req, res)
})
//get file
router.post("/api/get", async (req, res) => {
  fileController.get(req, res)
})

module.exports = router
