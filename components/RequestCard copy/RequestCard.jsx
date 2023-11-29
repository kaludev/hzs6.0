import { useState } from "react";
import styles from "./RequestCard.module.css"
import Link from "next/link"
import { FaRegEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

export default function RequestCard(){


    return(
        <div className={styles.cardEvent}>
            <div className={styles.eventMain}>
                <div className={styles.eventName}>Ime Kluba</div>
                <div className={styles.eventDesc}>Ime i prezime organizatora</div>
                <div className={styles.eventData}>
                    <div className={styles.eventPlaceData}>
                        <div className={styles.eventTime}><span className={styles.eventColored}><FaRegEnvelope />emailorganizatora@gmail.com</span></div>
                        <div className={styles.eventLocation}><span className={styles.eventColored}><FaRegEnvelope /></span>emailkluba@gmail.com</div>
                        <div className={styles.eventLocation}><span className={styles.eventColored}><FaPhoneAlt /></span>062123409223</div>
                    </div>
                    <div className={styles.eventParticipants}></div>
                </div>
                <div className={styles.eventDesc}>Ime i prezime organizatora</div>
                <div className={styles.eventButtons}>
                    <button className={`${styles.primaryButton} primaryButton`}>Odobri zahtev</button>
                    <button className={`${styles.secondaryButton} secondaryButton`}>Odbij</button>
                </div>
            </div>
        </div>
        
    )
}