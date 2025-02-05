'use client';

import Image from "next/image";
import "./style.scss"
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

    const [showSearch, setShowSearch] = useState(false)

    return (
        <nav>
            <div className="site-logo">
                <Link href={"/"}>
                    <Image src={"/logo.png"} alt={"Site logo"} width={60} height={60} />
                </Link>
            </div>
            <div className="search">
                {
                    showSearch &&
                    <input type="search" placeholder="Search songs" className="search-bar" />
                }
                <Image onClick={() => setShowSearch(!showSearch)} src={"/search.svg"} alt={"Search"} width={25} height={25} className="search-btn" />
            </div>
        </nav>
    )
}