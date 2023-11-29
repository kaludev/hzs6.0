import mongoose, { Schema,model ,models } from "mongoose";

const organizerRequestSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type : String,
        required : [true, 'Ime je obavezno']
    },
    email:{
        type : String,
        required : [true, 'Email je obavezan'],
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email mora biti validan"]
    },
    club_name: {
        type : String,
        required : [true, 'Ime je obavezno'],
    },
    club_email: {
        type : String,
        required : [true, 'Email je obavezan'],
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email mora biti validan"]
    },
    phone: {
        type: String,
        required : [true, 'Telefon je obavezan'],
        match : [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/,"Telefon mora biti validan"]
    },
    reason:{
        type: String
    }
})

const OrganizerRequest = models.OrganizerRequest || model("OrganizerRequest",organizerRequestSchema)

export default OrganizerRequest;