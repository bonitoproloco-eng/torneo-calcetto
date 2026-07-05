"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push("/admin");

    } catch {
      alert("Email o password non corretti.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={login}
      className="space-y-4"
    >
      <div>
        <label className="font-semibold">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border rounded-lg p-3 mt-1"
          required
        />
      </div>

      <div>
        <label className="font-semibold">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border rounded-lg p-3 mt-1"
          required
        />
      </div>

      <button
        disabled={loading}
        className="w-full bg-green-600 text-white rounded-lg p-3 font-bold disabled:bg-gray-400"
      >
        {loading
          ? "Accesso..."
          : "Accedi"}
      </button>
    </form>
  );
}