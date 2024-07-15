import './globals.css';

import { Inter } from 'next/font/google';

import { Providers } from '@/app/providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}