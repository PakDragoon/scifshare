const express = require('express')
const router = new express.Router()
// const auth = require('../middleware/auth')
const inviteController = require("../controllers/invites.controller")

//create invite
router.post("/api/create", async (req, res) => {
  inviteController.create(req, res)
})
//resend invite
router.post("/api/resend", async (req, res) => {
  inviteController.resend(req, res)
})
//get invites
router.get("/api/get/:id", async (req, res) => {
  inviteController.get(req, res)
})
//get pending invites
router.get("/api/pending/:email", async (req, res) => {
  inviteController.pending(req, res)
})
//delete invite
router.delete("/api/delete/:id", async (req, res) => {
  inviteController.delete(req, res)
})

module.exports = router