import Header from "@/components/Header";
import { getTeams } from "@/lib/teams";
import { getMatches } from "@/lib/services/matches";
import { getPlayers } from "@/lib/players";
import Link from "next/link";

export default async function Home() {
  const teams = await getTeams();
  const players = await getPlayers();
  const matches = await getMatches();

  const totalGoals = matches.reduce(
    (sum, match) => sum + match.homeGoals + match.awayGoals,
    0
  );

  const liveMatch = matches.find(
    (match) => match.status === "live"
  );

  const liveHomeTeam = liveMatch
    ? teams.find((t) => t.id === liveMatch.homeTeam)
    : null;

  const liveAwayTeam = liveMatch
    ? teams.find((t) => t.id === liveMatch.awayTeam)
    : null;

  const nextMatch = matches.find(
    (match) => match.status === "scheduled"
  );

  const nextHomeTeam = nextMatch
    ? teams.find((t) => t.id === nextMatch.homeTeam)
    : null;

  const nextAwayTeam = nextMatch
    ? teams.find((t) => t.id === nextMatch.awayTeam)
    : null;

  return (
    <main className="min-h-screen bg-gray-100">

      <Header
        title="Torneo Calcetto"
        subtitle={`${teams.length} Squadre • Girone Unico`}
      />

      <div className="max-w-md mx-auto p-4 space-y-5">

        {/* LIVE */}
        {liveMatch && (
          <Link href="/maxischermo">
            <div className="bg-red-600 text-white rounded-xl shadow p-5 hover:bg-red-700 transition">

              <div className="text-center">

                <div className="text-xl font-bold animate-pulse">
                  🔴 PARTITA LIVE
                </div>

                <div className="mt-4 text-2xl font-bold">
                  {liveHomeTeam?.name}
                </div>

                <div className="text-6xl font-black my-4">
                  {liveMatch.homeGoals} - {liveMatch.awayGoals}
                </div>

                <div className="text-2xl font-bold">
                  {liveAwayTeam?.name}
                </div>

                <div className="mt-5 bg-white text-red-600 rounded-lg py-2 font-bold">
                  Segui la partita →
                </div>

              </div>

            </div>
          </Link>
        )}

        {/* PROSSIMA PARTITA */}
        {!liveMatch && nextMatch && (
          <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-xl font-bold mb-4">
              📅 Prossima partita
            </h2>

            <div className="text-center">

              <div className="text-2xl font-bold">
                {nextHomeTeam?.name}
              </div>

              <div className="text-gray-400 text-xl my-2">
                VS
              </div>

              <div className="text-2xl font-bold">
                {nextAwayTeam?.name}
              </div>

            </div>

          </div>
        )}

        {/* STATISTICHE */}
        <div className="bg-white rounded-xl shadow p-5">

          <h2 className="text-xl font-bold mb-4">
            📊 Torneo
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <div className="text-gray-500 text-sm">
                Squadre
              </div>

              <div className="text-3xl font-bold">
                {teams.length}
              </div>
            </div>

            <div>
              <div className="text-gray-500 text-sm">
                Giocatori
              </div>

              <div className="text-3xl font-bold">
                {players.length}
              </div>
            </div>

            <div>
              <div className="text-gray-500 text-sm">
                Partite
              </div>

              <div className="text-3xl font-bold">
                {matches.length}
              </div>
            </div>

            <div>
              <div className="text-gray-500 text-sm">
                Goal
              </div>

              <div className="text-3xl font-bold">
                {totalGoals}
              </div>
            </div>

          </div>

        </div>

        {/* SQUADRE */}
        <div className="bg-white rounded-xl shadow p-5">

          <h2 className="text-xl font-bold mb-4">
            👥 Squadre partecipanti
          </h2>

          <div className="space-y-2">

            {teams.map((team) => (
  <Link
    key={team.id}
    href={`/squadre/${team.id}`}
  >
    <div className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer">

      <div className="flex items-center gap-3">

        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: team.color }}
        />

        <div>
          <div className="font-semibold">
            {team.name}
          </div>

          <div className="text-sm text-gray-500">
            Tocca per vedere la rosa
          </div>
        </div>

      </div>

      <div className="text-2xl text-gray-400">
        →
      </div>

    </div>
  </Link>
))}

          </div>

        </div>

      </div>

    </main>
  );
}