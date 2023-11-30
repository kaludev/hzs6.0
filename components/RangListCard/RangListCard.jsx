"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./RangListCard.module.css"
import { FaRegHeart } from "react-icons/fa";
import { FaClock, FaMapMarkerAlt, FaHeart, FaCalendarAlt } from "react-icons/fa";

export default function RangListCard(){
    
    const tel = '67567'

    return(

                <div className={styles.cardEvent}>
                    <div className={styles.eventMain}>
                        <div className={styles.eventHeader}>
                            <div className={styles.eventHeaderLeft}>
                                <div className={styles.eventName}>IME KLUBA</div>
                                <div className={styles.eventDesc}>EMAIL KLUBA</div>
                            </div>
                            <div className={styles.eventHeaderRight}><Link href={`tel:${tel}`}>064567675</Link></div>
                        </div>
                        <div className={styles.eventOrgName}>IME ORGANIZATORA</div>
                        <div className={styles.eventDesc}>EMAIL KLUBA</div>
                        <div className={styles.eventHeaderSec}>
                            <div className={styles.eventHeaderLeft}>
                                <div className={styles.eventData}>Broj održanih takmičenja: {}</div>
                            </div>
                                <div className={styles.eventLikes}>
                                    <button className={`${styles.secondaryButton} secondaryButton`}><FaHeart /></button>
                                    <div className={styles.eventLikesNum}>{}</div>
                                </div>
                        </div>
                    </div>
                </div>
        
    )
}