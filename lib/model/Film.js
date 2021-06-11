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
      INSERT INTO films (filmName, filmImg, filmDescription, filmBudget, filmUrl, filmGenre) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
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
    WHERE filmId = $1`,
      [filmId]
    );

    return new Film(rows[0]);
  }

  static async update(
    filmId,
    {
      filmName,
      filmImg,
      filmDescription,
      filmBudget,
      filmUrl,
      filmGenre,
    }
  ) {
    const { rows } = await pool.query(
      `
     UPDATE films
     SET filmName = $1
     filmImg = $2
     filmDescription = $3
     filmBudget = $4
     filmUrl = $5
     filmGenre = $6
     WHERE filmId = $7
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
      WHERE filmId = $1 RETURNING *`,
      [filmId]
    );
    return new Film(rows[0]);
  }
};
