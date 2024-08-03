var express = require('express');
var router = express.Router();
const userController  = require("../controllers/user_controller");
const auth_middleware = require('../middleware/auth_middleware');
const Auth = require('../lib/Auth')();

// GET current User 
router.get('/user',Auth.authenticate(),userController.get);


// REGISTER User 
router.post("/register",userController.register);

// LOGIN User
router.post("/login", userController.login);






module.exports = router;
