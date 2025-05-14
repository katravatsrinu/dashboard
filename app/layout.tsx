import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from '@/lib/auth-context'; // 👈 import the AuthProvider

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  description: 'Comprehensive Analytics Dashboard with Weather, News, and Finance data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider> {/* 👈 Wrap with AuthProvider */}
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
