"use client"
import React, {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useSession } from 'next-auth/react';

const Map = () => {
    const [location, setLocation] = useState({});
    const {data: session} = useSession();

    useEffect(() => {
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos);
            setLocation({lat: pos.coords.latitude, lng: pos.coords.longitude});
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
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={10}>
          {location && (
            <Marker position={location} title="Your Location" />
          )}
          {
            session?.user ? (
                <></>

            ) : (
              <></>
            )
          }
        </GoogleMap>
      </LoadScript>
      
    );
}

export default Map;
