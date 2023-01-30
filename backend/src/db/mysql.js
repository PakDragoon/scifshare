const mysql = require('mysql');
require("dotenv").config()

const dbName = process.env.DB_NAME
const dbPassword = process.env.DB_PASSWORD
const dbUser = process.env.DB_USER
const dbHost = process.env.DB_HOST

const pool = mysql.createPool({
  multipleStatements: true,
  connectionLimit : 10000,
  host : dbHost || 'localhost',
  user : dbUser || 'offigrda_scifshare',
  password : dbPassword || 'bXd@at-+2Bz~',
  database : dbName || 'offigrda_scifshare'
});

exports.pool = pool