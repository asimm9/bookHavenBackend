const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Users = require('./Users');
const Book = require('./Book');


const schema = mongoose.Schema({
    user: {type: mongoose.SchemaTypes.ObjectId, required:true, ref: Users},
    book: {type: mongoose.SchemaTypes.ObjectId, required:true, ref: Book},
    page: {type: mongoose.SchemaTypes.Number, required:false},
    quoteText: {type: mongoose.SchemaTypes.String, required:true}
},{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});



class Quote extends mongoose.Model {
    
}


schema.loadClass(Quote);
module.exports = mongoose.model("quote",schema);