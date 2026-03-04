"use client";
import "@/styles/globals.css";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header/Header";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const options = [
    {
      name: "Home",
      onClick: () => redirect("/"),
    },
    {
      name: "Add user",
      onClick: () => {
        redirect("/user/add");
      },
    },
  ];
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased h-full overflow-hidden`}
      >
        <SessionProvider>
          <Header options={options} />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
