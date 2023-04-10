const mongoose = require("mongoose")

const Schema = mongoose.Schema

const subTopicSchema = new Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId
    },
    
    courseTitle:{
     type:String
    },

    topicId:{
        type:mongoose.Schema.Types.ObjectId
    },

    topicTitle:{
        type:String
    },

    subTopicTitle:{
        type:String
    },

    subTopicTopicDescription:{
        type:String
    },

    questions: [{
        questionTitle:String,
        objective:Array,
        correctAnswer:String,
        answer:String,
        mark:String,
        questionType:String,
        video:String,
        status:String
    }],

    completionPercentage:{
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


})

module.exports = mongoose.model("SubTopic",subTopicSchema)