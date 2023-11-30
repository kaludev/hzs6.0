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
        if(data.user.isOrganizer){
            const organizer = await Organizer.findOne({
                user_id: data.user._id
            })
            if(organizer?.events){
                for(let event of organizer?.events) {
                    Event.findByIdAndDelete(event.id);
                }
                Organizer.deleteOne({user_id: data.user._id})
            }
        }
        if(data.user.requestedOrganizer){
            await OrganizerRequest.deleteOne({
                user_id: data.user._id
            })  
        }
        
        await Event.updateMany({users_signed: data.user._id},{
            $pull: {
                users_signed : data.user._id
            }
        })
        await User.deleteOne({
            id: data.user._id
        });
        return new Response(JSON.stringify({ ok: true, message: 'Uspesno obrisan nalog'}),{status:200})
    }catch(e){
        console.log(e);
        return new Response("Greska pri editovanju korisnika", {status: 500});
    }

}