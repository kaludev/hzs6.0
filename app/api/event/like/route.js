import Event from "@models/event";
import Organizer from "@models/organizer";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { NextResponse } from 'next/server';

export const POST = async (req) => {
        try{
                const user = await getServerSession(authOptions);
                await connectToDB();
                const data = await req.json();
                const updated_event = await Event.findByIdAndUpdate(data.id, {
                        $addToSet: {users_liked : user.user._id}
                }, {new: true});
                console.log("updated event" + updated_event);
                return NextResponse.json({ ok: true, data: updated_event }, { status: 200 })
        }
        catch(err){
                console.log(err);
                return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
}