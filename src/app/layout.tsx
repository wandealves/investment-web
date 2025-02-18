"use client"; // Diretiva para tornar este arquivo um Client Component

import { AppProvider, useApp } from "@/providers/appContext";
import Sidebar from "@/components/Sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* O AppProvider deve envolver a aplicação inteira */}
        <AppProvider>
          <MainContent>{children}</MainContent>
        </AppProvider>
      </body>
    </html>
  );
}

// Componente que usa o contexto de estado
const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed, isMobileOpen } = useApp();

  // Lógica para determinar a classe dinâmica de margin-left
  const mlClass = isMobileOpen
    ? "lg:ml-64"
    : isCollapsed
    ? "lg:ml-20"
    : "lg:ml-64"; // Corrigido de "g:ml-64" para "lg:ml-64"

  return (
    <div>
      <Sidebar />
      <main className={`p-4 transition-all duration-300 ${mlClass}`}>
        {children}
      </main>
    </div>
  );
};
