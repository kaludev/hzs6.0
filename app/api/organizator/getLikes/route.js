import { connectToDB } from "@utils/database";

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Organizer from "@models/organizer";
//GET post by id
export const GET = async (req) => {
    try{
        await connectToDB();
        const requests = await Organizer.find({}).populate('events').populate('user_id');
        console.log(requests);
        const likes= [];
        requests.forEach(request => {
            let likesOne = 0;
            request.events.forEach((event) =>{
                likesOne+= event.users_liked.length;
            })
            console.log(likesOne);
            likes.push({user:request.name,email:request.email,tel:request.tel,events: request.events.length,likes: likesOne});
        })
        const sortedLikes = likes.sort((a,b) =>{return b.likes - a.likes > 0 ? b.likes - a.likes : b.events- a.events })
        console.log(likes);
        return new Response(JSON.stringify(sortedLikes),{
            status: 200
        })
    }catch(err){
        return new Response("Greska pri prikazivanju dogadjaja",{status: 500})
    }
}