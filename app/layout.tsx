import "./globals.css";
import BottomNavigation from "@/components/BottomNavigation";

export const metadata = {
  title: "Torneo Calcetto",
  description: "Gestione torneo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        {children}
        <BottomNavigation />
      </body>
    </html>
  );
}