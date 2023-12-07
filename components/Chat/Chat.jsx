"use client"

import { useState } from "react"
import styles from "./Chat.module.css"
import Link from "next/link"
import { FaComment, FaTimes, FaArrowUp } from "react-icons/fa";

export default function Chat(){

    const [active, setActive] = useState(false);
    return(
        <>
            {active ? 
            <div className={styles.chatCont} >
                <div className={styles.chatHeader} >
                    <img className={styles.chatImg} alt="chatLogo" src="./images/hero.jpg"/>
                    <div className={styles.chatName} >Chat GPT</div>
                    <div className={styles.chatClose} onClick={() => {setActive(false)}}><FaTimes /></div>
                </div>
                <div className={styles.chatMain} >
                    <div className={styles.chatMessageLeft} >
                        <img className={styles.messageImg} src="./images/hero.jpg"/>
                        <div className={styles.messageText} >kjlhjkhmdfkghjkfshgljksdhfjdshflhsdlkjfhlsdjkahfsdhkfsdjklhjkjk</div>
                    </div>
                    <div className={styles.chatMessageLeft} >
                        <img className={styles.messageImg}  src="./images/hero.jpg"/>
                        <div className={styles.messageText} >kjlhkjlhjklh</div>
                    </div>
                    <div className={styles.chatMessageRight} >
                        <img className={styles.messageImg}  src="./images/hero.jpg"/>
                        <div className={styles.messageText} >lkjhlkjhljk</div>
                    </div>
                    <div className={styles.chatMessageLeft} >
                        <img className={styles.messageImg}  src="./images/hero.jpg"/>
                        <div className={styles.messageText} >kjlhkjlhjklh</div>
                    </div>
                    <div className={styles.chatMessageRight} >
                        <img className={styles.messageImg}  src="./images/hero.jpg"/>
                        <div className={styles.messageText} >lkjhlkjhfdafdafkjh kjshf dskjfh skdjlfhksdj dasdkjhkjhjkhkj fjkhdsjklhfsdhfjkdshjkhlkjljk</div>
                    </div>
                </div>
                <div className={styles.chatFormCont} >
                    <form className={styles.chatForm} >
                        <button type="submit" className={styles.chatSubmit}><FaArrowUp /></button>
                        <input type="text"  className={styles.chatText} placeholder="Postavite pitanje vasem asistentu"/>
                    </form>
                </div>
            </div> : 
            <div className={styles.chatBubble} onClick={() => {setActive(true)}}><FaComment /></div>}
        </>
    )
}