const pool = require('../db/mysql').pool
const controller = {}

controller.create = async (req, res) => {
  const { email, roleId, teamId } = req.body
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`INSERT INTO invites (email, roleId, teamId) VALUES ('${email}', ${roleId}, ${teamId})`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send('invite created')
    });
  });
}

controller.get = async (req, res) => {
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`Select * from invites where teamId = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send(results)
    });
  });
}

controller.pending = async (req, res) => {
  const { email } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`Select * from invites where email = '${email}'`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send(results)
    });
  });
}

controller.delete = async (req, res) => {
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`Delete from invites where id = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send('invite deleted')
    });
  });
}

module.exports = controller
