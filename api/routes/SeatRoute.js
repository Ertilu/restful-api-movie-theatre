'use strict';
module.exports = function(app) {
  let Seat = require('../controllers/SeatController');

  // Seat Routes
  app.route('/seat')
    .get(Seat.getSeat)
    .post(Seat.createSeat);


  app.route('/seat/:seatId')
    .get(Seat.seatById)
    .put(Seat.updateSeat)
    .delete(Seat.deleteSeat);
};