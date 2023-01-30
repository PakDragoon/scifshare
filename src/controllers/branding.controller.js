const pool = require('../db/mysql').pool
const controller = {}

controller.create = async (req, res) => {
  const { userId, bgColor, scColor, logoUrl } = req.body
  const { filename: filename1 } = req.files[0]
  const { filename: filename2 } = req.files[1]
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`INSERT INTO branding (userId, bgColor, scColor, logo, logoUrl, ogImage) VALUES (${userId}, '${bgColor}', '${scColor}', '${filename1}', '${logoUrl}', '${filename2}')`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(201).send('branding created')
    });
  });
}

controller.get = async (req, res) => {
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`select * from branding where userId = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(201).send(results[0])
    });
  });
}

controller.update = async (req, res) => {
  const { bgColor, scColor, logoUrl } = req.body
  const { filename: filename1 } = req.files[0]
  const { filename: filename2 } = req.files[1]
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`Update branding set bgColor = '${bgColor}', scColor = '${scColor}', logo = '${filename1}', logoUrl = '${logoUrl}', ogImage = '${filename2}' where id = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(200).send('branding updated')
    });
  });
}

module.exports = controller
