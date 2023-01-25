const express = require('express')
const router = new express.Router()
// const auth = require('../middleware/auth')
const brandController = require("../controllers/branding.controller")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

//create branding
router.post("/api/create", async (req, res) => {
  brandController.create(req, res)
})
//update branding
router.patch("/api/update", async (req, res) => {
  brandController.update(req, res)
})

module.exports = router
