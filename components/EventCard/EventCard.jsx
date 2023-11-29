import { useState } from "react";
import styles from "./EventCard.module.css"
import Link from "next/link"
import { FaRegHeart } from "react-icons/fa";
import { FaClock, FaMapMarkerAlt, FaHeart } from "react-icons/fa";

export default function AboutUsPage(eventName, eventDesc, address, eventStartTime, eventEndTime, 
    applied, maxCapacity, likes,handleSubmit, handleEdit, ){

    const[hover, setHover] = useState();

    return(
        <div className={styles.cardEvent}>
            <img className={styles.eventPhoto} src="./images/hero.jpg" alt="Event Photo" />
            <div className={styles.eventMain}>
                <div className={styles.eventName}>{eventName}</div>
                <div className={styles.eventDesc}>{eventDesc}</div>
                <div className={styles.eventData}>
                    <div className={styles.eventPlaceData}>
                        <div className={styles.eventLocation}><span className={styles.eventColored}><FaMapMarkerAlt /></span>{address}</div>
                        <div className={styles.eventTime}><span className={styles.eventColored}><FaClock /></span> {eventStartTime.getDate() + ". "+ (eventStartTime.getMonth()+1) +". " + eventStartTime.getFullYear() + "."} - {eventEndTime.getDate() + ". "+ (eventEndTime.getMonth()+1) +". " + eventEndTime.getFullYear() + "."}</div>                 
                        <div className={styles.eventTime}><span className={styles.eventColored}><FaClock /></span> {eventStartTime.getHours()+ ":" + eventStartTime.getMinutes()} -  {eventEndTime.getHours()+ ":" + eventEndTime.getMinutes()}</div>
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
        
    )
}