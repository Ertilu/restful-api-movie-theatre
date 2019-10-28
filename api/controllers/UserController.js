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
  userModel.findOne({email:req.body.email}, function(err, userInfo){
     if (err) {
      next(err);
     } else {
        if(bcrypt.compareSync(req.body.password, userInfo.password)) {
            const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'));
            res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
        }else{
            res.json({status:"error", message: "Invalid email/password!!!", data:null});
        }
     }
    });
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