import mongoose, { Schema,model ,models } from "mongoose";

const eventSchema = new Schema({
    id:{
        type: Number,
        unique: [true, 'ID already in use!'],
        required: [true,'ID is required!']
    },
    name: {
        type : String,
        required : [true, 'Name is required'],
        match: [/^[a-zA-Z0-9]{1,30}$/, "Name can contain up to 30 alphanumeric letters!"]
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
    likes:{
        type: Number,
        required: true,
        default:0
    },
    image: {
        type: [String]
    }
})

const Event = models.Event || model("Event", eventSchema)

export default Event;