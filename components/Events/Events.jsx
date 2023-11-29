import EventCard from "@components/EventCard/EventCard"

const Events = (data) => {
  return (
    data.map(event => (
        <EventCard
        eventName ={event.name} eventDesc={event.description} 
        address={event.address} eventStartTime={event.starts_at}
         eventEndTime={event.ends_at} applied={event.users_signed.length} 
          maxCapacity = {event.capacity} likes={event.likes}
         handleEdit={() => {
            router.push(`/update-prompt?id=${event._id}`)
          }}

         />
    ))
  )
}

export default Events