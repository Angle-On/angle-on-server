const verifyToken = require('../utils/verify');
const Director = require('../model/Director');

module.exports = class DirectorService {
  static async create({ tokenId, ...director }) {
    
    const email = await verifyToken(tokenId);
    const user = await Director.findByEmail(email);

    if(!user){
      return Director.insert(director);
    } else {
      return user;
    }

  }
};
