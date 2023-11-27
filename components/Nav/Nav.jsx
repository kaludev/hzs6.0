"use client";

import Link from "next/link";
import Image from "next/image";
import NavStyles from "./Nav.module.css"

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
    <nav className=" flex-between w-full mb-16 pt-3">
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="">

            <Link href="/create-prompt" className={NavStyles.LinkToOther}>

              {" "}
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              {" "}
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
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
              className="primaryButton"
            >Sign in</button>
          ))
        )}
      </div>
      {/*Mobile Navigation */}


      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex flex-col flex-end">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            ></Image>
            {toggleDropdown && (
                <div className={NavStyles.dropdown+ " flex flex-col"}>
                    <Link href='/profile'
                    className="my-5 w-4/5"
                    onClick={() => setToggleDropdown(false)}>
                        My Profile
                    </Link>
                    <Link href='/create-prompt'
                    className="mx-auto my-5 w-4/5 dropdown_link"
                    onClick={() => setToggleDropdown(false)}>
                        Create Prompt
                    </Link>
                    <button type="button"
                    onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                    }}
                    className="my-5 w-4/5 primaryButton"
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
