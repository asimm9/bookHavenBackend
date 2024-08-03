const Enum = require("../config/Enum");
const Users = require("../db/models/Users");
const CustomError = require("../lib/CustomError");
const is_js = require('is_js');
const bcrypt = require('bcrypt');
const Response = require("../lib/Response");
const config = require("../config");
const jwt = require('jwt-simple');

//GET User controller
exports.get = async (req, res) => {
  try {
    let user = await Users.findById(req.user.id).select("-password");
    res.json(Response.successResponse(user,Enum.HTTP_CODES.OK));
  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).json(errorResponse);
  }
};

//REGISTER an user 
exports.register = async (req,res) =>{
    try {
        let body = req.body;

        if(!body.email) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error", "Email field must be filled");
        if(is_js.not.email(body.email)) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error", "Email field must be an email");
        if(!body.password) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error", "Password field must be filled");
        if(body.password.length < Enum.PASS_LENGTH) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error", "Password length must be greater than " +Enum.PASS_LENGTH);
        if(!body.username) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error", "Username field must be filled");
        
        let password = bcrypt.hashSync(body.password,bcrypt.genSaltSync(8),null);

        let user = await Users.find({email: body.email});
        if (user.length>0) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Already Exist", "This email already has been register");    
    
        let user2 = await Users.find({username: body.username});
        if (user2.length>0) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Already Exist", "This username already has been register");    
        
        let toAddUser = await Users.create({
            username: body.username,
            email: body.email,
            password: password,
            profileImage: body.profileImage,
            biography: body.biography,
            favoriteAuthors: body.favoriteAuthors,
            readingLists: body.readingLists 
        });
        
        res.status(Enum.HTTP_CODES.CREATED).json(Response.successResponse(toAddUser,Enum.HTTP_CODES.CREATED));
    }catch (error) {
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).json(errorResponse);
    }
}


exports.login = async (req,res) => {
  try {
    let {email, password} = req.body;

    Users.validateFieldsBeforeAuth(email,password);
    
    let user  = await Users.findOne({email});

    if(!user) throw new CustomError(Enum.HTTP_CODES.UNAUTHORIZED,"Validation Error","There is no user");
    if(!user.validPassword(password)) throw new CustomError(Enum.HTTP_CODES.UNAUTHORIZED,"Validation Error","Auth Error");

    let payload = {
      id: user._id,
      exp: parseInt(Date.now() /1000) * config.JWT.EXPIRE_TIME,
    }

    let  token  = jwt.encode(payload,config.JWT.SECRET);

    let userData = {
      _id: user._id,
      username: user.username
    }

    res.json(Response.successResponse({token,user:userData}));


  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).json(errorResponse);
  }
}
