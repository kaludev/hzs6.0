import styles from "./Contact.module.css"
//import KontaktAPI from "../../../../services/api/Kontakt";
//import { useStateContext } from "../../../../services/context/ContextProvider";
import Map from "@components/Map/Map"
export default function ContactSection() {
    
	

    return (
        <section className={styles.contactSec}>
            <div className={styles.formContainer}>
                <div className={styles.iframeCont}>
                    <Map/>
                </div>
            </div>
        </section>
    )
}