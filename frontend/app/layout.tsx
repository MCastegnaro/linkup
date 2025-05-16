import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AuthProvider } from "@/app/context/auth/AuthContext";
import { ToastProvider } from "@/app/context/toast/ToastContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkUp",
  description: "Personal Link Hub with Smart Customization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 antialiased`}>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
