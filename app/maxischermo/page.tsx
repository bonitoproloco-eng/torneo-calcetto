"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getTeams } from "@/lib/teams";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
  status: string;
  events?: any[];
}

export default function MaxischermoPage() {
  const [match, setMatch] = useState<Match | null>(null);
  const [teamMap, setTeamMap] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadTeams() {
      const teams = await getTeams();

      const map = Object.fromEntries(
        teams.map((t) => [t.id, t.name])
      );

      setTeamMap(map);
    }

    loadTeams();

    const unsubscribe = onSnapshot(
      collection(db, "matches"),
      (snapshot) => {
        const matches = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any),
        }));

        const live = matches.find(
          (m: any) => m.status === "live"
        );

        setMatch(live ?? null);
      }
    );

    return () => unsubscribe();
  }, []);

  if (!match) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-9xl mb-8">⚽</div>

          <h1 className="text-6xl font-bold">
            Nessuna partita LIVE
          </h1>
        </div>
      </main>
    );
  }

  const homeGoals = (match.events || []).filter(
    (e) => e.team === "home"
  );

  const awayGoals = (match.events || []).filter(
    (e) => e.team === "away"
  );

  return (
    <main className="min-h-screen bg-black text-white flex flex-col pt-4">

      {/* LIVE */}
      <div className="text-center">

        <div className="text-red-500 text-3xl font-extrabold animate-pulse">
          🔴 LIVE
        </div>

      </div>

      {/* Squadre */}
      <div className="grid grid-cols-2 mt-8 px-20 mb-6">

        <div className="text-center">
          <h2 className="text-7xl font-extrabold">
            {teamMap[match.homeTeam]}
          </h2>
        </div>

        <div className="text-center">
          <h2 className="text-7xl font-extrabold">
            {teamMap[match.awayTeam]}
          </h2>
        </div>

      </div>

      {/* Marcatori + Risultato */}
      <div className="grid grid-cols-3 items-center px-12">

        {/* CASA */}
        <div className="space-y-4 text-left">

          {homeGoals.map((goal, index) => (
            <div
              key={index}
              className="text-3xl font-semibold"
            >
              ⚽ {goal.playerName}
            </div>
          ))}

        </div>

        {/* RISULTATO */}
        <div className="flex justify-center items-center">

          <div className="text-[280px] font-black leading-none">
            {match.homeGoals}
          </div>

          <div className="text-7xl mx-6 font-bold">
            -
          </div>

          <div className="text-[280px] font-black leading-none">
            {match.awayGoals}
          </div>

        </div>

        {/* OSPITI */}
        <div className="space-y-4 text-right">

          {awayGoals.map((goal, index) => (
            <div
              key={index}
              className="text-3xl font-semibold"
            >
              ⚽ {goal.playerName}
            </div>
          ))}

        </div>

      </div>

    </main>
  );
}