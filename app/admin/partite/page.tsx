import Link from "next/link";
import Header from "@/components/Header";
import { getMatches } from "@/lib/services/matches";
import { getTeams } from "@/lib/teams";

export default async function PartitePage() {
  const matches = await getMatches();
  const teams = await getTeams();

  const teamMap = Object.fromEntries(
    teams.map((team) => [team.id, team.name])
  );

  const rounds = [...new Set(matches.map((m) => m.round))];

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Partite"
        subtitle="Gestione partite del torneo"
      />

      <div className="max-w-3xl mx-auto p-4 space-y-6">

        {rounds.map((round) => (
          <div
            key={round}
            className="bg-white rounded-xl shadow"
          >
            <div className="bg-green-600 text-white px-5 py-3 rounded-t-xl font-bold">
              {round}ª Giornata
            </div>

            <div className="divide-y">

              {matches
                .filter((match) => match.round === round)
                .map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4"
                  >

                    <div className="w-2/5 font-semibold">
                      {teamMap[match.homeTeam]}
                    </div>

                    <div className="w-1/5 flex justify-center">

                      <Link
                        href={`/admin/partite/${match.id}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Gestisci
                      </Link>

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