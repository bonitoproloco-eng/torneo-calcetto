"use client";

import { useState } from "react";
import { getAllTeams } from "@/lib/teams";
import { generateSchedule } from "@/lib/utils/generateSchedule";
import {
  clearMatches,
  saveMatches,
} from "@/lib/services/matches";

export default function GeneraCalendarioPage() {
  const [loading, setLoading] = useState(false);

  async function genera() {
    try {
      setLoading(true);

      const teams = await getAllTeams();

      const schedule = generateSchedule(teams);

      await clearMatches();

      await saveMatches(schedule);

      alert("✅ Calendario generato!");

    } catch (e) {
      console.error(e);
      alert("Errore");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6">
          Genera Calendario
        </h1>

        <button
          onClick={genera}
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg p-4"
        >
          {loading ? "Generazione..." : "Genera calendario"}
        </button>

      </div>

    </main>
  );
}