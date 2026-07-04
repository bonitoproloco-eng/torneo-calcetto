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

        {rounds.map((round) => (
          <div
            key={round}
            className="bg-white rounded-xl shadow mb-6"
          >
            <div className="bg-green-600 text-white px-5 py-3 rounded-t-xl font-bold">
              {round}ª Giornata
            </div>

            <div className="divide-y">
              {matches
                .filter((m) => m.round === round)
                .map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="w-2/5 font-semibold">
                      {teamMap[match.homeTeam]}
                    </div>

                    <div className="w-1/5 text-center font-bold">
                      {match.status === "finished"
                        ? `${match.homeGoals} - ${match.awayGoals}`
                        : "VS"}
                    </div>

                    <div className="w-2/5 text-right font-semibold">
                      {teamMap[match.awayTeam]}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

      </div>
    </main>
  );
}