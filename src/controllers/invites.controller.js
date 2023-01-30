const pool = require('../db/mysql').pool
const SibApiV3Sdk = require("sib-api-v3-sdk")
const controller = {}

controller.create = async (req, res) => {
  const { email, roleId, teamName, teamId } = req.body
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`select * from invites where email = '${email}' and teamId = ${teamId}`, function (error, results, fields){
      if (error) throw error;
      if(results.length > 0){
        res.status(400).send("invite already created for this email")
        return
      } else {
        connection.query(`INSERT INTO invites (email, roleId, teamId) VALUES ('${email}', ${roleId}, ${teamId})`, function (error, results, fields) {
          connection.release();
          if (error) throw error;
          SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_KEY;
          new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
          {
            'subject':`Invitation to join ${teamName}`,
            'sender' : {'email':'pagan1581998@gmail.com', 'name':'Scifshare'},
            'replyTo' : {'email':'pagan1581998@gmail.com', 'name':'Scifshare'},
            'to' : [{'email': email}],
            'params' : {'teamName': teamName},
            'templateId': 5,
          })
          .then(function(data) {
            console.log(data);
            res.status(200).send("Email sent successfully")
          }, function(error) {
            console.error(error);
            res.status(400).send("Unable to send email")
          });
        });
      }
    })
  });
}

controller.resend = async (req, res) => {
  const { email, teamName } = req.body
  SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_KEY;
  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
  {
    'subject':`Invitation to join ${teamName}`,
    'sender' : {'email':'pagan1581998@gmail.com', 'name':'Scifshare'},
    'replyTo' : {'email':'pagan1581998@gmail.com', 'name':'Scifshare'},
    'to' : [{'email': email}],
    'params' : {'teamName': teamName},
    'templateId': 5,
  })
  .then(function(data) {
    console.log(data);
    res.status(200).send("Email sent successfully")
  }, function(error) {
    console.error(error);
    res.status(400).send("Unable to send email")
  });
}

controller.get = async (req, res) => {
  const { id } = req.params
  pool.getConnection(function(err, connection) {
    if (err) throw err; 
    connection.query(`Select * from invites where teamId = ${id}`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.status(200).send(results)
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
      res.status(200).send(results)
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
      res.status(200).send('invite deleted')
    });
  });
}

module.exports = controller
