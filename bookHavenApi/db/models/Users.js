const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Author = require('./Author');
const bcrypt = require('bcrypt');
const Enum = require('../../config/Enum');
const is = require('is_js');
const CustomError = require('../../lib/CustomError');

const schema = mongoose.Schema({
    username: {type: mongoose.SchemaTypes.String, required:true, unique: true},
    email: {type: mongoose.SchemaTypes.String, required:true, unique: true},
    password: {type: mongoose.SchemaTypes.String, required:true},
    profileImage:{type: mongoose.SchemaTypes.String, required:false},
    biography: {type: mongoose.SchemaTypes.String, required:false},
    favoriteAuthors: {type: mongoose.SchemaTypes.Array},
    readingLists: {type: mongoose.SchemaTypes.Array},  
},{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});



class Users extends mongoose.Model {
    validPassword(password){
        return bcrypt.compareSync(password,this.password);
    }

    static validateFieldsBeforeAuth(email,password){
        if (typeof password !== "string" || password.length < Enum.PASS_LENGTH || is.not.email(email)) {
            throw new CustomError(Enum.HTTP_CODES.UNAUTHORIZED,"Validation Error","Email or Password wrong");
        }
        return null;
    }

}


schema.loadClass(Users);
module.exports = mongoose.model("users",schema);