import EventCard from "@components/EventCard/EventCard"
import { useSession } from "next-auth/react"
import emptyStyles from './Events.module.css'
import Link from "next/link"

const Events = ({data,handleSubmit,handleLeave,handleEdit,handleDelete,providers,signIn}) => {
  return (
    data && data.length > 0 ? (
       data.map(event => (
        <Link href={`/event/${event._id}`}>
          <EventCard
            key={event._id}
            eventName ={event.name} eventDesc={event.description} 
            address={event.address} eventStartTime={new Date(event.starts_at)}
            eventEndTime={new Date(event.ends_at)} applied={event.users_signed.length} 
            maxCapacity = {event.capacity} likes={event.likes}
            handleSubmit={() => handleSubmit(event._id)} providers={providers}
            handleLeave={() => handleLeave(event._id)}
            signIn={signIn} users_signed={event.users_signed}
            handleEdit={handleEdit} handleDelete={handleDelete}
          />
        </Link>
    ))) : (
      <div className={emptyStyles.emptyArr}><span className={emptyStyles.colored}>Još uvek se niste prijavili za takmičenja.</span><br />Kako biste videli svoja takmičenja, pogledajte arenu i prijavite se</div>
    )
  )
}

export default Events