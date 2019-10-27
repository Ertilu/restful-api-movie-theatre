'use strict';
module.exports = function(app) {
  let Movie = require('../controllers/MovieController');
  let auth = require('../../app');

  // Movie Routes
  app.route('/movie')
    .get(auth.validateUser, Movie.getMovies)
    .post(Movie.createMovie);


  app.route('/movie/:movieId')
    .get(Movie.movieById)
    .put(Movie.updateMovie)
    .delete(Movie.deleteMovie);
};