'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TicketSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date_played: {
    type: String,
    required: true
  },
  movie_id: {
    type: Schema.Types.ObjectId,
    ref: 'Movies',
    required: true
  },
  seat_id: {
    type: Schema.Types.ObjectId,
    ref: 'Seat',
    required: true
  },
  hall_id: {
    type: Schema.Types.ObjectId,
    ref: 'Hall',
    required: true
  }
});

module.exports = mongoose.model('Ticket', TicketSchema);