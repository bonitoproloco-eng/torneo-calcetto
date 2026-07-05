"use client";

import { useState } from "react";
import { getAllTeams } from "@/lib/teams";
import { generateSchedule } from "@/lib/utils/generateSchedule";
import {
  clearMatches,
  saveMatches,
} from "@/lib/services/matches";
import { resetPlayerGoals } from "@/lib/players";

export default function NuovoTorneoPage() {
  const [loading, setLoading] = useState(false);

  async function genera() {
    const ok = confirm(
      "⚠️ Creare un nuovo torneo?\n\n" +
      "Verranno eliminati:\n" +
      "• Tutte le partite\n" +
      "• Tutti i risultati\n" +
      "• Tutti i marcatori\n" +
      "• Classifica cannonieri\n\n" +
      "L'operazione non può essere annullata."
    );

    if (!ok) return;

    try {
      setLoading(true);

      const teams = await getAllTeams();

      const schedule = generateSchedule(teams);

      // Elimina tutte le partite
      await clearMatches();

      // Azzera i gol dei giocatori
      await resetPlayerGoals();
        
      // Azzera i goal
      await resetPlayerGoals();
      
      // Genera il nuovo calendario
      await saveMatches(schedule);

      alert("🏆 Nuovo torneo creato con successo!");

    } catch (e) {
      console.error(e);
      alert("Errore durante la creazione del torneo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2">
          🏆 Nuovo Torneo
        </h1>

        <p className="text-gray-500 mb-8">
          Verrà eliminato il torneo corrente e ne verrà creato uno nuovo.
        </p>

        <button
          onClick={genera}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 font-bold disabled:bg-gray-400"
        >
          {loading
            ? "Creazione torneo..."
            : "🔄 Crea nuovo torneo"}
        </button>

      </div>

    </main>
  );
}