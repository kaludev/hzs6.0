import styles from "./Profile.module.css"
import Link from "next/link"
import { FaCog } from "react-icons/fa";

export default function ProfileSection({name, username, photo}){
    return(
        <section className={styles.profileCard}>
        <div className={styles.profileCardMain}>
            <h2>O nalogu</h2>
            <hr className={styles.divider} />
            <div className={styles.profileHeader}>
                <img className={styles.userPhoto} src={photo} alt="" />
                <div className={styles.userInfo}>
                    <div className={styles.userFirstName}>{name}</div>
                    <div className={styles.username}>@{username}</div>
                </div>
                <div className={styles.userSettings}>
                    <FaCog />
                </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.profileDesc}>
                <div className={styles.descRow}>
                    <div className={styles.descRowMain}>
                        <div className={styles.descTitle}>Podešavanja naloga</div>
                        <div className={styles.descP}>Pregledajte i uredite vaše podatke</div>
                    </div>
                    <div className={`${styles.secondaryButton} secondaryButton`}>
                        Podešavanja
                    </div>
                </div>
                <div className={styles.descRow}>
                    <div className={styles.descRowMain}>
                        <div className={styles.descTitle}>Podnesite zahtev za organizatora</div>
                        <div className={styles.descP}>Ukoliko želite da održavate događaje i prijavljujete kandidate morate postati organizator</div>
                    </div>
                    <div className={`${styles.secondaryButton} secondaryButton`}>
                        Započnite
                    </div>
                </div>
                <div className={styles.descRow}>
                    <div className={styles.descRowMain}>
                        <div className={styles.descTitle}>Odjavite se</div>
                        <div className={styles.descP}>Odjavite se kako bi ste se prijavili preko drugog naloga</div>
                    </div>
                    <div className={`${styles.secondaryButton} secondaryButton`}>
                        Odjavi se
                    </div>
                </div>
                <div className={styles.descRow}>
                    <div className={styles.descRowMain}>
                        <div className={styles.descTitle}>Deaktivirajte vaš nalog</div>
                        <div className={styles.descP}>Ovde možete deaktivirati nalog i više ga nikada ne koristiti</div>
                    </div>
                    <div className={`${styles.secondaryButton} ${styles.warningButton} secondaryButton`}>
                        Deaktiviraj
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}