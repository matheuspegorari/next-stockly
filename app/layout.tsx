import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./_components/sidebar";
import { Toaster } from "./_components/ui/sonner";
import { ThemeProvider } from "./theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "auto" });

export const metadata: Metadata = {
  title: "Stockly",
  description:
    "Gerencie seu estoque de forma simples e eficiente com Stockly - A solução completa para controle de inventário",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex h-full">
            <div className="flex h-full bg-white shadow-lg transition-transform">
              <Sidebar />
            </div>
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
