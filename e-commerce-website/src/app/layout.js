import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import ThemeRegistry from "../components/ThemeRegistry";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "LuxeMart | Premium E-Commerce Experience",
  description: "Explore curated quality items, manage custom products, and complete mock orders seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable}`}>
      <body>
        <ThemeRegistry>
          <AppProvider>
            <Navbar />
            <main className="app-main-container">{children}</main>
            <Footer />
          </AppProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}


