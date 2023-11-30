
import { connectToDB } from "@utils/database";
import Event from "@models/event";

export const GET = async (req) => {
    try{
        await connectToDB();
        const events = await Event.find({});
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