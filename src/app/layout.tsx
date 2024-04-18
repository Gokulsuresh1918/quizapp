"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import useQuiz from "./_store";
import quiz from "@/app/@quiz/page";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  quiz,
}: Readonly<{
  children: React.ReactNode;
  quiz: React.ReactNode;
}>) {
  
  const config = useQuiz((state) => state.config);
  console.log("hello", config.status.length);

  let render = config.status ? quiz : children;
  return (
    <html lang="en">
      <body className={inter.className}>{render}</body>
    </html>
  );
}
