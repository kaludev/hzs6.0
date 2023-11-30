"use client"

import { useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import EventForm from '@components/EventForm/EventForm'
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';


const createEvent = () => {
  const [submitting, setSubmitting] = useState(false);
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
    file:{
        value: null,
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
  const submitBody = async (body) => {
    
    setSubmitting(true);
    console.log(body);
    const formData = new FormData();

  
  formData.append('file', event.file.value);
  formData.append('name', body.name);
  formData.append('address', body.address);
  formData.append('starts_at', body.starts_at);
  formData.append('ends_at', body.ends_at);
  formData.append('eventType', body.eventType);
  formData.append('level', body.level);
  formData.append('capacity', body.capacity);
  formData.append('description', body.description);

  console.log(formData.values());
  try{
      const res = await fetch('/api/event/add',{
          method : "POST",
          body: formData
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
    type = "Napravite"
    event = { event}
    setEvent={setEvent}
    submitting={submitting}
    setSubmitting={setSubmitting}
    submitBody={submitBody}
    />
  )
}

export default createEvent