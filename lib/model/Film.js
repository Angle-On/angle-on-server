const pool = require('../utils/pool');

module.exports = class Film {
  id;
  director_id;
  film_name;
  film_image;
  film_description;
  film_budget;
  film_url;
  film_genre;

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
    filmName,
    filmImg,
    filmDescription,
    filmBudget,
    filmUrl,
    filmGenre,
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO films (film_name, film_img, film_description, film_budget, film_url, film_genre) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [filmName, filmImg, filmDescription, filmBudget, filmUrl, filmGenre]
    );
    return new Film(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
    SELECT * 
    FROM films`);

    return rows.map((row) => new Film(row));
  }

  //Find all films by id
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
     film_img = $2
     film_description = $3
     film_budget = $4
     film_url = $5
     film_genre = $6
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
      `
      DELETE FROM films
      WHERE film_id = $1 
      RETURNING *`,
      [filmId]
    );
    return new Film(rows[0]);
  }
};
