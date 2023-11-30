import Event from "@models/event";
import Organizer from "@models/organizer";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { NextResponse } from 'next/server';

export const POST = async (req,{params}) => {
        const user = await getServerSession(authOptions);
        console.log(user);
        try{
                await connectToDB();
                await connectToDB();
                const formData = await req.formData();
                console.log(formData.get('name'));
                const file = await formData.get("file");
                await console.log( file);

                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const blob = await put(formData.get('name')+'.jpg', buffer, {
                        access: 'public',
                      });
                console.log(blob);
                const data = {
                        name: formData.get('name'),
                        address: formData.get('address'), 
                        starts_at: formData.get('starts_at'),
                        ends_at: formData.get('ends_at'),
                        eventType: formData.get('eventType'),
                        level: formData.get('level'),
                        capacity: formData.get('capacity'),
                        description: formData.get('description'),
                        image: [blob.url]
                }
                const resg = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                        data.address
                      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
                const jsong = await resg.json();
                if (jsong.status === 'OK') {
                        const location = jsong.results[0].geometry.location;
                        data.location = location;
                        console.log(data);
                        const event = await Event.findByIdAndUpdate(params.id, data);
                        console.log(event._id);
                        return NextResponse.json({ ok: true, data: event }, { status: 200 })
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