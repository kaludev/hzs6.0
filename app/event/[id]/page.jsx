"use client"
import EventCard from "@components/EventCardPage/EventCardPage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {toast} from 'react-toastify';

const Event = () => {
    const {id} = useParams();
    const [event, setEvent] = useState([]);
    console.log(id);

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

    const handleSubmit= async (id) => {
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
    };

    return (
        <>
            {
                event.length > 0 && (
                <EventCard
                eventId={event[0]._id}
                eventName={event[0].name}
                eventDesc={event[0].description}
                eventStartTime={event[0].starts_at}
                eventEndTime={event[0].ends_at}
                address={event[0].address}
                maxCapacity={event[0].capacity}
                likes={event[0].likes}
                applied={event[0].users_signed.length}
                eventPhoto={event[0].image[0]} 
                handleSubmit={handleSubmit}
                />
                )
            }
        </>
    )
}

export default Event;