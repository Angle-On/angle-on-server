const pool = require('../utils/pool');

module.exports = class Director {
  directorId;
  firstName;
  lastName;
  username;
  directorImg;
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
      (first_name
        , last_name
        , username
        , director_img
        , email) VALUES ($1, $2, $3, $4, $5) 
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
      `UPDATE directors
  SET first_name = $1
  , last_name = $2 
  , username = $3
  , director_img = $4
  WHERE director_id = $5 RETURNING *`,
      [directorId, firstName, lastName, username, directorImg]
    );
    return new Director(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
    SELECT * 
    FROM directors
    `);
    return rows.map((row) => new Director(row));
  }

  static async findById(directorId) {
    const { rows } = await pool.query(
      `
    SELECT * 
    FROM directors
    WHERE director_id = $1 
    `,
      [directorId]
    );

    return new Director(rows[0]);
  }

  static async findFilmByDirectorId(directorId) {
    const { rows } = await pool.query(
      `SELECT first_name
      , last_name
      , d.id AS director_id
      , f.id AS film_id
      , film_name
      , film_image
      , film_description
      , film_budget
      , film_url
      , film_genre
      FROM directors d
      JOIN films f
      ON d.id = f.director_id
      WHERE d.id = $1`,
      [directorId]
    );
    return rows;
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `
    SELECT * 
    FROM directors
    WHERE email = $1 
    `,
      [email]
    );
    if (!rows[0]) return null;
    return new Director(rows[0]);
  }

  static async delete(directorId) {
    const { rows } = await pool.query(
      `
    DELETE FROM directors
    WHERE director_id = $1
    RETURNING *`,
      [directorId]
    );

    return new Director(rows[0]);
  }
};
