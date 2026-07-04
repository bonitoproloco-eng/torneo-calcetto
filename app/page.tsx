import Header from "@/components/Header";
import { getTeams } from "@/lib/teams";

export default async function Home() {
  const teams = await getTeams();

  return (
    <main className="min-h-screen bg-gray-100">

      <Header
        title="Torneo Calcetto"
        subtitle="5 Squadre • Girone Unico"
      />

      <div className="max-w-md mx-auto p-4">

        <div className="bg-white rounded-xl shadow p-4">

          <h2 className="text-xl font-bold mb-4">
            🏆 Squadre
          </h2>

          <div className="space-y-2">

            {teams.map((team) => (
              <div
                key={team.id}
                className="flex items-center justify-between border rounded-lg p-3"
              >
                <div className="flex items-center gap-3">

                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: team.color }}
                  />

                  <span>{team.name}</span>

                </div>
              </div>
            ))}

          </div>

        </div>

      </div>

    </main>
  );
}