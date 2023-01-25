const express = require('express')
const router = new express.Router()
// const auth = require('../middleware/auth')
const teamController = require("../controllers/team.controller")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

//create team
router.post("/api/create", async (req, res) => {
    teamController.create(req, res)
})
//get team
router.get("/api/get/:id", async (req, res) => {
    teamController.get(req, res)
})
//get members
router.get("/api/get/members/:id", async (req, res) => {
    teamController.members(req, res)
})
//update team
router.patch("/api/update/:id", async (req, res) => {
    teamController.update(req, res)
})
//delete team
router.delete("/api/delete/:id", async (req, res) => {
    teamController.delete(req, res)
})
//create member
router.post("/api/create/member", async (req, res) => {
    teamController.createMember(req, res)
})

module.exports = router
