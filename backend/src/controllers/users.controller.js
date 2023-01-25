const bcrypt = require("bcryptjs")
const pool = require('../db/mysql').pool
const generateAuthToken = require('../middleware/jwt').generateAuthToken
const controller = {}

controller.create = async (req, res) => {
    const { name, email, password } = req.body
    const passwordHash = await bcrypt.hash(password, 8)
    pool.getConnection(function(err, connection) {
      if (err) throw err; 
      connection.query(`INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${passwordHash}')`, function (error, results, fields) {
        connection.release();
        if (error) throw error;
        res.send('user created')
      });
    });
}

controller.get = async (req, res) => {
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`Select name, email from users where id = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      if(results.length !== 1){
        res.send("No user found")
        return
      } else {
        res.send(results[0])
      }
    });
  });
}

controller.login = async (req, res) => {
  const { email, password } = req.body
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`Select id, name, email, password from users where email = '${email}'`, async function (error, results, fields) {
      connection.release();
      if (error) throw error;
      if (results.length !== 1) {
        res.send('user does not exist')
        return
      }
      const isMatch = await bcrypt.compare(password, results[0].password)
      if (isMatch) {
        const token = generateAuthToken(results[0].id, results[0].name, results[0].email)
        res.send({results, token})
        return
      } else {
        res.send('Incorrect email or password')
      }
    });
  });
}

controller.update = async (req, res) => {
    const { name, email, password, alternateEmail, dateFormat, webhookUrl } = req.body
    const passwordHash = await bcrypt.hash(password, 8)
    const { id } = req.params
    pool.getConnection(function(err, connection) {
      if (err) throw err; 
      connection.query(`Update users set name = '${name}', email = '${email}', password = '${passwordHash}', alternateEmail = '${alternateEmail}', dateFormat = '${dateFormat}', webhook = '${webhookUrl}' where id = ${id}`, function (error, results, fields) {
        connection.release();
        if (error) throw error;
        res.send('user updated')
      });
    });
}

controller.delete = async (req, res) => {
    const { id } = req.params
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query(`Delete from faq where id = ${id}`, function (error, results, fields) {
        connection.release();
        if (error) throw error;
        res.send('faq edited')
      });
    });
}

module.exports = controller
