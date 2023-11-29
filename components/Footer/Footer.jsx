import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer({dark}) {

    return (
        <footer className={styles.footer}>
            <hr className={styles.footerDevider} />
            <div className={styles.footerMain}>
                <div className={styles.footerCol}>
                    <img className={styles.footerLogo} src="./images/logoGreen.png" alt="HakatonArenaLogo" />
                </div>
                <div className={styles.footerCol}>
                    <h3>Stranice</h3>
                    <div className={styles.footerLink}><Link href="/">Početna</Link></div>
                    <div className={styles.footerLink}><Link href="/o-nama">O nama</Link></div>
                    <div className={styles.footerLink}><Link href="/zaigraj-se">Zaigraj se</Link></div>
                    <div className={styles.footerLink}><Link href="/saznaj-vise">Saznaj više</Link></div>
                    <div className={styles.footerLink}><Link href="/dokumentacija">Dokumentacija</Link></div>
                    <div className={styles.footerLink}><Link href="/test-funkcionalnosti">Test funkcionalnosti</Link></div>
                </div>
                <div className={styles.footerCol}>
                    <h3>Resursi</h3>
                    <div className={styles.footerLink}><Link href="/smerovi">Lista svih API-ja</Link></div>
                    <div className={styles.footerLink}><a href="https://www.google.com" target="_blank" rel="noreferrer">Izvori podataka</a></div>
                    <h3>Nalog</h3>
                    <div className={styles.footerLink}><Link href="/profile">Upravljajte nalogom</Link></div>
                    <div className={styles.footerLink}><Link href="/uloguj-se">Kreiraj nalog</Link></div>
                    <div className={styles.footerLink}><Link href="/odjavi-se">Odjavi se</Link></div>
                </div>
                <div className={styles.footerCol}>
                    <h3>Kontakt</h3>
                    <div className={styles.footerLink}><Link href="mailto:luka.markovic2017@gmail.com">luka.markovic2017@gmail.com</Link></div>
                    <div className={styles.footerLink}><Link href="mailto:nikolamilanovic2305@gmail.com">nikolamilanovic2305@gmail.com</Link></div>
                    <div className={styles.footerLink}><Link href="mailto:dimitrijeradojkovic8@gmail.com">dimitrijeradojkovic8@gmail.com</Link></div>
                    <div className={styles.footerLink}><Link href="mailto:tvasiljevic785@gmail.com">tvasiljevic785@gmail.com</Link></div>
                </div>
            </div>
            <hr className={styles.footerDevider} />
            <hr className={styles.footerDevider} />
            <div className={styles.footerCopyright}>
                <p className={styles.footerCopyrightP}>© {new Date().getFullYear()}. Sva prava zadržana Tim "Class" Kraljevo.</p>
                <div className={styles.footerPowered}>
                    <p>Veb aplikaciju izradili učenici ESTŠ "Nikola Tesla" </p>
                </div>
            </div>
        </footer>
    );
}
