import styles from "./EventCard.module.css"
import Link from "next/link"

export default function AboutUsPage(){
    return(
        <div className={styles.cardEvent}>
            <img className={styles.eventPhoto} src="./images/hero.jpg" alt="Event Photo" />
            <div className={styles.eventMain}>
                <div className={styles.eventName}>Stoni tenis u Novoj hali sportova</div>
                <div className={styles.eventDesc}>Finale turnira u stonom tenisu ce se odrzati u  Novoj hali sportova da vidimo ko je najjaci</div>
                <div className={styles.eventData}>
                    <div className={styles.eventPlaceData}>
                        <div className={styles.eventLocation}><span className={styles.eventColored}>P</span> Nova hala sportova 1, Kraljevo</div>
                        <div className={styles.eventTime}><span className={styles.eventColored}>V</span> 09:30h - 11:00h</div>
                    </div>
                    <div className={styles.eventParticipants}>22/46</div>
                </div>
                <div className={styles.eventButtons}>
                    <button className={`${styles.primaryButton} primaryButton`}>Prijavi se</button>
                    <div className={styles.eventLikes}>
                        <button className={`${styles.secondaryButton} secondaryButton`}>Like</button>
                        <div className={styles.eventLikesNum}>44</div>
                    </div>
                </div>
                
            </div>
        </div>
        
    )
}