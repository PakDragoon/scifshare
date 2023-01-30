const express = require("express")
const usersRouter = require('./src/routes/users')
const brandRouter = require('./src/routes/branding')
const teamRouter = require('./src/routes/team')
const secretRouter = require('./src/routes/secret')
const invitesRouter = require('./src/routes/invites')
const folderRouter = require('./src/routes/folder')
const fileRouter = require('./src/routes/file')
const emailRouter = require('./src/routes/email')
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })
const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.set('trust proxy', true)

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
  next()
})

app.use(express.static(__dirname + '/public', { maxAge: '365d' }));

app.use("/user", usersRouter)
app.use("/brand", brandRouter)
app.use("/team", teamRouter)
app.use("/invite", invitesRouter)
app.use("/secret", secretRouter)
app.use("/folder", folderRouter)
app.use("/file", fileRouter)
app.use("/email", emailRouter)

app.listen(port, () => {
  console.log("Server is up running " + port)
})
