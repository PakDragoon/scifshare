const mysql = require('mysql');
require("dotenv").config()

const pool  = mysql.createPool({
  connectionLimit : 10000,
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'scifshare'
});

exports.pool = pool