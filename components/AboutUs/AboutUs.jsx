import styles from "./AboutUs.module.css"
import Link from "next/link"

export default function AboutUsPage(){
    return(
        <section className={styles.about}>
            <div className={styles.aboutFirst}>
                <div className={styles.aboutDesc}>
                    <div className={styles.aboutDescMain}>
                        <h3>Nova Iskustva</h3>
                        <div><p>Hakaton Arena je više od sportskog događaja - to je prilika za sticanje nezaboravnih iskustava. Prijavljivanjem, postajete deo zajednice entuzijasta, mentora i stručnjaka koji zajedno rade na rešavanju izazova i postizanju izvanrednih rezultata.</p></div>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero9.jpg" alt="" />
            </div>
            <div className={styles.aboutSec}>
                <div className={styles.aboutDesc}>
                    <div className={styles.aboutDescMain}>
                        <h3>O nama</h3>
                        <div><p>U  našoj areni se sastaju talenat, inovacija i strast za kreiranjem budućnosti. Mi smo tim posvećen entuzijastima koji dele istu viziju - stvaranje prostora gde se ideje rađaju, razvijaju i postaju stvarnost.</p></div>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero3.jpg" alt="" />
            </div>
            <div className={styles.aboutFirst}>
                <div className={styles.aboutDesc}>
                    <div className={styles.aboutDescMain}>
                        <h3>Naša Misija</h3>
                        <div><p>Ne samo da okupljamo stručnjake iz različitih oblasti, već i pružamo platformu za rast i razvoj. Naša misija je podstaći kreativnost, podržati inovacije i stvoriti zajednicu u kojoj se svako lice razvija i ostvaruje svoje potencijale.</p></div>
                        <div className={`${styles.primaryButton} primaryButton`}><Link href="/prijavi-se">Prijavi se</Link></div>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero5.jpg" alt="" />
            </div>
            <div className={styles.aboutSec}>
                <div className={styles.aboutDesc}>
                    <div className={styles.aboutDescMain}>
                        <h3>Šta nas pokreće?</h3>
                        <div><p> Verujemo da inovacija leži u srcu svakog uspeha. Naša platforma je prostor gde se ideje razvijaju i gde svaki takmičar ima priliku da doprinese stvaranju nečeg revolucionarnog. Vi ste varnica koja će zapaliti plamen!</p></div>
                        <div className={`${styles.primaryButton} primaryButton`}><Link href="/smerovi">Prikaži događaje</Link></div>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero6.jpg" alt="" />
            </div>
            <div className={styles.aboutFirst}>
                <div className={styles.aboutDesc}>
                    <div className={styles.aboutDescMain}>
                        <h3>Naš Tim</h3>
                        <div><p>Hakaton Arenu čini stručan tim entuzijasta sa različitim pozadinama, ali sa zajedničkom strašću za stvaranjem pozitivnog uticaja. Svaki takmičar doprinosi jedinstvenom skupu veština i perspektiva, čineći našu Arenu raznovrsnim mestom za saradnju.</p></div>
                        <div className={`${styles.primaryButton} primaryButton`}><Link href="/prijavi-se">Postani deo tima</Link></div>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero7.jpg" alt="" />
            </div>
            <div className={styles.aboutSec}>
                <div className={styles.aboutDesc}>
                    <div className={styles.aboutDescMain}>
                        <h3>Kako do uspeha?</h3>
                        <div><p>Ne čekajte - osigurajte svoje mesto danas i kročite na put ka uspehu! Hakaton Arena je mesto gde se ostvaruju snovi, a vi ste pozvani da budete deo toga. Prijavite se odmah i vidimo se u Areni - gde se snovi pretvaraju u stvarnost!</p></div>
                        <div className={`${styles.primaryButton} primaryButton`}><Link href="/smerovi">Započni odmah</Link></div>
                    </div>
                </div>
                <img className={styles.aboutImg} src="./images/hero8.jpg" alt="" />
            </div>
        </section>
        
    )
}