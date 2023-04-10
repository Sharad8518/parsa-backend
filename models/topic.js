const mongoose = require("mongoose")
const Schema = mongoose.Schema

const topicSchema = new Schema({

courseId:{
    type:mongoose.Schema.Types.ObjectId
},

courseTitle:{
 type:String

},

topicTitle:{
type:String

},

topicDescription:{
    type:String
},

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

module.exports  = mongoose.model("Topic",topicSchema);