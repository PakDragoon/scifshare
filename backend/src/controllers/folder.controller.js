const pool = require('../db/mysql').pool
const controller = {}

controller.create = async (req, res) => {
  const { label, color, icon, userId } = req.body
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`INSERT INTO folders (label, color, icon, userId) VALUES ('${label}','${color}', '${icon}', ${userId})`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send('folder created')
    });
  });
}

module.exports = controller
