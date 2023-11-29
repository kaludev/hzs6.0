import OrganizerRequest from "@models/OrganizerRequest";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const GET = async (req) => {
    const data = await getServerSession(authOptions);
    console.log(data);
    if(data.user.isSuperAdmin) {
        try{
            await connectToDB();
            const requests = await OrganizerRequest.find({})
            console.log(requests);
            return new Response(JSON.stringify(requests),{
                status: 200
            })
        }catch(err){
            return new Response("Failed to fetch prompts",{
                status: 500
            })
        }
    }else{
        return new Response("Nemate permisiju",{ok:false,status:500});
    }
    
}