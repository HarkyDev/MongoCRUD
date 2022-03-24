const { Schema, model} = require("mongoose")
const { stringify } = require("querystring")
const reactionSchema = require("./Reaction")

const thoughtSchema = new Schema (
    {
        thoughtMessage: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 300
        },
        createdAt:{
            type:Date,
            default: Date.now,
        },
        username:{
            type:String,
            required:true
        },
        reactions:[reactionSchema]
    
},
{
    toJSON:{
        getters:true
    },
    id:false
}
)

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought