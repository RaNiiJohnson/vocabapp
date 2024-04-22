import { Header } from "@/features/layout/Header";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/theme/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vocabulary",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("h-full")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="max-w-xl m-auto space-y-4">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
