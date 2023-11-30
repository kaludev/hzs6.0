import EventCard from "@components/EventCard/EventCard"
import { useSession } from "next-auth/react"
import emptyStyles from './Events.module.css'
import Link from "next/link"

const Events = ({data,handleSubmit,handleLeave,handleEdit,handleDelete,providers,signIn,handleLike,handleDislike}) => {
 
  const handleLike = async (id) => {
    if(user){
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
    if(user){
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
    data && data.length > 0 ? (
       data.map(event => (
        
          <EventCard
            user={user}
            key={event._id}
            eventId={event._id}
            eventName ={event.name} eventDesc={event.description} 
            address={event.address} eventStartTime={new Date(event.starts_at)}
            eventEndTime={new Date(event.ends_at)} applied={event.users_signed.length} 
            maxCapacity = {event.capacity}
            likes={event.users_liked}
            handleSubmit={() => handleSubmit(event._id)} providers={providers}
            handleLeave={() => handleLeave(event._id)}
            signIn={signIn} users_signed={event.users_signed}
            handleEdit={handleEdit} handleDelete={handleDelete}
            image={event?.image[0]}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
          />
    ))) : (
      <div className={emptyStyles.emptyArr}><span className={emptyStyles.colored}>Još uvek se niste prijavili za takmičenja.</span><br />Kako biste videli svoja takmičenja, pogledajte arenu i prijavite se</div>
    )
  )
}

export default Events