import Head from 'next/head'
import { PropsWithChildren } from 'react'

import styles from './Layout.module.scss'

interface LayoutProps {
  mainClass?: string
}

export default function Layout({ children, mainClass }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <Head>
        <title>Valenftines</title>
        <meta name="description" content="A transfer art project" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={`${styles.wrapper} ${mainClass}`}>{children}</main>
    </>
  )
}
