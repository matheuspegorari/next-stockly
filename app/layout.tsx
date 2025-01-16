import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./_components/sidebar";
import { Toaster } from "./_components/ui/sonner";
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-full">
          <Sidebar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
