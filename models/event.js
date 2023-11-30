import mongoose, { Schema,model ,models } from "mongoose";

const eventSchema = new Schema({
    name: {
        type : String,
        required : [true, 'Name is required'],
        match: [/^[a-z A-Z0-9]{1,100}$/, "Name can contain up to 100 alphanumeric letters!"]
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: Object,
    },
    starts_at: {
        type: Date,
        required: true
    },
    ends_at: {
        type: Date,
        required: true,
        validate:{
            validator: function (ends_at){
                return ends_at > this.starts_at;
            },
            message: "End date must be greater than start date!",
        }
    },
    capacity: {
        type: Number,
        required: true
    },
    users_signed: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
        validate: {
            validator: function(users_signed){
                if(users_signed.length < this.capacity){
                    return true;
                }
                else{
                    return false;
                }
            },
            message: "Event is full!",
        }
    },
    users_liked: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "User"
    },
    eventType:{
        type: Number,
        required: true
    },
    level:{
        type: Number,
        required: true
    },
    image: {
        type: [String]
    }
})

const Event = models.Event || model("Event", eventSchema)

export default Event;