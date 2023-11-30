import { connectToDB } from "@utils/database";

import Organizer from "@models/organizer";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Event from "@models/event";
//GET post by id
export const GET = async (req,{params}) => {
    const data = await getServerSession(authOptions);
    console.log(params.id);
    if(data.user) {
        try{
            await connectToDB();
            const request = await Event.findByIdAndUpdate(params.id,{
                $addToSet: {users_signed : data.user._id}
            });
            console.log(request);
            return new Response(JSON.stringify(request),{
                status: 200
            })
        }catch(err){
            return new Response("Greska pri prihvatanju zahteva za ulazak",{status: 500})
        }
    }else{
        return new Response("Morate biti prijavljeni",{ok:false,status:500});
    }
}