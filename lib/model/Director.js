const pool = require('../utils/pool');

module.exports = class Director {
  id;
  first_name;
  last_name;
  username;
  director_img;
  email;

  constructor(row) {
    this.directorId = row.id;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.username = row.username;
    this.directorImg = row.director_img;
    this.email = row.email;
  }

  static async insert({ firstName, lastName, username, directorImg, email }) {
    const { rows } = await pool.query(
      `INSERT INTO directors 
      (firstName, lastName, username, directorImg, email) VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`,
      [firstName, lastName, username, directorImg, email]
    );
    return new Director(rows[0]);
  }

  static async update(
    directorId,
    { firstName, lastName, username, directorImg }
  ) {
    const { rows } = await pool.query(
      `
  UPDATE films
  SET firstName = $1,
  lastName = $2, 
  username = $3,
  directorImg = $4,
  WHERE directorId = $5 RETURNING *`,
      [directorId, firstName, lastName, username, directorImg]
    );
    return new Director(rows[0]);
  }
};
