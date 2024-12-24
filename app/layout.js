import localFont from "next/font/local";
import "./globals.css";

import Footer from "../components/footer";
import Header from "../components/header";
import Provider from "@components/provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Buy Everything",
  description: "Your favourite E-commerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Header />
            {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
