export const dynamic = "force-dynamic";

import Link from "next/link";
import { getMatches } from "@/lib/services/matches";
import { getTeams } from "@/lib/teams";

export default async function CalendarioPage() {
  const matches = await getMatches();
  const teams = await getTeams();

  const teamMap = Object.fromEntries(
    teams.map((t) => [t.id, t.name])
  );

  const rounds = [...new Set(matches.map((m) => m.round))];

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          📅 Calendario
        </h1>

        {rounds.map((round) => {
          const roundMatches = matches
            .filter((m) => m.round === round)
            .sort((a, b) => a.time.localeCompare(b.time));

          const playingTeams = new Set(
            roundMatches.flatMap((m) => [
              m.homeTeam,
              m.awayTeam,
            ])
          );

          const restingTeam = teams.find(
            (team) => !playingTeams.has(team.id)
          );

          return (
            <div
              key={round}
              className="bg-white rounded-xl shadow mb-6 overflow-hidden"
            >
              <div className="bg-green-600 text-white px-5 py-4 flex justify-between items-start">

                <div>
                  <div className="text-2xl font-bold">
                    {round}ª Giornata
                  </div>

                  <div className="text-green-100">
                    {roundMatches[0]?.day}
                  </div>
                </div>

                {restingTeam && (
                  <div className="text-right">
                    <div className="text-green-100 text-sm">
                      💤 Riposa
                    </div>

                    <div className="font-bold">
                      {restingTeam.name}
                    </div>
                  </div>
                )}

              </div>

              <div className="divide-y">

                {roundMatches.map((match) => {

                  const isFinished =
                    match.status === "finished";

                  const card = (
                    <div
                      className={`p-4 transition ${
                        isFinished
                          ? "hover:bg-gray-50 cursor-pointer"
                          : ""
                      }`}
                    >

                      <div className="text-center text-sm text-gray-500 mb-3">
                        🕣 {match.time}
                      </div>

                      <div className="flex items-center justify-between">

                        <div className="w-2/5 font-semibold">
                          {teamMap[match.homeTeam]}
                        </div>

                        <div className="w-1/5 text-center font-bold text-lg">

                          {isFinished
                            ? `${match.homeGoals} - ${match.awayGoals}`
                            : "VS"}

                        </div>

                        <div className="w-2/5 text-right font-semibold">
                          {teamMap[match.awayTeam]}
                        </div>

                      </div>

                      {isFinished && (
                        <div className="mt-3 text-center text-sm font-semibold text-green-600">
                          👁️ Vedi marcatori
                        </div>
                      )}

                    </div>
                  );

                  if (!isFinished) {
                    return (
                      <div key={match.id}>
                        {card}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={match.id}
                      href={`/partite/${match.id}`}
                    >
                      {card}
                    </Link>
                  );

                })}

              </div>

            </div>
          );
        })}

      </div>
    </main>
  );
}