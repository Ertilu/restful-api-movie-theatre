'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SeatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  hall_id: {
    type: Schema.Types.ObjectId,
    ref: 'Hall',
    required: true
  },
  status: {
    type: String,
    enum : ['available','filled'],
    default: 'available'
  },
},{
	timestamps: true
});

module.exports = mongoose.model('Seat', SeatSchema);