import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='layout'>
      <Head>
        <title>Crownn</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        Empty
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout