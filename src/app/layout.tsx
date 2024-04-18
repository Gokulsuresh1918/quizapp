
'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import useQuiz from "./store";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
  quiz
}: Readonly<{
  children: React.ReactNode;
  quiz: React.ReactNode;
}>) {
  const config=useQuiz(state=>state.config)
  // console.log(config.status.length);
  
  let render=config.status?quiz:children
  return (
    <html lang="en">
      <body className={inter.className}>{render}</body>
    </html>
  );
}
