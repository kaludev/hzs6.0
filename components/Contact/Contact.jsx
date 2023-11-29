"use client"
import styles from "./Contact.module.css"
//import KontaktAPI from "../../../../services/api/Kontakt";
//import { useStateContext } from "../../../../services/context/ContextProvider";
import Map from "@components/Map/Map"
import { useState} from "react"

export default function ContactSection() {
    const [buttonState, setButtonState] = useState({
        showClosest: false,
        showNext: true,
        showPast: false
    });

    return (
        <section className={styles.contactSec}>
            <div className={styles.iframeMain}>
                <Map buttonState={buttonState} mode="all"/>
            </div>
            <div className={styles.iframeButtons}>
                <button className={`${styles.primaryButton} primaryButton`} onClick={() => {
                    setButtonState({
                        showClosest: true,
                        showNext: false,
                        showPast: false
                    })
                }}>Prikaži najbliže dešavanje</button>
                <button className={`${styles.primaryButton} primaryButton`} onClick={() => {
                    setButtonState({
                        showClosest: false,
                        showNext: false,
                        showPast: true
                    })
                }}>Prikaži prošla dešavanja</button>
                <button className={`${styles.primaryButton} primaryButton`} onClick={() => {
                    setButtonState({
                        showClosest: false,
                        showNext: true,
                        showPast: false
                    })
                }}>Prikaži predstojeća dešavanja</button>
            </div>
        </section>
    )
}