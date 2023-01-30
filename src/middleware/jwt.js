const jwt = require("jsonwebtoken");

function generateAuthToken(id, name, email) {
  const userData = { id, name, email }; 
  const accessToken = jwt.sign(userData, 'wrtfr67d65sese54', { expiresIn: '12h' });
  return ({ accessToken });
}

exports.generateAuthToken = generateAuthToken;