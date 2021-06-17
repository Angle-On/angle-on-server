const jwt = require('jsonwebtoken');
//takes in a profile and signs the cookie that it's from our site
const sign = (user) => {
  return jwt.sign({ ...user }, process.env.APP_SECRET, {
    expiresIn: '24hrs',
  });
};

const verify = (webToken) => {
  console.log(webToken);
  console.log(jwt.verify(webToken, process.env.APP_SECRET), 'HELP')
  console.log(typeof(jwt.verify(webToken, process.env.APP_SECRET), 'TYPE OF'))
  
  return jwt.verify(webToken, process.env.APP_SECRET);
};

module.exports = {
  sign,
  verify,
};
