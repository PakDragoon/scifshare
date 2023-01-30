const express = require('express')
const router = new express.Router()
const emailController = require("../controllers/email.controller")

//send email
router.post("/api/send", async (req, res) => {
  emailController.send(req, res)
})
//check ip
router.get("/api/get", async (req, res) => {
  emailController.check(req, res)
})

module.exports = router