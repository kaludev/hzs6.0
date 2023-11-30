import EventCard from "@components/EventCard/EventCard"
import { useSession } from "next-auth/react"

const Events = ({data,handleSubmit,handleLeave,handleEdit,handleDelete,providers,signIn}) => {
  return (
    data && data.map(event => (
      <EventCard
        key={event._id}
        id={event._id}
        eventName ={event.name} eventDesc={event.description} 
        address={event.address} eventStartTime={new Date(event.starts_at)}
         eventEndTime={new Date(event.ends_at)} applied={event.users_signed.length} 
          maxCapacity = {event.capacity} likes={event.likes}
          handleSubmit={() => handleSubmit(event._id)} providers={providers}
          handleLeave={() => handleLeave(event._id)}
          signIn={signIn} users_signed={event.users_signed}
          handleEdit={handleEdit} handleDelete={handleDelete}
         />
    ))
  )
}

export default Events