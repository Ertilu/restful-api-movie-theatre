'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let HallSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
},{
	timestamps: true
});

module.exports = mongoose.model('Hall', HallSchema);