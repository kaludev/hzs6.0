"use client";

import Link from "next/link";
import Image from "next/image";
import NavStyles from "./Nav.module.css"
import "@styles/tailwind.css"

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const {data: session} = useSession();
  const [ providers, setProviders ] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)
  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);
  return (
    <nav className="flex justify-between w-full ">
      {/* Desktop Navigation */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/images/logoGreen.png"
          alt="Promptopia Logo"
          width={100}
          height={30}
          className="object-contain"
        ></Image>
      </Link>
      <h2 className={"mt-5 sm:flex hidden " + NavStyles.mainHeading}>Dobrodosli u Hakaton Arenu</h2>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-5 justify-items-end my-3 h-15">

            <Link href="/create-prompt" className="rounded-lg pt-2.5 h-12.5 secondaryButton">

              {" "}
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="primaryButton h-12.5 rounded-lg">
              {" "}
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full mr-5 mt-2.5"
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
              className="primaryButton rounded-lg my-3 mr-5"
            >Sign in</button>
          ))
        )}
      </div>
      {/*Mobile Navigation */}


      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex flex-col flex-end">
            <div className="flex flex-row justify-end">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="flex justify-self-end mr-2 mt-3 rounded-full"
                alt="profile"
                onClick={() => setToggleDropdown((prev) => !prev)}
              ></Image>
            </div>
            
            {toggleDropdown && (
                <div className={NavStyles.dropdown+ " flex flex-col"}>
                    <Link href='/profile'
                    className="ml-7 my-5 w-4/5"
                    onClick={() => setToggleDropdown(false)}>
                        My Profile
                    </Link>
                    <Link href='/create-prompt'
                    className="ml-7 my-5 w-4/5 "
                    onClick={() => setToggleDropdown(false)}>
                        Create Prompt
                    </Link>
                    <button type="button"
                    onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                    }}
                    className="ml-7 my-5 w-1/2 rounded-lg primaryButton"
                    >
                        Sign Out
                    </button>
                </div>
            )}
          </div>
        ) : (
            <>
                {providers &&
                Object.values(providers).map((provider) => (
                    <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="primaryButton"
                    >
                        Sign in
                    </button>
                ))}
            </>
              
        )}
      </div>
    </nav>
  );
};

export default Nav;
