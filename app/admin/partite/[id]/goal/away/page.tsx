import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getPlayers } from "@/lib/players";
import PlayerAwayGoalButton from "@/components/PlayerAwayGoalButton";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AwayGoalPage({ params }: Props) {
  const { id } = await params;

  const snapshot = await getDoc(doc(db, "matches", id));

  if (!snapshot.exists()) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Partita non trovata
        </h1>
      </main>
    );
  }

  const match = snapshot.data() as any;

  const allPlayers = await getPlayers();

  const players = allPlayers.filter(
    (player) => player.teamId === match.awayTeam
  );

  return (
    <main className="min-h-screen bg-gray-100 p-5">

      <div className="max-w-md mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          ⚽ Chi ha segnato?
        </h1>

        {players.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-5 text-center">
            <p className="text-red-600 font-bold">
              Nessun giocatore trovato.
            </p>

            <p className="text-gray-500 mt-2">
              Team: {match.awayTeam}
            </p>
          </div>
        ) : (
          <div className="space-y-3">

            {players.map((player) => (
              <PlayerAwayGoalButton
                key={player.id}
                matchId={id}
                player={player}
              />
            ))}

          </div>
        )}

      </div>

    </main>
  );
}