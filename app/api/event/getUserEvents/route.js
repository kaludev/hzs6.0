
import { connectToDB } from "@utils/database";
import Event from "@models/event";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const GET = async (req) => {
    const data = await getServerSession(authOptions);
    console.log(data);
    try{
        await connectToDB();
        const events = await Event.find({users_signed: data.user._id});
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