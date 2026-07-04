import { getPlayers } from "@/lib/players";
import { getTeams } from "@/lib/teams";

export default async function CannonieriPage() {
  const players = await getPlayers();
  const teams = await getTeams();

  const teamMap = Object.fromEntries(
    teams.map((team) => [team.id, team.name])
  );

  const ranking = players
    .sort((a, b) => b.goals - a.goals)
    .filter((player) => player.goals > 0);

  return (
    <main className="min-h-screen bg-gray-100">

      <div className="max-w-xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          🏆 Classifica Cannonieri
        </h1>

        {ranking.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-6 text-center">
            Nessun gol registrato.
          </div>

        ) : (

          <div className="space-y-3">

            {ranking.map((player, index) => (

              <div
                key={player.id}
                className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
              >

                <div>

                  <div className="font-bold">
                    #{index + 1} · {player.name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {teamMap[player.teamId]}
                  </div>

                </div>

                <div className="text-3xl font-bold text-green-600">
                  ⚽ {player.goals}
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}