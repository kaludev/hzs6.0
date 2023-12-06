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
                        <div className={`${styles.primaryButton} primaryButton`}><Link href="/arena">Prijavi se</Link></div>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero4.jpg" alt="" />
            </div>
            <div className={styles.aboutSec}>
                <div className={styles.aboutDesc}>
                    <div className={styles.aboutDescMain}>
                        <h3>Šta sve nudimo?</h3>
                        <div><p>Naša misija je podržati entuzijaste i stručnjake iz različitih oblasti. Rezervisanje termina kod nas nije samo korak ka vašem uspehu, već i pristupačan način da uđete u svet inovacija i takmičenja. HakatonArena se ponosi sigurnim okruženjem gde se cene ideje i gde svaki učesnik ima priliku da se istakne. Vaše rezervisano mesto je vaša karta ka sigurnom i podsticajnom okruženju gde možete razviti svoje veštine i ostvariti svoje ambicije.</p></div>
                        <Link href="/arena"><div className={`${styles.primaryButton} primaryButton`}>Rezerviši termin</div></Link>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero.jpg" alt="" />
            </div>
        </section>
    )
}