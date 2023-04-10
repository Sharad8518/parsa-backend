const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    longitude: {
        type: Number 
    },
    latitude: {
        type: Number 
    },
    subscriptionType: {
        type: String 
    },
    subscriptionDateTime: {
        type: String 
    },
    subscriptionAmount: {
        type: String 
    },
    subscriptionName: {
        type: String
     },
    deviceToken: {
        type: String 
    },
    createdDateTime: {
        type: String
     },
    status: {
        type: String 
    },
}, { timeStamps: true })

module.exports = mongoose.model('User', userSchema)