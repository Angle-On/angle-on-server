const verifyToken = require('../utils/verify');
const Investor = require('../model/Investor');

module.exports = class InvestorService {
  static async create({ tokenId, ...investor }) {
    
    const email = await verifyToken(tokenId);
    const user = await Investor.findByEmail(email);

    if(!user){
      return Investor.insert(investor);
    } else {
      return user;
    }

  }
};
