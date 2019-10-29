const userModel = require('../models/UserModel');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
module.exports = {
 create: function(req, res, next) {
  
  userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password, age: req.body.age }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "User added successfully!!!", data: null});
      
    });
 },
authenticate: function(req, res, next) {
  userModel.findOne({email: req.body.email})
		.then(data => {
			if (data) {
				bcrypt.compare(req.body.password, data.password, function(err, result) {
					if (result === true) {
						const token = jwt.sign({email: data.email}, 'secretkey');
						res.json({
							status: 200,
							error: false,
							user: {
								_id: data._id,
								name: data.name,
								email: data.email
							},
							token
						})
					} else {
						console.log(data.password)
						console.log(req.body.password)
						res.status(400).json({
							status: 400,
							error: true,
							message: 'Email or Password is wrong'
						})
					}
				})
			} else {
				res.status(400).json({
					status: 400,
					error: true,
					message: 'Email or Password is wrong'
				})
			}
		})
		.catch(err => {
			res.status(400).json({
				status: 400,
				error: true,
				message: err.message
			})
		})
 },
 getUser: function(req, res, next) {
   userModel.find({}, function(err, data) {
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
 },
 deleteUser: function(req, res, next) {
   userModel.remove({
      _id: req.params.userId
    }, function(err, data) {
      if (err)
        res.send(err);
      res.json({ message: 'Data successfully deleted' });
    });
  }
}