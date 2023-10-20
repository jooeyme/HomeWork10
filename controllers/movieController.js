const MovieRepository = require('../repositories/movieRepository');

const movieRepository = new MovieRepository();

const uploadPhoto = async (req, res) => {
  const movieId = req.params.id;
  const photo = req.file;

  if (!photo) {
    return res.status(400).send('No photo uploaded');
  }

  try {
    await movieRepository.addMovie(movieId, photo);
    res.status(201).json({
      message : 'Photo uploaded successfully',
      });
    
  } catch (error) {
    console.error('Error uploading photo', error);
    res.status(500).send('Internal server error');
  }
};

const updatePhoto = async (req, res) => {
  const id = req.params.id;
  const {title, genres, year, photo} = req.body;

  if (!id) {
    return res.status(400).send('No registered movie ');
  }
  try {
    await movieRepository.updMovie(id, title, genres, year, photo);
    res.status(201).send('Movie Updated successfully');
  } catch (error) {
    console.error('Error uploading photo', error);
    res.status(500).send('Internal server error');
  }
}

module.exports = { uploadPhoto, updatePhoto };
