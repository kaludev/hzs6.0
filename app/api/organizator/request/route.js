import { getServerSession } from "next-auth"
import Organizer from "@models/organizer";
import User from "@models/user";
import OrganizerRequest from "@models/OrganizerRequest";
import { connectToDB } from "@utils/database";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export const POST= async (req) => {
    try{
        await connectToDB();
        const { ime,email,nazivKluba,emailKluba,telefon,poruka} = await req.json();
        const data = await getServerSession(authOptions);
        console.log(data);
        if (data.user.isOrganizer) {
            return new Response("Vec ste organizator dogadjaja!", { status:400 })
        }
        if(data.user.isSuperAdmin){
            return new Response("Vec ste super administrator!", { status:400 })
        }
        if(data.user.requestedOrganizer){
            return new Response("Vec ste poslali zahtev da budete organizator dogadjaja!", { status:400})
        }else{
            const request = await new OrganizerRequest({
                user_id: data.user._id,
                name: ime,
                email: email,
                club_name: nazivKluba,
                club_email: emailKluba,
                phone: telefon,
                reason: poruka
            });
            console.log(request);
            await request.save();

            return new Response(JSON.stringify(request), {status: 201});
        }
    }catch(e){
        console.log(e);
        return new Response("Greska pri kreiranju zahteva", {status: 500});
    }
}