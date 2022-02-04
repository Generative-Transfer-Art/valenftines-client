import Head from 'next/head'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren<Record<string, unknown>>) {
  return (
    <>
      <Head>
        <title>Valenftines</title>
        <meta name="description" content="A transfer art project" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>{children}</main>
    </>
  )
}
