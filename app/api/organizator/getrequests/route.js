import OrganizerRequest from "@models/OrganizerRequest";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const GET = async (req) => {
    const data = await getServerSession(authOptions);
    console.log(data);
    if(data.isSuperAdmin) {
        try{
            await connectToDB();
            const prompts = await OrganizerRequest.find({})
    
            return new Response(JSON.stringify(prompts),{
                status: 200
            })
        }catch(err){
            return new Response("Failed to fetch prompts",{
                status: 500
            })
        }
    }
    
}