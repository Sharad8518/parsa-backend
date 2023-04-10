const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    username: {
        type: String
    },
    password: {
        type: String
    },
    createdDateTime: {
        type: String
    },
    status: {
        type: String
    }
}, { timeStamps: true })

module.exports = mongoose.model('Admin', adminSchema)
