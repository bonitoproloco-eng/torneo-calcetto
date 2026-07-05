"use client";

import { Trophy } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showLogout?: boolean;
}

export default function Header({
  title,
  subtitle,
  showLogout = false,
}: HeaderProps) {
  const router = useRouter();

  async function logout() {
    const ok = confirm(
      "Vuoi uscire dall'area amministratore?"
    );

    if (!ok) return;

    await signOut(auth);

    router.replace("/login");
  }

  return (
    <header className="bg-green-600 text-white rounded-b-3xl shadow-lg">
      <div className="max-w-md mx-auto px-5 py-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="bg-white/20 p-3 rounded-xl">
              <Trophy className="w-7 h-7" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                {title}
              </h1>

              {subtitle && (
                <p className="text-green-100 text-sm">
                  {subtitle}
                </p>
              )}
            </div>

          </div>

          {showLogout && (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
            >
              🚪 Esci
            </button>
          )}

        </div>

      </div>
    </header>
  );
}