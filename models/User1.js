const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user1Schema = new Schema({
    fName: {
        type: String
     },  
    lName: {
        type: String 
    },
    contact: {
        type: String
    },
    email: {
        type: String 
    },
    password: {
        type: String
    },
    address: {
        type: String 
    },
    city: {
        type: String
     },
    state: {
        type: String
     },
    pincode: {
        type: Number 
    },
    createdDateTime: {
        type: String
     },
    status: {
        type: String 
    },
}, { timeStamps: true })

module.exports = mongoose.model('User1', user1Schema)