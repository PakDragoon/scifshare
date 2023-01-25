const pool = require('../db/mysql').pool
const bcrypt = require("bcryptjs")
const controller = {}

controller.create = async (req, res) => {
  const { label, openLimit, expirationDate, recieveNotification, secretInformation, password, documents, statusId, folderId } = req.body
  const passwordHash = await bcrypt.hash(password, 8)
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`
      INSERT INTO secrets (label, openLimit, expirationDate, recieveNotification, secretInformation, password, documents, statusId, folderId)
      VALUES ('${label}', ${openLimit}, '${expirationDate}', ${recieveNotification}, '${secretInformation}', '${passwordHash}', '${documents}', ${statusId}, ${folderId})`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send('secret created')
    });
  });
}

module.exports = controller
