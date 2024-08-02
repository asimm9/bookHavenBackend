const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Author = require('./Author');


const schema = mongoose.Schema({
    username: {type: mongoose.SchemaTypes.String, required:true, unique: true},
    email: {type: mongoose.SchemaTypes.String, required:true, unique: true},
    password: {type: mongoose.SchemaTypes.String, required:true},
    profileImage:{type: mongoose.SchemaTypes.String, required:false},
    biography: {type: mongoose.SchemaTypes.String, required:false},
    favoriteAuthors: {type: mongoose.SchemaTypes.Array, ref: Author},
    readingLists: {type: mongoose.SchemaTypes.Array, ref: ReadingList},  
},{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});



class Users extends mongoose.Model {
    
}


schema.loadClass(Users);
module.exports = mongoose.model("users",schema);