import styles from "./RequestCard.module.css"
import Link from "next/link"
import { FaRegEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

export default function RequestCard({data,handleConfirm,handleDecline}){


    return(
        <div className={styles.cardEvent}>
            <div className={styles.eventMain}>
                <div className={styles.eventName}>{data.club_name}</div>
                <div className={styles.eventDesc}>{data.name}</div>
                <div className={styles.eventData}>
                    <div className={styles.eventPlaceData}>
                        <div className={styles.eventTime}><span className={styles.eventColored}><FaRegEnvelope />{data.email}</span></div>
                        <div className={styles.eventLocation}><span className={styles.eventColored}><FaRegEnvelope /></span>{data.club_email}</div>
                        <div className={styles.eventLocation}><span className={styles.eventColored}><FaPhoneAlt /></span>{data.phone}</div>
                    </div>
                </div>
                <div className={styles.eventDesc}>{data.reason}</div>
                <div className={styles.eventButtons}>
                    <button onClick={handleConfirm} className={`${styles.primaryButton} primaryButton`}>Odobri zahtev</button>
                    <button onClick={handleDecline} className={`${styles.secondaryButton} secondaryButton`}>Odbij</button>
                </div>
            </div>
        </div>
        
    )
}