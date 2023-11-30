"use client"

import { useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import EventForm from '@components/EventForm/EventForm'
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';


const editEvent = () => {
  const [submitting, setSubmitting] = useState(false);
  const params = useSearchParams();
  const eventId = params.get('id');
  const [event, setEvent] = useState({
    ime: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
    address: {
        value: "",
        focus: false,
        error: false,
        errorMsg: ""
    },
    vremeOd: {
        value: new Date(new Date().getTime()-(60000)),
        focus: true,
        error: false,
        errorMsg: ""
    },
    vremeDo: {
        value: new Date(),
        focus: true,
        error: false,
        errorMsg: ""
    },
    max:{
        value: "",
        focus: false,
        error: false,
        errorMsg: ""
    },
    eventType: {
        value: 0, 
        focus: false,
        error: false,
        errorMsg: ""
    },
    level: {
        value: 0,
        focus: false,
        error: false,
        errorMsg: ""
    },
    poruka: {
        value: "",
        focus: false,
        error: false,
        errorMsg: ""
    },

  })
  const router = useRouter();
  const {data:session} = useSession();
  useEffect(() =>{
    const getEventDetails = async () => {
        const response = await fetch(`/api/event/${eventId}`);
        const data = await response.json();
        const copy = {...event}
        copy.ime.value = data.name;
        copy.ime.focus = true;
        copy.address.value = data.address;
        copy.address.focus = true;
        copy.max.value = data.capacity;
        copy.max.focus = true;
        copy.vremeOd.value = new Date(data.starts_at);
        copy.vremeDo.value = new Date(data.ends_at);
        copy.poruka.value = data.description;
        copy.poruka.focus = true;
        copy.eventType.value = data.eventType;
        copy.level.value = data.level;
        console.log(data);
        setEvent(copy);
    }
    if(eventId) getEventDetails();
  },[eventId]);
  const submitBody = async (body) => {
    setSubmitting(true);
    console.log(body);
    try{
      const res = await fetch(`/api/event/edit/${eventId}`,{
          method : "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
      })

      if(!res.ok){
        throw new Error(await res.json());
      }
      toast.success("Uspesno dodat dogadjaj",{
        position: toast.POSITION.TOP_RIGHT
      });
    }catch(e){
      toast.error("Greska: " + e.message);
    }finally{
      setSubmitting(false);
    }
  }
  return (
    <EventForm
    type = "Izmenite"
    event = { event}
    setEvent={setEvent}
    submitting={submitting}
    setSubmitting={setSubmitting}
    submitBody={submitBody}
    />
  )
}

export default editEvent