const fetch = require('node-fetch');

const verifyToken = async (tokenId) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`
  );
  // console.log(response, 'IN VERIFY.JS');
  if(!response.ok) throw new Error('No user invalid user no access go away');
  const { email } = await response.json();
  return email;
};

module.exports = verifyToken;
