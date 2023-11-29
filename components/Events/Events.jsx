import EventCard from "@components/EventCard/EventCard"

const Events = (data) => {


  return (
    data.map(event => (
        <EventCard/>
    ))
  )
}

export default Events