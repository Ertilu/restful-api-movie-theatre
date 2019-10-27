'use strict';

let mongoose = require('mongoose'),
Ticket = mongoose.model('Ticket');

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
  let newTicket = new Ticket(req.body);
  newTicket.save(function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
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
    res.json({ message: data.name +' Data successfully deleted' });
  });
};
