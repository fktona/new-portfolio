import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ppArsenal } from "./fonts/font";
import Mouse from "./components/mouse";
import LandingProvider from "./context/landingCtx";
import Nav from "./components/nav";
import ScrollProvider from "./context/menuContext";
export const metadata: Metadata = {
  title: "Faith's Portfolio",
  description:
    "Portfolio of a software engineer , software developer , frontend developer , backend developer , fullstack developer , web developer , mobile developer , mobile app developer , software architect , software designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      <body
        className={`${ppArsenal.variable}   antialiased max-w-screen-2xl mx-auto   relative`}
      >
        <LandingProvider>
          <ScrollProvider>
            <Nav />
            {/* <EntryPage /> */}
            <Mouse>{children}</Mouse>
          </ScrollProvider>
        </LandingProvider>
      </body>
    </html>
  );
}
