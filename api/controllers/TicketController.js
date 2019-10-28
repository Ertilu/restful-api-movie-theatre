'use strict';

let mongoose = require('mongoose'),
Ticket = mongoose.model('Ticket'),
Seat = mongoose.model('Seat');

exports.getTicket = function(req, res) {
  Ticket.find({}, function(err, data) {
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

exports.createTicket = function(req, res) {
  Seat.findOneAndUpdate({_id: req.body.seat_id}, { 'status': 'filled' }, function(err, data) {
    if (err)
      res.send(err);
      let newTicket = new Ticket(req.body);
      newTicket.save(function(err, data) {
        if (err)
          res.send(err);
        res.json(data);
      });
  });
};

exports.ticketById = function(req, res) {
  Ticket.findById(req.params.ticketId, function(err, data) {
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

exports.updateTicket = function(req, res) {
  Ticket.findOneAndUpdate({_id: req.params.ticketId}, req.body, {new: true}, function(err, data) {
    if (err)
      res.send(err);
    res.json("data updated " + data.name);
  });
};

exports.deleteTicket = function(req, res) {
  Ticket.remove({
    _id: req.params.ticketId
  }, function(err, data) {
    if (err)
      res.send(err);
    res.json({ message: 'Data successfully deleted' });
  });
};
