const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Users = require('./Users');


const schema = mongoose.Schema({
    title:  {type: mongoose.SchemaTypes.String, required:true},
    author:  {type: mongoose.SchemaTypes.ObjectId, required:true, ref: Users},
    genre:  {type: mongoose.SchemaTypes.String, required:true},
    description:  {type: mongoose.SchemaTypes.String, required:false},
    coverImage:  {type: mongoose.SchemaTypes.String, required:false},
    publishedDate:  {type: mongoose.SchemaTypes.Date, required:false},
    ratings:  {type: mongoose.SchemaTypes.Array, ref:Review},
},{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});



class Book extends mongoose.Model {
    
}


schema.loadClass(Book);
module.exports = mongoose.model("book",schema);