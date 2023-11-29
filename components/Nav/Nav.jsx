"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css"
import { FaBars } from "react-icons/fa";
import { usePathname} from 'next/navigation'
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

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
    
    console.log(window.location.pathname)
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

  return (
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
              {session?.user.isOrganizer && <Link href="/create-prompt" className={`${styles.secondaryButton} secondaryButton`}>
                {" "}
                Dodaj Događaj
              </Link>}
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
    // <nav className="flex justify-between w-full ">
    //   {/* Desktop Navigation */}
    //   <Link href="/" className="flex gap-2 flex-center">
    //     <Image
    //       src="/images/logoGreen.png"
    //       alt="Promptopia Logo"
    //       width={100}
    //       height={30}
    //       className="object-contain"
    //     ></Image>
    //   </Link>
    //   <h2 className={"mt-5 " + NavStyles.mainHeading}>Dobrodosli u Hakaton Arenu</h2>
    //   <div className="sm:flex hidden">
        
    //   </div>
    //   {/*Mobile Navigation */}


    //   <div className="sm:hidden flex relative">
    //     {session?.user ? (
    //       <div className="flex flex-col flex-end">
    //         <div className="flex flex-row justify-end">
    //           <Image
    //             src={session?.user.image}
    //             width={37}
    //             height={37}
    //             className="flex justify-self-end mr-2 rounded-full"
    //             alt="profile"
    //             onClick={() => setToggleDropdown((prev) => !prev)}
    //           ></Image>
    //         </div>
            
    //         {toggleDropdown && (
    //             <div className={NavStyles.dropdown+ " flex flex-col"}>
    //                 <Link href='/profile'
    //                 className="ml-7 my-5 w-4/5"
    //                 onClick={() => setToggleDropdown(false)}>
    //                     My Profile
    //                 </Link>
    //                 <Link href='/create-prompt'
    //                 className="ml-7 my-5 w-4/5 "
    //                 onClick={() => setToggleDropdown(false)}>
    //                     Create Prompt
    //                 </Link>
    //                 <button type="button"
    //                 onClick={() => {
    //                     setToggleDropdown(false);
    //                     signOut();
    //                 }}
    //                 className="ml-7 my-5 w-1/2 primaryButton"
    //                 >
    //                     Sign Out
    //                 </button>
    //             </div>
    //         )}
    //       </div>
    //     ) : (
    //         <>
    //             {providers &&
    //             Object.values(providers).map((provider) => (
    //                 <button
    //                 type="button"
    //                 key={provider.name}
    //                 onClick={() => signIn(provider.id)}
    //                 className="primaryButton"
    //                 >
    //                     Sign in
    //                 </button>
    //             ))}
    //         </>
              
    //     )}
    //   </div>
    // </nav>
  );
};

export default Nav;
