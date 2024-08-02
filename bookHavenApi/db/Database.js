const mongoose = require('mongoose');


let instance = null;
class Database{

    constructor() {
        if (!instance) {
            this.mongoConnection = null;
            instance = this;
        }
        return instance;
    }


    async  connect(options) {
        try {
            console.log("Connectting.....");
            let db = mongoose.connect("mongodb://127.0.0.1:27017/bookHaven",{useNewUrlParser: true, useUnifiedTopology: true });
            
            this.mongoConnection = db;
            console.log("Connected!!");
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}