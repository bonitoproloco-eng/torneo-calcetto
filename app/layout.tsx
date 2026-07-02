import "./globals.css";
import Navbar from "@/components/Navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "Torneo Calcetto",
  description: "Gestione torneo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={cn("font-sans", geist.variable)}>
      <body className="pb-20 bg-gray-100">
        {children}
        <Navbar />
      </body>
    </html>
  );
}