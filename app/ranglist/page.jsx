
import styles from '@components/RangListCard/RangListCard.module.css'
import RangListCard from '@components/RangListCard/RangListCard'


const RangList = () => {

    return (
        <section className={styles.cardsMainSection}>
            <section className={styles.cardsSection}>
                <RangListCard mode = "all"/>
                <RangListCard mode = "all"/>
                <RangListCard mode = "all"/>
                <RangListCard mode = "all"/>
            </section>
        </section>
    )
}

export default RangList