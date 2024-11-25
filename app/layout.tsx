'use client'

import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    useEffect(() => {
      async function checkConnection() {
        const response = await fetch('/api/connect');
        const data = await response.json();
        console.log(data.message);
      }
      checkConnection();
    }, []);

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-dark-text`}>{children}</body>
    </html>
  )
}

