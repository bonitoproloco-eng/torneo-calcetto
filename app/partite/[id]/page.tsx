import Header from "@/components/Header";
import { getMatchById } from "@/lib/services/matches";
import { getAllTeams } from "@/lib/teams";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function MatchPage({ params }: Props) {
  const { id } = await params;

  const match = await getMatchById(id);

  if (!match) {
    notFound();
  }

  const teams = await getAllTeams();

  const homeTeam = teams.find(
    (t) => t.id === match.homeTeam
  );

  const awayTeam = teams.find(
    (t) => t.id === match.awayTeam
  );

  const goals =
    (match.events ?? []).filter(
      (event: any) => event.type === "goal"
    );
    const homeGoals = goals.filter(
  (goal: any) => goal.team === "home"
);

const awayGoals = goals.filter(
  (goal: any) => goal.team === "away"
);

  return (
    <main className="min-h-screen bg-gray-100">

      <Header
        title="Dettaglio Partita"
        subtitle={`${match.day} • ${match.time}`}
      />

      <div className="max-w-lg mx-auto p-4 space-y-5">

        <div className="bg-white rounded-2xl shadow p-6">

          <div className="text-center">

            <div className="text-2xl font-bold">
              {homeTeam?.name}
            </div>

            <div className="text-6xl font-black my-5">
              {match.homeGoals} - {match.awayGoals}
            </div>

            <div className="text-2xl font-bold">
              {awayTeam?.name}
            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

  <h2 className="text-2xl font-bold mb-6 text-center">
    ⚽ Marcatori
  </h2>

  {goals.length === 0 ? (
    <div className="text-center text-gray-500 py-8">
      Nessun marcatore registrato
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-8">

      {/* Squadra di casa */}

      <div>

        <div
          className="font-bold text-center text-lg mb-4 border-b-4 pb-2"
          style={{
            borderColor: homeTeam?.color ?? "#16a34a",
          }}
        >
          {homeTeam?.name}
        </div>

        <div className="space-y-3">

          {homeGoals.length === 0 ? (
            <div className="text-center text-gray-400">
              Nessun gol
            </div>
          ) : (
            homeGoals.map((goal: any) => (
              <div
                key={goal.createdAt}
                className="flex items-center gap-2 rounded-lg bg-gray-50 p-3"
              >
                <span>⚽</span>

                <span className="font-medium">
                  {goal.playerName}
                </span>
              </div>
            ))
          )}

        </div>

      </div>

      {/* Squadra ospite */}

      <div>

        <div
          className="font-bold text-center text-lg mb-4 border-b-4 pb-2"
          style={{
            borderColor: awayTeam?.color ?? "#16a34a",
          }}
        >
          {awayTeam?.name}
        </div>

        <div className="space-y-3">

          {awayGoals.length === 0 ? (
            <div className="text-center text-gray-400">
              Nessun gol
            </div>
          ) : (
            awayGoals.map((goal: any) => (
              <div
                key={goal.createdAt}
                className="flex items-center gap-2 rounded-lg bg-gray-50 p-3"
              >
                <span>⚽</span>

                <span className="font-medium">
                  {goal.playerName}
                </span>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  )}

</div>

      </div>

    </main>
  );
}