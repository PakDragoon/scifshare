const express = require('express')
const router = new express.Router()
// const auth = require('../middleware/auth')
const folderController = require("../controllers/folder.controller")
const { upload } = require("../helpers/multer")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

//create folder
router.post("/api/create", async (req, res) => {
  folderController.create(req, res)
})
//get folder
router.get("/api/get/:id", async (req, res) => {
  folderController.get(req, res)
})

module.exports = router
