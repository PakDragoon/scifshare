const pool = require('../db/mysql').pool
const controller = {}

controller.create = async (req, res) => {
  const { name, userId } = req.body
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`INSERT INTO teams (userId, name) VALUES (${userId}, '${name}')`, function (error, results, fields) {
      connection.release();
      // if (error) throw error;
      if(error){
        const { errno } = error
        res.status(400).send({errno})
        return
      }
      res.status(201).send('team created')
    });
  });
}

controller.get = async (req, res) => {
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`Select id, name from teams where userId = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(200).send(results[0])
    });
  });
}

controller.members = async (req, res) => {
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`Select * from team_members where teamId = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(200).send(results)
    });
  });
}

controller.update = async (req, res) => {
  const { name } = req.body
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`Update teams set name = '${name}' where id = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(200).send('team updated')
    });
  });
}

controller.delete = async (req, res) => {
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(`Delete from teams where id = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(200).send('team deleted')
    });
  });
}

controller.deleteMember = async (req, res) => {
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(`Delete from team_members where id = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(200).send('team member deleted')
    });
  });
}

controller.createMember = async (req, res) => {
  const { name, email, roleId, teamId, userId } = req.body
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(`Insert Into team_members (name, email, roleId, teamId, userId) values ('${name}', '${email}', ${roleId}, ${teamId}, ${userId})`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send('member created')
    });
  });
}

module.exports = controller
