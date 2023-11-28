import mongoose, { Schema,model ,models } from "mongoose";

const organizerSchema = new Schema({
    name: {
        type : String,
        unique : [true, 'Name should be unique'],
        required : [true, 'Name is required']
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    events: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Event",
        default: []
    },
    image: {
        type: String
    }
})

const Organizer = models.Organizer || model("Organizer",organizerSchema)

export default Organizer;