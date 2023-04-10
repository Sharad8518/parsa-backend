const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    paymentId : {
        type: String
     },
    bookingNo : {
        type: String
     },
    userId : {
        type: Schema.Types.ObjectId 
    },
    vendorId : {
        type:  Schema.Types.ObjectId 
     },
    vendorName : {
        type: String 
    },
    serviceName : {
        type: String 
    },
    servicePrice : {
        type: String 
    },
    totalAmount : {
        type: String 
    },
    scheduleDate : {
        type: String 
    }, 
    scheduleTime : {
        type: String 
    }, 
    createDateTime : {
        type: String
     }, 
    status : {
        type: String 
    }, 
}, { timeStamps: true })

module.exports = mongoose.model('Booking', bookingSchema)