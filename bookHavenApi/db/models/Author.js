const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Book = require('./Book');


const schema = mongoose.Schema({
    name: {type: mongoose.SchemaTypes.String, required:true},
    biography: {type: mongoose.SchemaTypes.String, required:false}, 
    birthDate: {type: mongoose.SchemaTypes.Date, required:false},
    books: {type: mongoose.SchemaTypes.Array, required:false},

},{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});



class Author extends mongoose.Model {
    
}


schema.loadClass(Author);
module.exports = mongoose.model("author",schema);