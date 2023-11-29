import { getServerSession } from "next-auth"
import Organizer from "@models/organizer";
import User from "@models/user";
import OrganizerRequest from "@models/OrganizerRequest";
import { connectToDB } from "@utils/database";


export const POST= async (req) => {
    try{
        await connectToDB();
        const { ime,email,nazivKluba,emailKluba,telefon,poruka} = await req.json();
        const data = await getServerSession();
        let isOrganizer = await Organizer.findOne({
            email: data.user.email
        })
        console.log(isOrganizer)
        if (isOrganizer != undefined) {
            return new Response("Vec ste organizator dogadjaja!", { status:400 })
        }
        const user = await User.findOne({
            email: data.user.email
        })
        if(user.isSuperAdmin){
            return new Response("Vec ste super administrator!", { status:400 })
        }
        const existingReq = await OrganizerRequest.findOne({
            user_id: user._id
        })
        if(existingReq){
            return new Response("Vec ste poslali zahtev da budete organizator dogadjaja!", { status:400})
        }else{
            const request = await new OrganizerRequest({
                user_id: user._id,
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