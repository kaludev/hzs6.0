"use client"

import EventCard from '@components/EventCard/EventCard';
import styles from '@components/EventCard/EventCard.module.css'
const EventsPage = () => {

    return (
        <section className={styles.cardsSection}>
            <EventCard />
        </section>
    )
}

export default EventsPage