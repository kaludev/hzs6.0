import Event from "@models/event";
import { connectToDB } from "@utils/database";
import { NextResponse } from 'next/server';

export const POST = async (req) => {
        try{
                await connectToDB();
                const data = await req.json();
                const resg = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                        data.address
                      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
                const jsong = await resg.json();
                if (jsong.status === 'OK') {
                        const location = jsong.results[0].geometry.location;
                        data.address = location.lat + "," + location.lng;
                        console.log(data);

                        const event = new Event(data);
                        await event.save();

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