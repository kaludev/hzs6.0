import styles from "./PricingCards.module.css"
import { FaCheckCircle } from "react-icons/fa"
import Link from "next/link"

export default function PricingCards(){
    return(
        <div className={styles.pricingCont}>
            <div className={styles.pricingCardSide}>
                <div className={styles.pricingCardMain}>
                    <div className={styles.priceDesc}>Pocetni</div>
                    <div className={styles.price}>2249.00<span className={styles.pricePeriod}>/godisnje</span></div>
                    <div className={styles.priceCardDesc}>
                        Najpovoljniji paket takmicite se koliko volite
                    </div>
                    <div className={styles.priceInclude}>
                        <span className={styles.priceIncludeIcon}><FaCheckCircle /></span>dobijas sve za najbolje pare
                    </div>
                    <div className={styles.priceInclude}>
                        <span className={styles.priceIncludeIcon}><FaCheckCircle /></span>dobijas sve za najbolje pare
                    </div>
                    <div className={styles.priceInclude}>
                        <span className={styles.priceIncludeIcon}><FaCheckCircle /></span>dobijas sve za najbolje pare
                    </div>
                    <div className={styles.priceInclude}>
                        <span className={styles.priceIncludeIcon}><FaCheckCircle /></span>dobijas sve za najbolje pare
                    </div>
                    <div className={styles.priceInclude}>
                        <span className={styles.priceIncludeIcon}><FaCheckCircle /></span>dobijas sve za najbolje pare
                    </div>
                </div>
                <Link href="/arena"><div className={`${styles.primaryButton} primaryButton`}>Kupi odmah</div></Link>
            </div>
            <div className={styles.pricingCardMid}>
                <div className={styles.pricingCardMain}>
                    <div className={styles.priceDesc}>Premium</div>
                    <div className={styles.price}>999.00 <span className={styles.pricePeriod}>/godisnje</span></div>
                    <div className={styles.priceCardDesc}>
                        Najpovoljniji paket takmicite se koliko volite lorem ipsum das lores nesto levo
                    </div>
                    <div className={styles.priceInclude}>
                        <span className={styles.priceIncludeIcon}><FaCheckCircle /></span>dobijas sve za najbolje pare
                    </div>
                    <div className={styles.priceInclude}>
                        <span className={styles.priceIncludeIcon}><FaCheckCircle /></span>dobijas sve za najbolje pare
                    </div>
                    <div className={styles.priceInclude}>
                        <span className={styles.priceIncludeIcon}><FaCheckCircle /></span>dobijas sve za najbolje pare
                    </div>
                    <div className={styles.priceInclude}>
                        <span className={styles.priceIncludeIcon}><FaCheckCircle /></span>dobijas sve za najbolje pare
                    </div>
                    <div className={styles.priceInclude}>
                        <span className={styles.priceIncludeIcon}><FaCheckCircle /></span>dobijas sve za najbolje pare
                    </div>
                </div>
                <Link href="/arena"><div className={`${styles.primaryButton} primaryButton`}>Kupi odmah</div></Link>
            </div>
            <div className={styles.pricingCardSide}>
                <div className={styles.pricingCardMain}>
                    <div className={styles.priceDesc}>Pocetni</div>
                    <div className={styles.price}>1399.00 <span className={styles.pricePeriod}>/godisnje</span></div>
                    <div className={styles.priceCardDesc}>
                        Najpovoljniji paket takmicite se koliko volite
                    </div>
                    <div className={styles.priceInclude}>
                        <span className={styles.priceIncludeIcon}><FaCheckCircle /></span>dobijas sve za najbolje pare
                    </div>
                    <div className={styles.priceInclude}>
                        <span className={styles.priceIncludeIcon}><FaCheckCircle /></span>dobijas sve za najbolje pare
                    </div>
                    <div className={styles.priceInclude}>
                        <span className={styles.priceIncludeIcon}><FaCheckCircle /></span>dobijas sve za najbolje pare
                    </div>
                </div>
                <Link href="/arena"><div className={`${styles.primaryButton} primaryButton`}>Kupi odmah</div></Link>
            </div>
        </div>
    )
}