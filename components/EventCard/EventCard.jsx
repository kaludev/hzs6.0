import { useEffect, useState } from "react";
import styles from "./EventCard.module.css"
import { FaRegHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { FaClock, FaMapMarkerAlt, FaHeart, FaCalendarAlt } from "react-icons/fa";

export default function EventCard({eventId, eventName, eventDesc, address,
     eventStartTime, eventEndTime, applied, maxCapacity, likes,handleSubmit,
     handleEdit,handleLeave, handleDelete,providers, signIn,users_signed,image}){
    const {data:session} = useSession()
    const [prijavljen, setPrijavljen] = useState();
    const [applieds, setApplieds] = useState();
    const[hover, setHover] = useState();
    useEffect(() => {
        setApplieds(users_signed.length)
        setPrijavljen(users_signed?.includes(session?.user._id))
    },[session]);
    return(
        <div className={styles.cardEvent}>
            <Link href={`/event/${eventId}`}><img className={styles.eventPhoto} src={image ? image :"./images/hero.jpg"} alt="Event Photo" /></Link>
            <div className={styles.eventMain}>
                <div className={styles.eventName}>{eventName}</div>
                <div className={styles.eventDesc}>{eventDesc}</div>
                <div className={styles.eventData}>
                    <div className={styles.eventPlaceData}>
                        <div className={styles.eventLocation}><span className={styles.eventColored}><FaMapMarkerAlt /></span>{address}</div>
                        <div className={styles.eventTime}><span className={styles.eventColored}><FaCalendarAlt /></span> {new Date(eventStartTime).getDate() + "."+ (new Date(eventStartTime).getMonth()+1) +"." + new Date(eventStartTime).getFullYear() + "."} - {new Date(eventEndTime).getDate() + "."+ (new Date(eventEndTime).getMonth()+1) +"." + new Date(eventEndTime).getFullYear() + "."}</div>                 
                        <div className={styles.eventTime}><span className={styles.eventColored}><FaClock /></span> {new Date(eventStartTime).getHours()+ ":" + new Date(eventStartTime).getMinutes()} -  {new Date(eventEndTime).getHours()+ ":" + new Date(eventEndTime).getMinutes()}</div>
                    </div>
                    <div className={styles.eventParticipants}>{applieds}/{maxCapacity}</div>
                </div>
                <div className={styles.eventButtons}>
                    {handleSubmit && (session?.user ? (prijavljen ? 
                        <button onClick={() => {handleLeave().then(() => {setPrijavljen(false);setApplieds((prev) => prev-1)})}} 
                        className={`${styles.primaryButton} primaryButton`}>
                        Odjavi se</button>
                        :
                        <button onClick={() => {handleSubmit().then((done) => {if(done) {setPrijavljen(true);setApplieds((prev) => prev+1)}})}} 
                        className={`${styles.primaryButton} primaryButton`}>
                        Prijavi se</button>
                        )
                    : (
                        providers &&
                        Object.values(providers).map((provider) => (
                          <button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className={`${styles.primaryButton} primaryButton`}
                          >Prijavi se</button>
                        ))
                      )
                    )
                    }
                    {handleEdit && <button onClick={handleEdit} className={`${styles.primaryButton} primaryButton`}>Izmeni</button>}
                    {handleDelete && <button onClick={handleDelete} className={`${styles.primaryButton} primaryButton`}>Obrisi</button>}
                    <div className={styles.eventLikes}>
                        <button className={`${styles.secondaryButton} secondaryButton`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>{ hover ? <FaHeart /> : <FaRegHeart />}</button>
                        <div className={styles.eventLikesNum}>{likes}</div>
                    </div>
                </div>
                
            </div>
        </div>
        
    )
}