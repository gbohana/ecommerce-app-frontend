'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from 'next-auth'

export default function Header() {
    const isUserLoggedIn = true;
    const [toggleDropdown, setToggleDropdown] = useState(false);

    return (
        <nav className="flex flex-between w-full pt-3 mb-16">
            <Link className="flex gap-2 flex-center" href="/">
                <Image src="/assets/shopcart.png" alt="Logo" width={30} height={30} className="object-contain pl-1" />
                <p className="logo_text">Buy Everything</p>
            </Link>

            <div className="sm:flex hidden">
                {isUserLoggedIn ?
                    <div className="flex gap-3 md:gap-5">
                        <button type= "button" className="">Your cart</button>
                        <Link href="/" className="flex gap-2 flex-center">
                            <Image
                                src="/assets/shopcart.png"
                                alt="Profile picture"
                                width={37}
                                height={37}
                                className="rounded-full"
                                onClick={() => setToggleDropdown(prev => !prev)}
                            />
                            {toggleDropdown &&
                                <div className="dropdown">
                                    <Link
                                    href="/"                                    
                                    onClick={() => setToggleDropdown(false)}
                                    className="dropdown_link"
                                    >
                                        My Profile
                                    </Link>
                                    <button
                                        type= "button"
                                        className="mt-5 w-full"
                                        onClick={() => {
                                            setToggleDropdown();
                                            signOut();
                                        }}
                                    >
                                        Sign out
                                    </button>
                                </div>
                            }
                        </Link>
                    </div>
                    :
                    <div className="flex ml-5 gap-3 md:gap-5">
                        <Link href="/">Home</Link>
                        <button type= "button" className="">Your cart</button>
                        <button
                            type="button"
                            onClick={()=> {}}
                            className=""
                        >
                            Sign In
                        </button>
                    </div>
                }
            </div>
        </nav>
    );
}