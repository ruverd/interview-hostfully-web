import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { PageFooter } from '@/components/page-footer';
import { PageHeader } from '@/components/page-header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/style';
import { ThemeProvider } from '@/providers/theme-provider';

import '@/styles/globals.css';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Hostfully',
  description: 'Award Winning Vacation Rental Software',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='relative min-h-screen flex flex-col bg-background'>
            <PageHeader />
            <main className='flex-1'>{children}</main>
            <PageFooter />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
