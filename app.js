const express = require('express');
const multer  = require('multer');
const movieController = require('./controllers/movieController');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage});

const movieRoutes = require('./routes/movieRoute');


app.use('/movies', movieRoutes);


app.post('/upload_photo/:id', upload.single('photo'), movieController.uploadPhoto);
app.put('/upd/:id', upload.single('photo'), movieController.updatePhoto);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
