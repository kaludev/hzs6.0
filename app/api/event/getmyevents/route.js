
import { connectToDB } from "@utils/database";
import Event from "@models/event";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Organizer from "@models/organizer";

export const GET = async (req) => {
    const data = await getServerSession(authOptions);
    console.log(data);
    try{
        await connectToDB();
        const organizer = await Organizer.findOne({user_id: data.user._id}).populate('events');
        console.log(organizer);
        const events = organizer.events;
        console.log(events);
        return new Response(JSON.stringify(events),{
            status: 200
        })
    }catch(err){
        return new Response("Failed to fetch prompts",{
            status: 500
        })
    }
    
}