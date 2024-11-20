"use client";

import { useEffect } from 'react';
import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
