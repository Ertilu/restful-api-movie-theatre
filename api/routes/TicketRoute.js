'use strict';
module.exports = function(app) {
  let Ticket = require('../controllers/TicketController');

  // Seat Routes
  app.route('/ticket')
    .get(Ticket.getTicket)
    .post(Ticket.createTicket);


  app.route('/ticket/:ticketId')
    .get(Ticket.ticketById)
    .put(Ticket.updateTicket)
    .delete(Ticket.deleteTicket);
};