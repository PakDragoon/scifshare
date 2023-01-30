const express = require('express')
const router = new express.Router()
// const auth = require('../middleware/auth')
const secretController = require("../controllers/secret.controller")
const { upload } = require("../helpers/multer")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

//create secret
router.post("/api/create", upload.single("documents"), async (req, res) => {
  secretController.create(req, res)
})
//get secret
router.get("/api/get/:url", async (req, res) => {
  secretController.get(req, res)
})
//get secret
router.get("/api/get/:id", async (req, res) => {
  secretController.getById(req, res)
})
//get all secret
router.get("/api/getAll/:id", async (req, res) => {
  secretController.getAll(req, res)
})
//update secret
router.patch("/api/update/:url", async (req, res) => {
  secretController.update(req, res)
})
//delete secret
router.delete("/api/delete/:id", async (req, res) => {
  secretController.delete(req, res)
})

module.exports = router
