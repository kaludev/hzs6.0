import { useEffect, useState } from "react";
import styles from "./EventCardPage.module.css"
import { FaRegHeart } from "react-icons/fa";
import { FaClock, FaMapMarkerAlt, FaHeart, FaCalendarAlt } from "react-icons/fa";

export default function EventCard({eventId, eventName, eventPhoto, eventDesc, address, eventStartTime, eventEndTime, 
    applied, maxCapacity, likes,handleSubmit}){
    
    const[hover, setHover] = useState();
    return(
        <section className={styles.cardsMainSection}>
            <section className={styles.cardsSection}>
                <div className={styles.cardEvent}>
                    <img className={styles.eventPhoto} src={eventPhoto} alt="Event Photo" />
                    <div className={styles.eventMain}>
                        <div className={styles.eventName}>{eventName}</div>
                        <div className={styles.eventDesc}>{eventDesc}</div>
                        <div className={styles.eventData}>
                            <div className={styles.eventPlaceData}>
                                <div className={styles.eventTime}><span className={styles.eventColored}><FaMapMarkerAlt /></span>{address}</div>
                                <div className={styles.eventTime}><span className={styles.eventColored}><FaCalendarAlt /></span> {new Date(eventStartTime).getDate() + "."+ (new Date(eventStartTime).getMonth()+1) +"." + new Date(eventStartTime).getFullYear() + "."} - {new Date(eventEndTime).getDate() + "."+ (new Date(eventEndTime).getMonth()+1) +"." + new Date(eventEndTime).getFullYear() + "."}</div>                 
                                <div className={styles.eventTime}><span className={styles.eventColored}><FaClock /></span> {new Date(eventStartTime).getHours()+ ":" + new Date(eventStartTime).getMinutes()} -  {new Date(eventEndTime).getHours()+ ":" + new Date(eventEndTime).getMinutes()}</div>
                            </div>
                            <div className={styles.eventParticipants}>{applied}/{maxCapacity}</div>
                        </div>
                        <div className={styles.eventButtons}>
                            {handleSubmit && <button onClick={() => {handleSubmit(eventId)}} className={`${styles.primaryButton} primaryButton`}>Prijavi se</button>}
                            <div className={styles.eventLikes}>
                                <button className={`${styles.secondaryButton} secondaryButton`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>{ hover ? <FaHeart /> : <FaRegHeart />}</button>
                                <div className={styles.eventLikesNum}>{likes}</div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        </section>
        
    )
}