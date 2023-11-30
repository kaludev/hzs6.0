import mongoose, { Schema,model ,models } from "mongoose";

const organizerSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        unique : [true, 'Korisnik je vec organizator'],
        ref: "User"
    },
    name: {
        type : String,
        required : [true, 'Name is required']
    },
    events: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Event",
        default: []
    }
})

const Organizer = models.Organizer || model("Organizer",organizerSchema)

export default Organizer;