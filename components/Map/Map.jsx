"use client"
import React, {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useSession } from 'next-auth/react';

const Map = () => {
    const [yourLocation, setYourLocation] = useState({});
    const [location, setLocation] = useState({});
    const {data: session} = useSession();

    useEffect(() => {
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos);
            setYourLocation({lat: pos.coords.latitude, lng: pos.coords.longitude});
          }, (err) => {
            console.log(err);
          });
        }
    }, []);

    const containerStyle = {
      width: '1000px',
      height: '1000px',
    };

    return (
      
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={yourLocation} zoom={10}>
          
          {
            session?.user ? (
              session.user.events.map((e) => (
                  <Marker position={{lat: Number(e.address.split(',')[0]), lng: Number(e.address.split(',')[1])}} title={e.name} />
              ))
                
            ) : 
              location && (
                <Marker position={yourLocation} title={"Your Location"} />
              )
          }
        </GoogleMap>
      </LoadScript>
      
    );
}

export default Map;
