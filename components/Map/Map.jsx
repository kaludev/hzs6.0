"use client"
import React, {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useSession } from 'next-auth/react';

const Map = () => {
    const [yourLocation, setYourLocation] = useState({});
    const [closestMarker, setClosestMarker] = useState(null);
    const [directions, setDirections] = useState(null);
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

    useEffect(() => {
      if(session?.user){
        findClosestMarker(yourLocation);
      }
    }, [session]);

    const containerStyle = {
      width: '1000px',
      height: '1000px',
    };

    const findClosestMarker = (userLocation) => {
        let closestDistance = Number.MAX_VALUE;
        let closestMarker = null;
  
        session?.user.events.forEach((e) => {
          const eventLocation = {
            lat: Number(e.address.split(',')[0]),
            lng: Number(e.address.split(',')[1]),
          };
          const distance = calculateDistance(userLocation, eventLocation);
  
          if (distance < closestDistance) {
            closestDistance = distance;
            closestMarker = eventLocation;
          }
        });
        setClosestMarker(closestMarker);
    };
  
    const calculateDistance = (pos1, pos2) => {
      const R = 6371; // Earth radius in kilometers
      const dLat = deg2rad(pos2.lat - pos1.lat);
      const dLng = deg2rad(pos2.lng - pos1.lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(pos1.lat)) *
          Math.cos(deg2rad(pos2.lat)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in kilometers
      return distance;
    };
  
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const handleDirections = () => {
      if (yourLocation && closestMarker) {
        const directionsService = new window.google.maps.DirectionsService();
  
        directionsService.route(
          {
            origin: new window.google.maps.LatLng(yourLocation.lat, yourLocation.lng),
            destination: new window.google.maps.LatLng(closestMarker.lat, closestMarker.lng),
            travelMode: 'DRIVING',
          },
          (result, status) => {
            if (status === 'OK') {
              setDirections(result);
            } else {
              console.error(`Directions request failed due to ${status}`);
            }
          }
        );
      }
    };

    return (
      
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={yourLocation} zoom={10}>
          
          {
            session?.user && (
              
              session?.user.events.map((e) => (
                  <Marker position={{lat: Number(e.address.split(',')[0]), lng: Number(e.address.split(',')[1])}} title={e.name + "\n" + e.description + "\n" + new Date(e.starts_at).toLocaleDateString() + " - " + new Date(e.ends_at).toLocaleDateString() + "\n" + new Date(e.starts_at).toLocaleTimeString() + " - " + new Date(e.ends_at).toLocaleTimeString()} />
              ))
            )  
              
          }
          {closestMarker && (
          <Marker position={closestMarker} title="Closest marker to your location"  />
          )}
          {yourLocation && (
          <Marker position={yourLocation} title="Your location"  />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
        <button onClick={handleDirections}>Show Route to Closest Marker</button>
      </LoadScript>
      
    );
}

export default Map;
