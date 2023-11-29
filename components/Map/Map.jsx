"use client"
import {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useSession } from 'next-auth/react';

const Map = () => {
    const [location, setLocation] = useState({});
    const [yourAddress, setYourAddress] = useState();
    const {data: session} = useSession();

    useEffect(() => {
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos);
            setLocation({lat: pos.coords.latitude, lng: pos.coords.longitude});
            fetchAddress(pos.coords.latitude, pos.coords.longitude);
          }, (err) => {
            console.log(err);
          });
        }
    }, []);

    const fetchAddress = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
  
        if (data.results && data.results.length > 0) {
          setYourAddress(data.results[0].formatted_address);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    const fetchCoordinates = async (address) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
  
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setLocation({ lat, lng });
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    const containerStyle = {
      width: '1000px',
      height: '1000px',
    };

    return (
      
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={10}>
          
          {
            session?.user ? (
                session?.user.events.map(async (e) => {
                  await fetchCoordinates(e.address);
                  return <Marker position={location} title={e.address} />
                })
                
            ) : 
              location && (
                <Marker position={location} title={yourAddress} />
              )
          }
        </GoogleMap>
      </LoadScript>
      
    );
}

export default Map;
