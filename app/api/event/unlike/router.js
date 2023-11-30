import Event from "@models/event";
import Organizer from "@models/organizer";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { NextResponse } from 'next/server';

export const POST = async (req) => {
        const user = await getServerSession(authOptions);
        console.log(user);
        try{
                await connectToDB();
                const data = await req.json();
                const event = await Event.findOne({_id: data.id});
                const updated_arr = event.users_liked.filter(x => x != user._id);
                event.users_liked = updated_arr;
                const updated_event = await event.save();
                return NextResponse.json({ ok: true, data: updated_event }, { status: 200 })
        }
        catch(err){
                console.log(err);
                return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
}