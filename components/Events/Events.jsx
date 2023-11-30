import EventCard from "@components/EventCard/EventCard"

const Events = ({data,handleSubmit,handleEdit,handleDelete}) => {
  return (
    data && data.map(event => (
        <EventCard
        key={event._id}
        eventName ={event.name} eventDesc={event.description} 
        address={event.address} eventStartTime={new Date(event.starts_at)}
         eventEndTime={new Date(event.ends_at)} applied={event.users_signed.length} 
          maxCapacity = {event.capacity} likes={event.likes}
         />
    ))
  )
}

export default Events