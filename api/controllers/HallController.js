'use strict';

let mongoose = require('mongoose'),
Hall = mongoose.model('Hall');

exports.getHall = function(req, res) {
  Hall.find({}, function(err, data) {
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

exports.createHall = function(req, res) {
  let newHall = new Hall(req.body);
  newHall.save(function(err, data) {
    if (err)
    res.status(404).json({
        status: 404,
        error: true,
        message: err
      })
    res.json(data);
  });
};

exports.hallById = function(req, res) {
  Hall.findById(req.params.hallId, function(err, data) {
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

exports.updateHall = function(req, res) {
  Hall.findOneAndUpdate({_id: req.params.hallId}, req.body, {new: true}, function(err, hall) {
    if (err)
      res.send(err);
    res.json("Hall updated " + hall.name);
  });
};


exports.deleteHall = function(req, res) {
  Hall.remove({
    _id: req.params.hallId
  }, function(err, hall) {
    if (err)
      res.send(err);
    res.json({ message: hall.name +' Hall successfully deleted' });
  });
};
