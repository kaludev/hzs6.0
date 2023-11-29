"use client"

import EventCard from '@components/EventCard/EventCard';
import styles from '@components/EventCard/EventCard.module.css'
const EventsPage = () => {

    return (
        <section className={styles.cardsMainSection}>
            <section className={styles.cardsSection}>
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
            </section>
        </section>
    )
}

export default EventsPage