const pool = require("../db/mysql").pool
const controller = {}

controller.create = async (req, res) => {
  const { label, color, icon, userId, teamId } = req.body
  pool.getConnection(function (err, connection) {
    if (err) throw err
    connection.query(`INSERT INTO folders (label, color, icon, userId, teamId) VALUES ('${label}','${color}', '${icon}', ${userId}, ${teamId})`, function (error, results, fields) {
      connection.release()
      if (error) throw error
      res.status(201).send("folder created")
    })
  })
}

controller.get = async (req, res) => {
  const { id } = req.params
  pool.getConnection(function (err, connection) {
    if (err) throw err
    connection.query(`Select * from folders where teamId = ${id}`, function (error, results, fields) {
      connection.release()
      if (error) throw error
      res.status(200).send(results)
    })
  })
}

module.exports = controller
