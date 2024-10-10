// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Page from "./page";
// Exportação de Metadata
export const metadata: Metadata = {
  title: "Digital Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Page>{children}</Page>
      </body>
    </html>
  );
}
