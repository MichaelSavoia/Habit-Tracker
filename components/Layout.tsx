import React from 'react'
import Head from 'next/head'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>

      <style jsx global>
        {`
          * {
            box-sizing: border-box;
          }

          *:before *:after {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
              Helvetica, sans-serif;
            background: #F7FAFC;
            color: #1a202c;
          }

          button {
            cursor: pointer;
            transition: all 0.2s ease;
          }

          icon {
            transition: box-shadow: 0.2s ease;
          }

          input:focus,
          button:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
          }
        `}
      </style>
    </div>
  )
}

export default Layout
