'use strict';

let mongoose = require('mongoose'),
Seat = mongoose.model('Seat');

exports.getSeat = function(req, res) {
  Seat.find({}, function(err, data) {
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

exports.createSeat = function(req, res) {
  let newSeat = new Seat(req.body);
  newSeat.save(function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.seatById = function(req, res) {
  Seat.findById(req.params.seatId, function(err, data) {
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

exports.updateSeat = function(req, res) {
  Seat.findOneAndUpdate({_id: req.params.seatId}, req.body, {new: true}, function(err, data) {
    if (err)
      res.send(err);
    res.json("data updated " + data.name);
  });
};

exports.deleteSeat = function(req, res) {
  Seat.remove({
    _id: req.params.seatId
  }, function(err, data) {
    if (err)
      res.send(err);
    res.json({ message: data.name +' Data successfully deleted' });
  });
};
