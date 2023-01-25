const express = require('express')
const router = new express.Router()
// const auth = require('../middleware/auth')
const secretController = require("../controllers/secret.controller")
const { upload } = require("../helpers/multer")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

//create secret
router.post("/api/create", async (req, res) => {
  secretController.create(req, res)
})

module.exports = router
