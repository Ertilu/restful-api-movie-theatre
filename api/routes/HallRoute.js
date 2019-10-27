'use strict';
module.exports = function(app) {
  let Hall = require('../controllers/HallController');

  // Movie Routes
  app.route('/hall')
    .get(Hall.getHall)
    .post(Hall.createHall);


  app.route('/hall/:hallId')
    .get(Hall.hallById)
    .put(Hall.updateHall)
    .delete(Hall.deleteHall);
};