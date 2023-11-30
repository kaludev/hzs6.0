import { connectToDB } from "@utils/database";

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Event from "@models/event";
//GET post by id
export const GET = async (req,{params}) => {
    console.log(params.id);
    try{
        await connectToDB();
        const request = await Event.findById(params.id);
        console.log(request);
        return new Response(JSON.stringify(request),{
            status: 200
        })
    }catch(err){
        return new Response("Greska pri prikazivanju dogadjaja",{status: 500})
    }
}