"use client"

import EventCard from '@components/EventCard/EventCard';
import styles from '@components/EventCard/EventCard.module.css'
import EventCardList from '@components/EventCardList/EventCardList';
const EventsPage = () => {

    return (
        <section className={styles.cardsMainSection}>
            <section className={styles.cardsSection}>
                <EventCardList mode = "user"/>
            </section>
        </section>
    )
}

export default EventsPage