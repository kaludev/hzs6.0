import Event from "@models/event";
import Organizer from "@models/organizer";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { NextResponse } from 'next/server';

export const POST = async (req) => {
        const user = await getServerSession(authOptions);
        console.log("user iz like");
        console.log(user);
        try{
                await connectToDB();
                const data = await req.json();
                const event = await Event.findOne({_id: data.id});
                console.log("event iz like ispod");
                console.log(event);
                const updated_array = [...event.users_liked, user._id];
                console.log(updated_array);
                const updated_event = await Event.findOneAndUpdate({id: data._id}, {users_liked: updated_array}, {new: true});
                console.log("updated event" + updated_event);
                return NextResponse.json({ ok: true, data: updated_event }, { status: 200 })
        }
        catch(err){
                console.log(err);
                return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
}