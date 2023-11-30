import Event from "@models/event";
import { connectToDB } from "@utils/database";
import { NextResponse } from 'next/server';

export const POST = async (req) => {
        try{
                await connectToDB();
                const {id} = await req.json();
                console.log("poslat id " + id);
                const event = await Event.find({_id: id});
                console.log(event);
                return NextResponse.json({ ok: true, event: event }, { status: 200 })
                
        }
        catch(err){
                console.log(err);
                return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
}