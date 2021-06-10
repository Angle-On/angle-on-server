const pool = require('../utils/pool');

module.exports = class Investor {
  id;
  first_name;
  last_name;
  username;
  investor_img;
  email;

  constructor(row) {
    this.investorId = row.id;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.username = row.username;
    this.investorImg = row.investor_img;
    this.email = row.email;
  }

  static async insert({ firstName, lastName, username, investorImg, email }) {
    const { rows } = await pool.query(
      `INSERT INTO investors 
      (firstName, lastName, username, investorImg, email) VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`,
      [firstName, lastName, username, investorImg, email]
    );
    return new Investor(rows[0]);
  }

  static async update(
    investorId,
    { firstName, lastName, username, investorImg }
  ) {
    const { rows } = await pool.query(
      `
  UPDATE films
  SET firstName = $1,
  lastName = $2, 
  username = $3,
  investorImg = $4,
  WHERE directorId = $5 RETURNING *`,
      [investorId, firstName, lastName, username, investorImg]
    );
    return new Investor(rows[0]);
  }
};
