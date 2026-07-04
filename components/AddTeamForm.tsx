"use client";

import { useState } from "react";
import { addTeam } from "@/lib/teams";

export default function AddTeamForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) return;

    setLoading(true);

    await addTeam(name);

    setName("");

    setLoading(false);

    alert("Squadra aggiunta!");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome squadra"
        className="w-full border rounded-lg p-3"
      />

      <button
        className="w-full bg-green-600 text-white rounded-lg p-3"
      >
        {loading ? "Salvataggio..." : "Aggiungi squadra"}
      </button>

    </form>
  );
}