import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundFX from "./components/BackgroundFX";

export const metadata: Metadata = {
  title: "Elysian Ink — Appointment Only Tattoo Studio",
  description:
    "Elysian Ink is a solo appointment-only tattoo studio focused on custom work, clean lines, and a premium experience.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise">
        <BackgroundFX />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
