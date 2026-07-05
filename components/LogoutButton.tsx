"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    const ok = confirm("Vuoi uscire dall'area amministratore?");

    if (!ok) return;

    await signOut(auth);

    router.replace("/login");
  }

  return (
    <button
      onClick={logout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
    >
      🚪 Esci
    </button>
  );
}