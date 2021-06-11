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
      `UPDATE films
  SET firstName = $1,
  lastName = $2, 
  username = $3,
  investorImg = $4,
  WHERE directorId = $5 RETURNING *`,
      [investorId, firstName, lastName, username, investorImg]
    );
    return new Investor(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
    SELECT * 
    FROM investors
    `);
    return rows.map((row) => new Investor(row));
  }

  //Find investor by id
  static async findById(investorId) {
    const { rows } = await pool.query(
      `
    SELECT * 
    FROM investors
    WHERE investorId = $1 
    RETURNING *
    `,
      [investorId]
    );

    return new Investor(rows[0]);
  }

  //Find donations sum by investor id
  static async findDonationsById(investorId) {
    const { rows } = await pool.query(
      `
    SELECT SUM(donationAmount) AS donated
    FROM investors i
    JOIN donations d
    ON i.id = d.investor_id
    WHERE investorId = $1
    AND donationId = $1
    RETURNING *
    `,
      [investorId]
    );

    return new Investor(rows[0]);
  }

  //Find films investor donated to by id
  static async findFilmsInvestorDonatedToById(investorId) {
    const { rows } = await pool.query(
      `
    SELECT film_name
    , film_description
    , donation_amount
    FROM investors i
    JOIN donations d
    ON i.id = d.investor_id
    JOIN films f
    ON d.film_id = f.id
    WHERE investorId = $1
    AND donationId = $1
    RETURNING *
    `,
      [investorId]
    );
    return new Investor(rows[0]);
  }

  static async delete(investorId) {
    const { rows } = await pool.query(
      `
    DELETE FROM investors
    WHERE investorId = $1`,
      [investorId]
    );

    return new Investor(rows[0]);
  }
};
