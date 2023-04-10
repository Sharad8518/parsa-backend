const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    fName: {
        type: String
    },
    lName: {
        type: String
    },
    contact: {
        type: String
    },
    alternativeContact: {
        type: String
    },
    type: {
        type: String
    },
    image: {
        type: String
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
    experience: {
        type: String
    },
    services: [
        {
        serviceType: String,
        servicePrice: String,
        serviceStatus: String
    }
],

    Expertise: [
        {
        ExpertiseName: String,
        ExpertisPrice: String
    }
],

    description: {
        type: String
    },
    availability: {
        type: String
    },
    availableTiming: {
        type: String
    },
    createdDateTime: {
        type: String
    },
    status: {
        type: String
    },
}, { timeStamps: true })

module.exports = mongoose.model('Vendor', vendorSchema)


