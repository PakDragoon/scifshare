const pool = require('../db/mysql').pool
const controller = {}
const SibApiV3Sdk = require("sib-api-v3-sdk")
require("dotenv").config()

controller.send = async (req, res) => {
    const { teamName, email, url } = req.body
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_KEY;
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
    {
        'subject': `Invitation to join ${teamName}`,
        'sender' : {'email':'pagan1581998@gmail.com', 'name':'Scifshare'},
        'replyTo' : {'email':'pagan1581998@gmail.com', 'name':'Scifshare'},
        'to' : [{'email': email}],
        'params' : {'teamName': teamName, 'url': url},
        'templateId': 5,
    }
    ).then(function(data) {
        console.log(data);
        res.status(200).send("Email sent successfully")
    }, function(error) {
        console.error(error);
        res.status(400).send("Unable to send email")
    });
}

controller.check = async (req, res) => {
    const ip = req.ip
    res.send({ ip })
}

module.exports = controller
