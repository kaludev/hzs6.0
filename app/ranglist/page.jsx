
import styles from '@components/RangListCard/RangListCard.module.css'
import RangListCard from '@components/RangListCard/RangListCard'
import RangListCards from '@components/RangListCards/RangListCards'


const RangList = () => {
    return (
        <section className={styles.cardsMainSection}>
            <section className={styles.cardsSection}>
                <RangListCards />
            </section>
        </section>
    )
}

export default RangList