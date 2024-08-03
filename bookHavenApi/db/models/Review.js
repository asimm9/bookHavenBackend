const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Users = require('./Users');
const Book = require('./Book');


const schema = mongoose.Schema({
    user: {type: mongoose.SchemaTypes.ObjectId, required:true},
    book: {type: mongoose.SchemaTypes.ObjectId, required:true},
    rating: {type: mongoose.SchemaTypes.Number, required:true},
    reviewText: {type: mongoose.SchemaTypes.String, required:false}
},{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});



class Review extends mongoose.Model {
    
}


schema.loadClass(Review);
module.exports = mongoose.model("review",schema);