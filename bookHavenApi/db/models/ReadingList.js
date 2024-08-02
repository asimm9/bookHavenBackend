const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Author = require('./Author');
const Users = require('./Users');
const Book = require('./Book');


const schema = mongoose.Schema({
    user: {type: mongoose.SchemaTypes.ObjectId, required:true, Users}, 
    title: {type: mongoose.SchemaTypes.String, required:true}, 
    books: {type: mongoose.SchemaTypes.Array, required:false,ref: Book},
},{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});



class ReadingList extends mongoose.Model {
    
}


schema.loadClass(ReadingList);
module.exports = mongoose.model("reading_list",schema);