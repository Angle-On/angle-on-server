const pool = require('../utils/pool');

module.exports = class Donation {
  donationId;
  donationInvestorId;
  donationFilmId;
  donationAmount;

  constructor(row) {
    this.donationId = row.id;
    this.donationInvestorId = row.investorId;
    this.donationFilmId = row.film_id;
    this.donationAmount = row.donation_amount;
  }

  static async insert({ donationInvestorId, donationFilmId, donationAmount }) {
    const { rows } = await pool.query(
      `
      INSERT INTO donations (investor_id,
        film_id, donation_amount) VALUES ($1, $2, $3) RETURNING *`,
      [donationInvestorId, donationFilmId, donationAmount]
    );

    return new Donation(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
      SELECT *
      FROM donations
      `);

    return rows.map((row) => new Donation(row));
  }

  static async findById(donationId) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM donation
      WHERE donation_id = $1`,
      [donationId]
    );

    return new Donation(rows[0]);
  }
};
