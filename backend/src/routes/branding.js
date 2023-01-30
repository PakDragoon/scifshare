const express = require('express')
const router = new express.Router()
const { upload } = require("../helpers/multer")
const brandController = require("../controllers/branding.controller")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

//create branding
router.post("/api/create", upload.array("logo", 2), async (req, res) => {
  brandController.create(req, res)
})
//get branding
router.get("/api/get/:id", async (req, res) => {
  brandController.get(req, res)
})
//update branding
router.patch("/api/update/:id", upload.array("logo", 2), async (req, res) => {
  brandController.update(req, res)
})

module.exports = router
