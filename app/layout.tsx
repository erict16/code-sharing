import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Outfit({ subsets: ["latin"] });

//const oufit = Outfit({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Code Sharing",
  description: "Share Your Code With Others Easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
      <body className={inter.className} style={{width:'100vw', backgroundColor: '#9b69ee'}}>{children}</body>
    </html>
  );
}
