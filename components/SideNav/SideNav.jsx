"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css"
import { FaBars } from "react-icons/fa";
import { usePathname} from 'next/navigation'
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { FaTimes } from "react-icons/fa";

const Nav = () => {
  
  const pathname = usePathname()
  const {data: session} = useSession();
  const [ providers, setProviders ] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const SCROLL_TRIGGER_PX = 0;

  useEffect(() => {
    function check() {
        setScrolled(window.scrollY > SCROLL_TRIGGER_PX);
    }
    
    if(window.location.pathname != "/"){
      setScrolled(true);
    }else{
      setScrolled(false);
      window.addEventListener("scroll", check)
      return () => {
        window.removeEventListener("scroll", check);
      }
    }
},[pathname])

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);

  useEffect(() => {
    if(windowSize.width > 1024) setMenuVisible(false)
}, [windowSize])

  return (
    <>
      {(windowSize.width > 1024) ? null : (
                <div className={styles.sidebar_links}>
                    <div className={`${styles.menu_icon_close} ${menuVisible ? styles.show_x : ""}`} onClick={() => setMenuVisible(false)}>
                      <FaTimes />
                    </div>
                    <div >
                      <nav className={styles.sideNav}>
                        <ul>
                          <li>
                              <Link className={styles.sideNavLink} href="/about">O Nama</Link>
                          </li>
                          <li>
                              <Link className={styles.sideNavLink} href="/activities">Aktivnosti</Link>
                          </li>
                          <li>
                              <Link className={styles.sideNavLink} href="">Raspored</Link>
                          </li>
                          <li>
                          
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div>
                      {session?.user ? (
                        <div className={styles.sideNavProfile}>
                          <button type="button" onClick={async () =>{await signOut(); window.location.href ='/'}} className={`${styles.secondaryButton} secondaryButton`}>
                            {" "}
                            Odjavi se</button>
                        </div>
                        ) : (
                          providers &&
                          Object.values(providers).map((provider) => (
                            <button
                              type="button"
                              key={provider.name}
                              onClick={() => signIn(provider.id)}
                              className={`${styles.primaryButton} primaryButton`}
                            >Prijavi se</button>
                          ))
                        )}
                    </div>
                </div>
        )}








    <div className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
              <Link href="/">
                <img src={scrolled ? "/images/logoNavGreen.png" : "/images/logoNavWhite.png"} alt="Logo" />
              </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
              <Link className={styles.navLink} href="/about">O Nama</Link>
          </li>
          <li>
              <Link className={styles.navLink} href="/activities">Aktivnosti</Link>
          </li>
          <li>
              <Link className={styles.navLink} href="">Raspored</Link>
          </li>
          <li>
          {session?.user ? (
            <div className={styles.navProfile}>
              <button type="button" onClick={async () =>{await signOut(); window.location.href ='/'}} className={`${styles.secondaryButton} secondaryButton`}>
                {" "}
                Odjavi se
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className={styles.profilePic}
                  alt="profile"
                ></Image>
              </Link>
            </div>
            ) : (
              providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className={`${styles.primaryButton} primaryButton`}
                >Prijavi se</button>
              ))
            )}
          </li>
        </ul>
      </nav>
      <div className={`${styles.menuBtn}`} onClick={(e) => {e.stopPropagation(); setMenuVisible(true); }}>
        <FaBars />
      </div>
    </div>
    </>
    
  );
};

export default Nav;
