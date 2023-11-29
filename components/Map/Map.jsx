"use client"
import {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useSession } from 'next-auth/react';
import styles from "../Contact/Contact.module.css"
import { buttonContext } from '@components/Contact/Contact';

const Map = ({buttonState, mode}) => {
    const [yourLocation, setYourLocation] = useState({});
    const [closestMarker, setClosestMarker] = useState(null);
    const [directions, setDirections] = useState(null);
    const [closestEvent, setClosestEvent] = useState();
    const [ifNextEvents, setIfNextEvents] = useState();
    const {data: session} = useSession();

    useEffect(() => {
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos);
            console.log("buttonstate", buttonState);
            setYourLocation({lat: pos.coords.latitude, lng: pos.coords.longitude});          
          }, (err) => {
            console.log(err);
          });
        }
        
    }, []);

    useEffect(() => {
      if(session?.user){
        console.log(session.events);
        findClosestMarker(yourLocation, mode);
      }
    }, [session]);

    const containerStyle = {
      width: '100%',
      height: '100%',
    };

    const findClosestMarker = (userLocation, mode) => {
        let closestDistance = Number.MAX_VALUE;
        let closestMarker = null;
        let closestEvent = null;
        let bool;
        if(mode == "user"){
          session?.user.events.forEach((e) => {
            if(new Date(e.starts_at) > Date.now()){
              bool = true;
              const eventLocation = {
                lat: Number(e.address.split(',')[0]),
                lng: Number(e.address.split(',')[1]),
              };
              const distance = calculateDistance(userLocation, eventLocation);
      
              if (distance < closestDistance) {
                closestDistance = distance;
                closestMarker = eventLocation;
                closestEvent = e;
              }
            }
            else{
              bool = false;
            }
          });
        }
        else if(mode == "all"){
          session?.events.forEach((e) => {
            if(new Date(e.starts_at) > Date.now()){
              bool = true;
              const eventLocation = {
                lat: Number(e.address.split(',')[0]),
                lng: Number(e.address.split(',')[1]),
              };
              const distance = calculateDistance(userLocation, eventLocation);
      
              if (distance < closestDistance) {
                closestDistance = distance;
                closestMarker = eventLocation;
                closestEvent = e;
              }
            }
            else{
              bool = false;
            }
          });
        }
        setClosestMarker(closestMarker);
        setClosestEvent(closestEvent);
        setIfNextEvents(bool);
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

    const returnClosest = () => {
      handleDirections();
      if(directions && closestMarker){
        return true;
      }
    }

    return (
      
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={yourLocation} zoom={2}>
          
          {

            mode == "user" && (
              
                session?.user && (
              <>
                {buttonState.showNext && (
                session?.user.events.map((e) => (
                  new Date(e.starts_at) > Date.now() ? (
                    <Marker
                      key={e.id}
                      icon={{url: `../../images/logoBlack.png`, scaledSize: new window.google.maps.Size(50, 30)}}
                      position={{ lat: Number(e.address.split(',')[0]), lng: Number(e.address.split(',')[1]) }}
                      title={e.name + "\n" + e.description + "\n" + new Date(e.starts_at).toLocaleDateString() + " - " + new Date(e.ends_at).toLocaleDateString() + "\n" + new Date(e.starts_at).toLocaleTimeString() + " - " + new Date(e.ends_at).toLocaleTimeString()}
                    />
                  ) : console.log("nema predstojecih")
                ))
                
                )
                }
                {
                  buttonState.showClosest && returnClosest() && (
                    ifNextEvents ? (
                      <>
                        <Marker position={closestMarker} title={closestEvent.name + "\n" + closestEvent.description + "\n" + new Date(closestEvent.starts_at).toLocaleDateString() + " - " + new Date(closestEvent.ends_at).toLocaleDateString() + "\n" + new Date(closestEvent.starts_at).toLocaleTimeString() + " - " + new Date(closestEvent.ends_at).toLocaleTimeString()}  />
                        <DirectionsRenderer directions={directions} />
                      </>
                    ) : console.log("nema predstojecih ruta")
                  )
                }
                {
                  buttonState.showPast && (
                    session?.user.events.map((e) => (
                      new Date(e.ends_at) < Date.now() ? (
                        <Marker
                          key={e.id}
                          icon={{url: `../../images/logoBlack.png`, scaledSize: new window.google.maps.Size(50, 30)}}
                          position={{ lat: Number(e.address.split(',')[0]), lng: Number(e.address.split(',')[1]) }}
                          title={e.name + "\n" + e.description + "\n" + new Date(e.starts_at).toLocaleDateString() + " - " + new Date(e.ends_at).toLocaleDateString() + "\n" + new Date(e.starts_at).toLocaleTimeString() + " - " + new Date(e.ends_at).toLocaleTimeString()}
                        />
                      ) : console.log("nema proslih")
                    ))
                    
                  )
                }
              </>
            )
              
            )
            }
            {
              mode == "all" && (
              session?.events && (
                <>
                  {buttonState.showNext && (
                  session?.events.map((e) => (
                    new Date(e.starts_at) > Date.now() ? (
                      <Marker
                        key={e.id}
                        icon={{url: `../../images/logoBlack.png`, scaledSize: new window.google.maps.Size(50, 30)}}
                        position={{ lat: Number(e.address.split(',')[0]), lng: Number(e.address.split(',')[1]) }}
                        title={e.name + "\n" + e.description + "\n" + new Date(e.starts_at).toLocaleDateString() + " - " + new Date(e.ends_at).toLocaleDateString() + "\n" + new Date(e.starts_at).toLocaleTimeString() + " - " + new Date(e.ends_at).toLocaleTimeString()}
                      />
                    ) : console.log("nema predstojecih")
                  ))
                  
                  )
                  }
                  {
                    buttonState.showClosest && returnClosest() && (
                      ifNextEvents ? (
                        <>
                          <Marker position={closestMarker} title={closestEvent.name + "\n" + closestEvent.description + "\n" + new Date(closestEvent.starts_at).toLocaleDateString() + " - " + new Date(closestEvent.ends_at).toLocaleDateString() + "\n" + new Date(closestEvent.starts_at).toLocaleTimeString() + " - " + new Date(closestEvent.ends_at).toLocaleTimeString()}  />
                          <DirectionsRenderer directions={directions} />
                        </>
                      ) : console.log("nema predstojecih ruta")
                    )
                  }
                  {
                    buttonState.showPast && (
                      session?.events.map((e) => (
                        new Date(e.ends_at) < Date.now() ? (
                          <Marker
                            key={e.id}
                            icon={{url: `../../images/logoBlack.png`, scaledSize: new window.google.maps.Size(50, 30)}}
                            position={{ lat: Number(e.address.split(',')[0]), lng: Number(e.address.split(',')[1]) }}
                            title={e.name + "\n" + e.description + "\n" + new Date(e.starts_at).toLocaleDateString() + " - " + new Date(e.ends_at).toLocaleDateString() + "\n" + new Date(e.starts_at).toLocaleTimeString() + " - " + new Date(e.ends_at).toLocaleTimeString()}
                          />
                        ) : console.log("nema proslih")
                      ))
                      
                    )
                  }
                </>
              )
              
            )

            }

          
          {yourLocation && (
          <Marker position={yourLocation} title="Your location"  />
          )}
        </GoogleMap>
      </LoadScript>
      
    );
}

export default Map;
