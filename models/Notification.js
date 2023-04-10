const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userId : {
        type:  Schema.Types.ObjectId 
     },
    vendorId : {
        type:  Schema.Types.ObjectId  
    },
    title : {
        type: String 
    },
    description : {
        type: String 
    },
    createDateTime : {
        type: String 
    },
    status : {
        type: String
     },
   
}, { timeStamps: true })

module.exports = mongoose.model('Notification', notificationSchema)
