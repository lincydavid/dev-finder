import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Finder",
  description: "Created by lincy david for finding dev from github",
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
