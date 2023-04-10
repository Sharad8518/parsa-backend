const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    fName: {
        type: String
    },
    lName: {
        type: String
    },
    contact: {
        type: Number
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    createdDateTime: {
        type: String
    },
    status: {
        type: String
    }
}, { timeStamps: true })

module.exports = mongoose.model('Request', requestSchema)
