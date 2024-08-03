const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Author = require('./Author');


const schema = mongoose.Schema({
    title: {type: mongoose.SchemaTypes.String, required:true},
    author: {type: mongoose.SchemaTypes.ObjectId, required:false}, 
    narrator: {type: mongoose.SchemaTypes.String, required:true},
    duration: {type: mongoose.SchemaTypes.Number, required:true},//in minutes
    fileUrl: {type: mongoose.SchemaTypes.String, required:true}, 
},{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});



class AudioBook extends mongoose.Model {
    
}


schema.loadClass(AudioBook);
module.exports = mongoose.model("audio_book",schema);