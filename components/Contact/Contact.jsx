"use client"
import styles from "./Contact.module.css"
import Map from "@components/Map/Map"
import { useState} from "react"

export default function ContactSection({mode}) {
    const [buttonState, setButtonState] = useState({
        showClosest: false,
        showNext: true,
        showPast: false
    });

    return (
        <section className={styles.contactSec}>
            <div className={styles.iframeMain}>
                <Map buttonState={buttonState} mode={mode} />
            </div>
            <div className={styles.iframeButtons}>
                <button className={`${styles.primaryButton} primaryButton`} onClick={() => {
                    setButtonState({
                        showClosest: true,
                        showNext: false,
                        showPast: false
                    })
                }}>Prikaži najbliža takmičenja</button>
                <button className={`${styles.primaryButton} primaryButton`} onClick={() => {
                    setButtonState({
                        showClosest: false,
                        showNext: false,
                        showPast: true
                    })
                }}>Prikaži prošla takmičenja</button>
                <button className={`${styles.primaryButton} primaryButton`} onClick={() => {
                    setButtonState({
                        showClosest: false,
                        showNext: true,
                        showPast: false
                    })
                }}>Prikaži predstojeća takmičenja</button>
            </div>
        </section>
    )
}