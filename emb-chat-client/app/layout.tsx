'user client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStateProvider } from '@/app/context/GlobalStateContext';
import Box from '@mui/material/Box';
import React from 'react';
import HeaderMessage from './components/header/HeaderMessage';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chat|Reestablish the Bridge',
  description: 'Reestablish the Bridge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <GlobalStateProvider>
        <body className={inter.className}>
          <CssBaseline />
          {children}
        </body>
      </GlobalStateProvider>
    </html>
  );
}
