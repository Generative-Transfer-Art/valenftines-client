import Heart from 'components/Heart'
import type { NextPage } from 'next'

import Layout from '../components/Layout'
import styles from '../styles/Home.module.scss'

const HEART_MATRIX = new Array(6).fill(new Array(12).fill(<Heart />))

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          {HEART_MATRIX.map((heartArray, i) => (
            <div key={`heart-row-${i}`} className={styles.heartRow}>
              {heartArray}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home
