'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MovieSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the name of the movie'
  },
  actor: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  release: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: 'Kindly enter the description of the movie'
  },
  poster: {
    type: String,
    required: true
  },
  showtime: {
    type: Date,
    default: Date.now
  }
},{
	timestamps: true
});

module.exports = mongoose.model('Movies', MovieSchema);