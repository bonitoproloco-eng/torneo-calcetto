import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getTeams } from "@/lib/teams";
import Header from "@/components/Header";
import Link from "next/link";
import MatchControls from "@/components/MatchControls";
import GoalEvent from "@/components/GoalEvent";
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function MatchPage({ params }: Props) {
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

  const match = {
    id: snapshot.id,
    ...(snapshot.data() as any),
  };

  const teams = await getTeams();

  const teamMap = Object.fromEntries(
    teams.map((team) => [team.id, team.name])
  );

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Gestione Partita"
        subtitle={`${teamMap[match.homeTeam]} vs ${teamMap[match.awayTeam]}`}
      />

      <div className="max-w-xl mx-auto p-5 space-y-5">

        {/* Risultato */}
        <div className="bg-white rounded-xl shadow p-6">

          <div className="text-center text-gray-500 mb-2">
            {match.round}ª Giornata
          </div>

          <div className="grid grid-cols-3 items-center">

            <div className="text-center">
              <h2 className="font-bold text-lg">
                {teamMap[match.homeTeam]}
              </h2>
            </div>

            <div className="text-center">

              <div className="text-4xl font-bold">
                {match.homeGoals} - {match.awayGoals}
              </div>

              <div className="mt-2">

                {match.status === "scheduled" && (
                  <span className="text-gray-500">
                    Da giocare
                  </span>
                )}

                {match.status === "live" && (
                  <span className="text-red-600 font-bold">
                    🔴 LIVE
                  </span>
                )}

                {match.status === "finished" && (
                  <span className="text-green-600 font-bold">
                    Terminata
                  </span>
                )}

              </div>

            </div>

            <div className="text-center">
              <h2 className="font-bold text-lg">
                {teamMap[match.awayTeam]}
              </h2>
            </div>

          </div>

        </div>

        {/* Azioni */}
        <div className="bg-white rounded-xl shadow p-5">

          <h3 className="font-bold text-lg mb-4">
            Azioni
          </h3>

          <MatchControls
  matchId={match.id}
  status={match.status}
/>
<div className="bg-white rounded-xl shadow p-5">

  <h2 className="text-xl font-bold mb-4">
    Eventi
  </h2>

  {match.events?.length ? (

    <div className="space-y-2">

      {[...match.events]
        .reverse()
        .map((event: any, index: number) => (

  <GoalEvent
  key={event.createdAt}
  matchId={match.id}
  event={event}
/>

        ))}

    </div>

  ) : (

    <p className="text-gray-500">
      Nessun evento.
    </p>

  )}

</div>

        </div>

        <Link
          href="/admin/partite"
          className="block text-center bg-gray-800 text-white rounded-lg p-3"
        >
          ← Torna alle partite
        </Link>

      </div>
    </main>
  );
}