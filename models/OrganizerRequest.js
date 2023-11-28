import mongoose, { Schema,model ,models } from "mongoose";

const organizerRequestSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type : String,
        unique : [true, 'Name should be unique'],
        required : [true, 'Name is required']
    },
    EventTypes: {
        type: String,
        required : [true, 'Event types is required']
    },
    reason:{
        type: String
    }
})

const OrganizerRequest = models.OrganizerRequest || model("OrganizerRequest",organizerRequestSchema)

export default OrganizerRequest;