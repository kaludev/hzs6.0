import { useEffect, useState } from "react";
import styles from "./EventCardPage.module.css"
import { FaRegHeart } from "react-icons/fa";
import { FaClock, FaMapMarkerAlt, FaHeart, FaCalendarAlt } from "react-icons/fa";

export default function EventCard({eventName, eventDesc, address, eventStartTime, eventEndTime, 
    applied, maxCapacity, likes,handleSubmit, handleEdit, handleDelete}){
    
    const[hover, setHover] = useState();
    return(
        <section className={styles.cardsMainSection}>
            <section className={styles.cardsSection}>
                <div className={styles.cardEvent}>
                    <img className={styles.eventPhoto} src="./images/hero.jpg" alt="Event Photo" />
                    <div className={styles.eventMain}>
                        <div className={styles.eventName}>{eventName} IME TAKMICENJA OBRISATI POSLE</div>
                        <div className={styles.eventDesc}>{eventDesc} OPIS TAKMICENJA OBRISATI POSLE OPIS TAKMICENJA OBRISATI POSLE OPIS TAKMICENJA OBRISATI POSLE OPIS TAKMICENJA OBRISATI POSLE OPIS TAKMICENJA OBRISATI POSLE OPIS TAKMICENJA OBRISATI POSLE OPIS TAKMICENJA OBRISATI POSLE OPIS TAKMICENJA OBRISATI POSLE OPIS TAKMICENJA OBRISATI POSLE</div>
                        <div className={styles.eventData}>
                            <div className={styles.eventPlaceData}>
                                <div className={styles.eventTime}><span className={styles.eventColored}><FaMapMarkerAlt /></span>{address}</div>
                                <div className={styles.eventTime}><span className={styles.eventColored}><FaCalendarAlt /></span> {new Date(eventStartTime).getDate() + "."+ (new Date(eventStartTime).getMonth()+1) +"." + new Date(eventStartTime).getFullYear() + "."} - {new Date(eventEndTime).getDate() + "."+ (new Date(eventEndTime).getMonth()+1) +"." + new Date(eventEndTime).getFullYear() + "."}</div>                 
                                <div className={styles.eventTime}><span className={styles.eventColored}><FaClock /></span> {new Date(eventStartTime).getHours()+ ":" + new Date(eventStartTime).getMinutes()} -  {new Date(eventEndTime).getHours()+ ":" + new Date(eventEndTime).getMinutes()}</div>
                            </div>
                            <div className={styles.eventParticipants}>{applied}/{maxCapacity}</div>
                        </div>
                        <div className={styles.eventButtons}>
                            {handleSubmit && <button onClick={handleSubmit()} className={`${styles.primaryButton} primaryButton`}>Prijavi se</button>}
                            {handleEdit && <button onClick={handleEdit()} className={`${styles.primaryButton} primaryButton`}>Izmeni</button>}
                            {handleDelete && <button onClick={handleDelete()} className={`${styles.primaryButton} primaryButton`}>Obrisi</button>}
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