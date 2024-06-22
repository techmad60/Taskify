import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Taskify",
  description: "Designed and built with love by Techmad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
