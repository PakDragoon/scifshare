const pool = require('../db/mysql').pool
const controller = {}

controller.create = async (req, res) => {
  const { userId, bgColor, scColor, logo, logoUrl, ogImage } = req.body
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`INSERT INTO branding (userId, bgColor, scColor, logo, logoUrl, ogImage) VALUES (${userId}, '${bgColor}', '${scColor}', '${logo}', '${logoUrl}', '${ogImage}')`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send('branding created')
    });
  });
}

controller.update = async (req, res) => {
  const { userId, bgColor, scColor, logo, logoUrl, ogImage } = req.body
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`Update users set bgColor = '${bgColor}', scColor = '${scColor}', logo = '${logo}', logoUrl = '${logoUrl}', ogImage = '${ogImage}' where userId = ${userId}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send('branding updated')
    });
  });
}

module.exports = controller
