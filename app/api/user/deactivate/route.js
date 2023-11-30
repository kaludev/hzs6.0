import { getServerSession } from "next-auth"
import User from "@models/user";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { connectToDB } from "@utils/database";
import Organizer from "@models/organizer";
import OrganizerRequest from "@models/OrganizerRequest";
import Event from "@models/event";

export const GET = async (req) => {
    try {
    await connectToDB();
        const data = await getServerSession(authOptions);
        const organizer = await Organizer.findOne({
            user_id: data.user._id
        })
        for(let event of organizer.events) {
            Event.findByIdAndDelete(event);
        }
        await Event.updateMany({users_signed: data.user._id},{
            $pull: {
                users_signed : data.user._id
            }
        })

        await OrganizerRequest.deleteOne({
            user_id: data.user._id
        })
        await User.deleteOne({
            id: data.user._id
        });
        return new Response(JSON.stringify({ ok: true, message: 'Uspesno obrisan nalog'}))
    }catch(e){
        console.log(e);
        return new Response("Greska pri editovanju korisnika", {status: 500});
    }

}