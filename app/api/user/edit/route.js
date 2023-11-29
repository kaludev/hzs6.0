import { getServerSession } from "next-auth"
import User from "@models/user";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { connectToDB } from "@utils/database";


export const POST= async (req) => {
    try{
        await connectToDB();
        const { name,username} = await req.json();
        const data = await getServerSession(authOptions);
        console.log(data);
        const user = await User.findOneAndUpdate({
            email: data.user.email
        },{
            name:name,
            username:username
        },{
            new: true
        })
        console.log(user);
        return new Response(JSON.stringify(user), {status: 201});
    }catch(e){
        console.log(e);
        return new Response("Greska pri editovanju korisnika", {status: 500});
    }
}