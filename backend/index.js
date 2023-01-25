const express = require("express")
const path = require("path")
const usersRouter = require('./src/routes/users')
const brandRouter = require('./src/routes/branding')
const teamRouter = require('./src/routes/team')
const secretRouter = require('./src/routes/secret')
const invitesRouter = require('./src/routes/invites')
const folderRouter = require('./src/routes/folder')
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })
const app = express()
const port = process.env.PORT || 8000

//Result in JSON format
app.use(express.json())

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
  next()
})

app.use("/user", usersRouter)
app.use("/brand", brandRouter)
app.use("/team", teamRouter)
app.use("/invite", invitesRouter)
app.use("/secret", secretRouter)
app.use("/folder", folderRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
  })
}

//Check if server is running
app.listen(port, () => {
  console.log("Server is up running " + port)
})
