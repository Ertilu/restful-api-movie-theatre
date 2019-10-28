const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
router.post('/register', userController.create);
router.post('/login', userController.authenticate);
router.get('/show', userController.getUser);
router.delete('/delete/:userId', userController.deleteUser);
module.exports = router;