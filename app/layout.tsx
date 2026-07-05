import "./globals.css";
import BottomNavigation from "@/components/BottomNavigation";
import { AuthProvider } from "@/components/AuthProvider";

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
        <AuthProvider>
          {children}
          <BottomNavigation />
        </AuthProvider>
      </body>
    </html>
  );
}