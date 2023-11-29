"use client"

import Nav from "@components/Nav/Nav";
import SideNav from "@components/SideNav/SideNav";
import { useState } from "react"

const Navigation = () => {
    const [menuVisible, setMenuVisible] = useState(false);
  return (
    <div>
        <Nav setMenuVisible={setMenuVisible} />
        <SideNav menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
    </div>
    
  )
}

export default Navigation