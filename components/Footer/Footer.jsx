import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer({dark}) {

    return (
        <footer>
            <hr className={styles.footerDevider} />
            <div className={styles.footerMain}>
                <div className={styles.footerCol}>
                    <img className={styles.footerLogo} src="./images/logoGreen.png" alt="" />
                </div>
                <div className={styles.footerCol}>
                    <h3>Stranice</h3>
                    <div className={styles.footerLink}><Link href="/dokumenta/javne-nabavke">Početna</Link></div>
                    <div className={styles.footerLink}><Link href="/dokumenta/opsti-akti">O nama</Link></div>
                    <div className={styles.footerLink}><Link href="/dokumenta/dokumenta-skole">Zaigraj se</Link></div>
                    <div className={styles.footerLink}><Link href="/dokumenta/prosvetni-glasnici">Saznaj više</Link></div>
                    <div className={styles.footerLink}><Link href="/dokumenta/prosvetni-glasnici">Dokumentacija</Link></div>
                    <div className={styles.footerLink}><Link href="/dokumenta/prosvetni-glasnici">Test funkcionalnosti</Link></div>
                </div>
                <div className={styles.footerCol}>
                    <h3>Resursi</h3>
                    <div className={styles.footerLink}><Link href="/smerovi">Lista svih API-ja</Link></div>
                    <div className={styles.footerLink}><a href="http://www.estsnikolatesla.edu.rs/moodle1/" target="_blank" rel="noreferrer">Izvori podataka</a></div>
                    <h3>Nalog</h3>
                    <div className={styles.footerLink}><Link href="/dokumenta/sistematizacija">Upravljajte nalogom</Link></div>
                    <div className={styles.footerLink}><Link href="/dokumenta/finansijska-dokumenta">Kreiraj nalog</Link></div>
                    <div className={styles.footerLink}><Link href="/dokumenta/obrasci-priprema">Odjavi se</Link></div>
                </div>
                <div className={styles.footerCol}>
                    <h3>Kontakt</h3>
                    <div className={styles.footerLink}><Link href="mailto:luka.markovic2017@gmail.com">luka.markovic2017@gmail.com</Link></div>
                    <div className={styles.footerLink}><Link href="mailto:nikolamilanovic2305@gmail.com">nikolamilanovic2305@gmail.com</Link></div>
                    <div className={styles.footerLink}><Link href="mailto:dimitrijeradojkovic8@gmail.com">dimitrijeradojkovic8@gmail.com</Link></div>
                </div>
            </div>
            <hr className={styles.footerDevider} />
            <hr className={styles.footerDevider} />
            <div className={styles.footerCopyright}>
                <p className={styles.footerCopyrightP}>© {new Date().getFullYear()}. Sva prava zadržana Tim "Class" Kraljevo.</p>
                <div className={styles.footerPowered}>
                    <p> Veb aplikaciju uradili đaci ESTŠ "Nikola Tesla" </p>
                </div>
            </div>
        </footer>
    );
}
