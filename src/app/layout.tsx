import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SharedBackground from "@/components/SharedBackground";
import { WalletProvider } from "@/contexts/WalletContext";

export const metadata: Metadata = {
  title: "One-Shot Comics - NFT Digital Comics Platform",
  description: "Discover the future of digital comics. Mint, collect, and trade unique NFT comics in a decentralized universe where creators and fans unite.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <WalletProvider>
          <SharedBackground>
            <Navigation />
            <main className="flex-1" style={{ marginTop: '80px' }}>
              {children}
            </main>
            <Footer />
          </SharedBackground>
        </WalletProvider>
      </body>
    </html>
  );
}
