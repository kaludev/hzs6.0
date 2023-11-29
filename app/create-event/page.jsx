"use client"

import { useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import EventForm from '@components/EventForm/EventForm'



const createEvent = () => {
  const [submitting, setSubmitting] = useState(false);
  const [event, setEvent] = useState({
    ime: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
    adresa: {
        value: "",
        focus: false,
        error: false,
        errorMsg: ""
    },
    lokacija: {
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
        value: "",
        focus: false,
        error: false,
        errorMsg: ""
    },
    level: {
        value: "",
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
  const createPrompt = async (e) => {
    e.preventDefault();
    
    setSubmitting(true);
    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        })
      })
      if(res.ok){
        router.push('/')
      }
    }catch (e) {
      console.log(e);
    }finally {
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
    />
  )
}

export default createEvent