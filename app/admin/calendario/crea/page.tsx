"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CalendarEditor from "@/components/calendar-editor/CalendarEditor";
import { getAllTeams } from "@/lib/teams";
import { generateAllMatches } from "@/lib/utils/generateAllMatches";
import type { AvailableMatch } from "@/components/calendar-editor/AvailableMatches";

export default function CreaCalendarioPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [matches, setMatches] = useState<AvailableMatch[]>([]);

  useEffect(() => {
    async function load() {
      const teams = await getAllTeams();

      setTeams(teams);

      setMatches(generateAllMatches(teams));
    }

    load();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Crea Calendario"
        subtitle="Nuovo Torneo"
      />

      <div className="max-w-7xl mx-auto p-6">
        <CalendarEditor
          matches={matches}
          teams={teams}
        />
      </div>
    </main>
  );
}