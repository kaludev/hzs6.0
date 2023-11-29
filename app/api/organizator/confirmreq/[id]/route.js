import { connectToDB } from "@utils/database";

import OrganizerRequest from "@models/OrganizerRequest";
import Organizer from "@models/organizer";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
//GET post by id
export const GET = async (req,{params}) => {
    const data = await getServerSession(authOptions);
    console.log(data);
    if(data.isSuperAdmin) {
        try{
            await connectToDB();
            const request = await OrganizerRequest.findById(params.id);
            if(!req) return new Response("zahtev nije pronadjen",{status: 404});
            const organizer = new Organizer({
                user_id: request.user_id,
                name: request.name
            })
            await organizer.save();
            await OrganizerRequest.findByIdAndDelete(params.id)
            return new Response(JSON.stringify(request),{
                status: 200
            })
        }catch(err){
            return new Response("Greska pri prihvatanju zahteva",{status: 500})
        }
    }
}