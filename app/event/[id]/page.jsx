"use client"
import EventCard from "@components/EventCardPage/EventCardPage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {toast} from 'react-toastify';
import { signIn, useSession, getProviders } from "next-auth/react";

const Event = () => {
    const {id} = useParams();
    const [event, setEvent] = useState([]);
    const [ providers, setProviders ] = useState(null);
    console.log(id);
    const {data: session} = useSession();

    useEffect(() => {
        const fetchData = async () => {
            fetch(`/api/event/getEvent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id})
            }).then((res) => res.json()).then((data) => {
                if(data.ok)
                console.log(data);
                setEvent(data.event);
            }).catch((err) => console.log(err));
        }
        fetchData();
    }, []);

    useEffect(() => {
        const setUpProviders = async () => {
          const res = await getProviders();
          setProviders(res);
        };
        setUpProviders();
      }, []);

    const handleSubmit= async (id) => {
        if(session?.user){
            console.log(id);
            try{
                const res = await fetch(`/api/event/join/${id}`);
                if(!res.ok){
                    throw new Error(res.text);
                }
                toast.success("Uspesno prihvacen zahtev");
                return true;
            }catch(e){
                toast.error(e.message);
                return false;
            }
        }
        else{
            Object.values(providers).map((provider) => {
               signIn(provider.id);
        })
        }
    };

    const handleLike = async (id) => {
        if(session?.user){
            const res = await fetch("/api/event/like", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id})
            });
            const json = await res.json();
            if(json.ok){
                console.log(json.data);
            }
        }
        else{
            Object.values(providers).map((provider) => {
                signIn(provider.id);
         })
        }
    }

    const handleUnlike = async (id) => {
        if(session?.user){
            const res = await fetch("/api/event/unlike", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id})
            });
            const json = await res.json();
            if(json.ok){
                console.log(json.data);
            }
        }
        else{
            Object.values(providers).map((provider) => {
                signIn(provider.id);
         })
        }
    }

    return (
        <>
            {
                event.length > 0 && (
                <EventCard
                user={session?.user}
                eventId={event[0]._id}
                eventName={event[0].name}
                eventDesc={event[0].description}
                eventStartTime={event[0].starts_at}
                eventEndTime={event[0].ends_at}
                address={event[0].address}
                maxCapacity={event[0].capacity}
                likes={event[0].users_liked}
                applied={event[0].users_signed.length}
                eventPhoto={event[0].image[0]} 
                handleSubmit={handleSubmit}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
                />
                )
            }
        </>
    )
}
export default Event;