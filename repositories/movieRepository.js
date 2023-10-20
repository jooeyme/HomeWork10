var pool = require("../config/query.js");

class MovieRepository {
  async addMovie(id, photo) {
    const query = 'INSERT INTO movies (id, photo) VALUES ($1, $2)';
    const values = [id, photo];

    try {
      await pool.query(query, values);
    } catch (error) {
      console.error('Error executing query', error);
      throw error;
    }
  }

  async updMovie(title, genres, year, photo, id) {
    const query = 'UPDATE movies SET title = $1, genres = $2, year = $3, photo = $4 WHERE id = $5';
    const values = [ title, genres, year, photo, id];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error executing query', error);
      throw error;
    }
  }

  async getMovie(id) {
    const query = 'SELECT * FROM movies WHERE id = $1';
    const values = [id];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error executing query', error);
      throw error;
    }
  }
}

module.exports = MovieRepository;
