"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./RangListCard.module.css"
import { FaRegHeart } from "react-icons/fa";
import { FaClock, FaMapMarkerAlt, FaHeart, FaCalendarAlt } from "react-icons/fa";

export default function RangListCard({user,email,tel,events,likes}){


    return(

                <div className={styles.cardEvent}>
                    <div className={styles.eventMain}>
                        <div className={styles.eventHeader}>
                            <div className={styles.eventHeaderLeft}>
                                <div className={styles.eventName}>{user}</div>
                                <div className={styles.eventDesc}>{email}</div>
                            </div>
                            <div className={styles.eventHeaderRight}><Link href={`tel:${tel}`}>{tel}</Link></div>
                        </div>
                        <div className={styles.eventHeaderSec}>
                            <div className={styles.eventHeaderLeft}>
                                <div className={styles.eventData}>Broj održanih takmičenja: {events}</div>
                            </div>
                                <div className={styles.eventLikes}>
                                    <button className={`${styles.secondaryButton} secondaryButton`}><FaHeart /></button>
                                    <div className={styles.eventLikesNum}>{likes}</div>
                                </div>
                        </div>
                    </div>
                </div>
        
    )
}