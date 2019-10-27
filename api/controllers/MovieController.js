'use strict';

let mongoose = require('mongoose'),
Movie = mongoose.model('Movies');

exports.getMovies = function(req, res) {
  Movie.find({}, function(err, data) {
    if (err)
    res.status(404).json({
      status: 404,
      error: true,
      message: err
    })
    res.json({
      status: 200,
      error: false,
      data
    })
    res.end()
  });
};

exports.createMovie = function(req, res) {
  let newMovie = new Movie(req.body);
  newMovie.save(function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};

exports.movieById = function(req, res) {
  Movie.findById(req.params.movieId, function(err, data) {
    if (err)
    res.status(404).json({
      status: 404,
      error: true,
      message: err
    })
    res.json({
      status: 200,
      error: false,
      data
    })
    res.end()
  });
};

exports.updateMovie = function(req, res) {
  Movie.findOneAndUpdate({_id: req.params.movieId}, req.body, {new: true}, function(err, movie) {
    if (err)
      res.send(err);
    res.json("Movie updated " + movie.title);
  });
};


exports.deleteMovie = function(req, res) {
  Movie.remove({
    _id: req.params.movieId
  }, function(err, movie) {
    if (err)
      res.send(err);
    res.json({ message: movie.title +' Movie successfully deleted' });
  });
};
