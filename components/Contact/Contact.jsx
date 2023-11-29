import styles from "./Contact.module.css"
//import KontaktAPI from "../../../../services/api/Kontakt";
//import { useStateContext } from "../../../../services/context/ContextProvider";
import Map from "@components/Map/Map"
export default function ContactSection() {
    
	

    return (
        <section className={styles.contactSec}>
            <div className={styles.iframeMain}>
                <Map />
            </div>
            <div className={styles.iframeButtons}>
                <button className={`${styles.primaryButton} primaryButton`}>Prikaži najbliže dešavanje</button>
                <button className={`${styles.primaryButton} primaryButton`}>Prikaži prošla dešavanja</button>
                <button className={`${styles.primaryButton} primaryButton`}>Prikaži predstojeća dešavanja</button>
            </div>
        </section>
    )
}