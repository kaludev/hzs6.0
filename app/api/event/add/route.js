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
                /*const formData = await req.formData();

                const file = formData.get("file");*/
                const data = await req.json();
                const resg = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                        data.address
                      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
                const jsong = await resg.json();
                if (jsong.status === 'OK') {
                        const location = jsong.results[0].geometry.location;
                        data.location = location;
                        console.log(data);

                        const event = new Event(data);
                        await event.save();
                        console.log(event._id);
                        
                        const organizer = await Organizer.findOneAndUpdate({ user_id: user.user._id},{
                                $addToSet:{ events : event._id}
                        })
                        console.log(organizer);
                        console.log(await Organizer.findOne({ user_id: user.user._id}));
                        return NextResponse.json({ ok: true, data: data }, { status: 200 })
                } else {
                        console.log('Geocoding failed');
                        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
                }
                
        }
        catch(err){
                console.log(err);
                return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
}