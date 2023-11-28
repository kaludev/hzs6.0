import Event from "@models/event";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
        const res = new Response();
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
                } else {
                        console.log('Geocoding failed');
                }
                console.log(data);

                const event = new Event(data);
                await event.save();

                res.json({ success: true, data: event })
        }
        catch(err){
                console.log(err);
        }
}