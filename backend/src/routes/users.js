const express = require('express')
const router = new express.Router()
// const auth = require('../middleware/auth')
const usersController = require("../controllers/users.controller")
const { upload } = require("../helpers/multer")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

//create user
router.post("/api/create", async (req, res) => {
  usersController.create(req, res)
})
//get user
router.get("/api/get/:id", async (req, res) => {
  usersController.get(req, res)
})
//login user
router.post("/api/login", async (req, res) => {
  usersController.login(req, res)
})
//update user
router.patch("/api/update/:id", async (req, res) => {
  usersController.update(req, res)
})

module.exports = router
