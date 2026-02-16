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
    <html lang="en" className="h-full">
      <body className="noise min-h-screen overflow-x-hidden">
        <div className="relative flex min-h-screen flex-col">
          <BackgroundFX />
          <Header />

          {/* main grows, footer stays right after content */}
          <main className="relative z-10 flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
