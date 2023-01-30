const crypto = require('crypto');
const pool = require('../db/mysql').pool
const bcrypt = require("bcryptjs")
const { encrypt, decrypt } = require('../middleware/encryption')
const SibApiV3Sdk = require("sib-api-v3-sdk")
require("dotenv").config()
const controller = {}

controller.create = async (req, res) => {
  const { label, openLimit, expirationDate, recieveNotification, secretInformation, password, statusId, folderId, userId } = req.body
  const { filename } = req.file
  const passwordHash = await bcrypt.hash(password, 8)
  const encKey = crypto.randomBytes(16).toString('hex')
  const ivKey = crypto.randomBytes(8).toString('hex')
  const url = crypto.randomBytes(8).toString('hex')
  const encrypted_key = await encrypt(secretInformation, encKey, ivKey);

  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`
      INSERT INTO secrets (label, openLimit, expirationDate, recieveNotification, secretInformation, password, documents, statusId, folderId, encKey, ivKey, url, userId)
      VALUES ('${label}', ${openLimit}, '${expirationDate}', ${recieveNotification}, '${encrypted_key}', '${passwordHash}', '${filename}', ${statusId}, ${folderId}, '${encKey}', '${ivKey}', '${url}', ${userId})`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(201).send('secret created')
    });
  });
}

controller.getAll = async (req, res) => {
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(`select * from secrets where folderId = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(200).send(results)
    });
  });
}

controller.get = async (req, res) => {
  const { url } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`select label, openLimit, expirationDate, recieveNotification, statusId, folderId, url from secrets where url = '${url}'`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(200).send(results[0])
    });
  });
}

controller.getById = async (req, res) => {
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`
      select s.label, s.openLimit as openLimit, s.expirationDate as expirationDate, s.recieveNotification as recieveNotification, 
      s.secretInformation as secretInformation, s.documents as documents, s.statusId as statusId, s.folderId as folderId, s.url as url, 
      f.label as folderLabel, s.encKey as encKey, s.ivKey as ivKey from secrets as s
      join folders as f on s.folderId = f.id
      where s.id = ${id}`, async function (error, results, fields) {
      const { secretInformation, encKey, ivKey } = results[0]
      const information = await decrypt(secretInformation, encKey, ivKey);
      results[0].information = information
      connection.release();
      if (error) throw error;
      res.status(200).send(results[0])
    });
  });
}

controller.delete = async (req, res) => {
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`Delete from secrets where id = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(200).send("secret deleted")
    });
  });
}

controller.update = async (req, res) => {
  const { id } = req.params
  const { label, openLimit, expirationDate, recieveNotification, secretInformation, password } = req.body
  const { filename } = req.file
  const passwordHash = await bcrypt.hash(password, 8)
  const encKey = crypto.randomBytes(16).toString('hex')
  const ivKey = crypto.randomBytes(8).toString('hex')
  const encrypted_key = await encrypt(secretInformation, encKey, ivKey);
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(`Update secrets set label = '${label}', openLimit = ${openLimit}, expirationDate = '${expirationDate}', recieveNotification = ${recieveNotification}, secretInformation = '${encrypted_key}', password = '${passwordHash}', documents = '${filename}', encKey = '${encKey}', ivKey = '${ivKey}' where id = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(200).send("secret updated")
    });
  });
}

controller.openSecret = async (req, res) => {
  const { url } = req.params
  const { password } = req.body
  const ip = req.ip
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(`select id, label, secretInformation, encKey, ivKey, openLimit, password, userId from secrets where url = '${url}'`, async function (error, results, fields) {
      if (error) throw error;
      if(results.length === 0){
        res.status(404).send("invalid url")
        return
      }
      const { secretInformation, encKey, ivKey, id, label, userId } = results[0]
      const information = decrypt(secretInformation, encKey, ivKey);
      const isMatch = await bcrypt.compare(password, results[0].password)
      if(results[0].openLimit > 0){
        if(isMatch){
          connection.query(`Update secrets set openLimit = ${results[0].openLimit - 1} where url = '${url}'`, function (error, results, fields) {
            if (error) throw error;
            connection.query(`insert into secret_open (secretId, ipAddress) values (${id}, '${ip}')`, function (error, results, fields) {
              if (error) throw error;
              connection.query(`select email from users where id = ${userId}`, function (error, results, fields) {
                connection.release();
                if (error) throw error;
                SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_KEY;
                new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
                {
                  'subject': `Your secret was accessed`,
                  'sender' : {'email':'pagan1581998@gmail.com', 'name':'Scifshare'},
                  'replyTo' : {'email':'pagan1581998@gmail.com', 'name':'Scifshare'},
                  'to' : [{'email': results[0].email}],
                  'params' : {'secretLabel': label, 'ip': ip},
                  'templateId': 6,
                }
                ).then(function(data) {
                    console.log(data);
                    res.status(200).send(information)
                }, function(error) {
                    console.error(error);
                    res.status(400).send("Unable to send email")
                });
              })
            });
          });
        } else {
          res.status(400).send('Incorrect password')
        }
      } else {
        res.status(404).send('Limit reached or expired')
      }
    });
  });
}

module.exports = controller
