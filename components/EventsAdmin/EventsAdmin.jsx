import EventCard from "@components/EventCard/EventCard"
import { useSession } from "next-auth/react"
import styles from './EventsAdmin.module.css'

const Events = ({data,handleSubmit,handleLeave,handleEdit,handleDelete,providers,signIn}) => {
  return (
    <section className={styles.cardsMainSection}>
          <section className={styles.cardsSection}>
            {
            data && data.length > 0 ? (
              data.map(event => (
                <EventCard
                  key={event._id}
                  eventName ={event.name} eventDesc={event.description} 
                  address={event.address} eventStartTime={new Date(event.starts_at)}
                  eventEndTime={new Date(event.ends_at)} applied={event.users_signed.length} 
                  maxCapacity = {event.capacity} likes={event.likes}
                  handleSubmit={handleSubmit && (() => handleSubmit(event._id))} providers={providers}
                  handleLeave={() => handleLeave(event._id)}
                  signIn={signIn} users_signed={event.users_signed}
                  handleEdit={handleEdit && (() => handleEdit(event._id))} handleDelete={handleDelete && (() => handleDelete(event._id))}
                  image={event.image[0]}
                />
            ))) : (
              <div className={styles.emptyArr}><span className={styles.colored}>Još uvek se niste prijavili za takmičenja.</span><br />Kako biste videli svoja takmičenja, pogledajte arenu i prijavite se</div>
            )
            }
          </section>
      </section>
  )
}

export default Events