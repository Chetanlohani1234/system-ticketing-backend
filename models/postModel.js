const mongoose = require('mongoose');

const ticketingSchema = mongoose.Schema({
    category:{
       type:String,
    },
    heading:{
        type:String,
    },
    description:{
        type:String,
    },
    priority:{
        type:String,
    },
    image:{
        type:Object,
    },
},
{timestamps:true}
)

module.exports = mongoose.model("Post",ticketingSchema);