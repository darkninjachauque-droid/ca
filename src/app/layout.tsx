import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Calculador de Megas',
  description: 'Calcule seus lucros de revenda de dados.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4540418582142311"
          crossOrigin="anonymous"
        ></script>
        {/* Ad Network Script 1 */}
        <script 
          async 
          data-cfasync="false" 
          src="https://pl29426261.profitablecpmratenetwork.com/eebc7bfa39a10201222044b33b6e34b8/invoke.js"
        ></script>
      </head>
      <body className="font-body antialiased overflow-x-hidden">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
        {/* Ad Network Script 2 (Bar) */}
        <script
          src="https://pl29426338.profitablecpmratenetwork.com/66/9f/39/669f397efe1137e72301009a24c87666.js"
          async
        ></script>
      </body>
    </html>
  );
}
