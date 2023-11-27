import styles from "./About.module.css"
import Link from "next/link"

export default function AboutSection(){
    return(
        <section className={styles.about}>
            <div className={styles.aboutFirst}>
                <div className={styles.aboutDesc}>
                    <div className={styles.aboutDescMain}>
                        <h3>Brzo lako i jednostavno</h3>
                        <div><p>Dobrodošli u HakatonArenu, gde inovacija susreće strast, a ideje postaju stvarnost! Ako želite osvojiti nove medalje, proširiti svoje horizonte i stvarati nezaboravna iskustva na zanimljiv način, rezervisanje termina kod nas je prvi korak ka ostvarenju vaših ciljeva!</p></div>
                        <Link href="/o-skoli"><div className={`${styles.primaryButton} primaryButton`}>Prijavi se</div></Link>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero.jpg" alt="" />
            </div>
            <div className={styles.aboutSec}>
                <div className={styles.aboutDesc}>
                    <div className={styles.aboutDescMain}>
                        <h3>Šta sve nudimo?</h3>
                        <div><p>У нашој средњој електротехничкој школи верујемо да je практично учење најбољи начин да се ученици припреме за успешну каријеру у области електротехнологије.</p></div>
                        <Link href="/smerovi"><div className={`${styles.primaryButton} primaryButton`}>Rezerviši termin</div></Link>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero2.jpg" alt="" />
            </div>
        </section>
    )
}