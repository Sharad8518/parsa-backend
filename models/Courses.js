const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coursesSchema = new Schema({
   
    courseTitle:{
        type:String
    },

    courseDescrition:{
        type:String
    },

    completePercentage:{
        type:String
    },

    complete:{
        type:String
    },

    createDateTime:{
        type:String
    },

    status:{
        type:String
    }

}, { timeStamps: true })

module.exports = mongoose.model('Courses', coursesSchema)