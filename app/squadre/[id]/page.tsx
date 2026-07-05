import Header from "@/components/Header";
import { getAllTeams } from "@/lib/teams";
import { getPlayersByTeam } from "@/lib/players";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function TeamPage({ params }: Props) {
  const { id } = await params;

  const teams = await getAllTeams();
  const team = teams.find((t) => t.id === id);

  if (!team) {
    notFound();
  }

  const players = await getPlayersByTeam(id);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title={team.name}
        subtitle={`${players.length} giocatori`}
      />

      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">
              👥 Rosa
            </h2>
          </div>

          {players.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Nessun giocatore presente
            </div>
          ) : (
            players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between border-b last:border-b-0 p-4"
              >
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    {player.number}
                  </div>

                  <div className="font-semibold">
                    {player.name}
                  </div>

                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </main>
  );
}