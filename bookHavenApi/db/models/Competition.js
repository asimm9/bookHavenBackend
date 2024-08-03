const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Users = require('./Users');


const schema = mongoose.Schema({ 
    title: {type: mongoose.SchemaTypes.String, required:true}, 
    description: {type: mongoose.SchemaTypes.String, required:false},
    startDate: {type: mongoose.SchemaTypes.Date, required:true},
    endDate: {type: mongoose.SchemaTypes.Date, required:true},
    participants: {type: mongoose.SchemaTypes.Array, required:false},
},{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});



class Competition extends mongoose.Model {
    
}


schema.loadClass(Competition);
module.exports = mongoose.model("competition",schema);