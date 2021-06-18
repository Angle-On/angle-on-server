const pool = require('../utils/pool');

module.exports = class Film {
  filmId;
  filmDirectorId;
  filmName;
  filmImg;
  filmDescription;
  filmBudget;
  filmUrl;
  filmGenre;

  constructor(row) {
    this.filmId = row.id;
    this.filmDirectorId = row.director_id;
    this.filmName = row.film_name;
    this.filmImg = row.film_image;
    this.filmDescription = row.film_description;
    this.filmBudget = row.film_budget;
    this.filmUrl = row.film_url;
    this.filmGenre = row.film_genre;
  }

  static async insert({
    filmDirectorId,
    filmName,
    filmImg, 
    filmDescription,
    filmBudget,
    filmUrl,
    filmGenre,
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO films 
      (director_id
        , film_name
        , film_image
        , film_description
        , film_budget
        , film_url
        , film_genre) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`,
      [
        filmDirectorId,
        filmName,
        filmImg,
        filmDescription,
        filmBudget,
        filmUrl,
        JSON.stringify(filmGenre),
      ]
    );
    return new Film(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
    SELECT first_name
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
  ON d.id = f.director_id`);

    return rows;
  }

  static async findById(filmId) {
    const { rows } = await pool.query(
      `
    SELECT *
    FROM films
    WHERE film_id = $1`,
      [filmId]
    );

    return new Film(rows[0]);
  }

  static async update(
    filmId,
    { filmName, filmImg, filmDescription, filmBudget, filmUrl, filmGenre }
  ) {
    const { rows } = await pool.query(
      `
     UPDATE films
     SET film_name = $1
     , film_image = $2
     , film_description = $3
     , film_budget = $4
     , film_url = $5
     , film_genre = $6
     WHERE film_id = $7
     RETURNING *`,
      [
        filmId,
        filmName,
        filmImg,
        filmDescription,
        filmBudget,
        filmUrl,
        filmGenre,
      ]
    );

    return new Film(rows[0]);
  }

  static async delete(filmId) {
    const { rows } = await pool.query(
      `DELETE FROM films
      WHERE film_id = $1 
      RETURNING *`,
      [filmId]
    );
    return new Film(rows[0]);
  }
};
