import Link from "next/link";
import Header from "@/components/Header";
import { getTeams } from "@/lib/teams";
import { getPlayers } from "@/lib/players";
import { getMatches } from "@/lib/services/matches";
import {
  Users,
  User,
  CalendarDays,
} from "lucide-react";

const items = [
  {
    title: "Squadre",
    subtitle: "Gestisci le squadre",
    href: "/admin/squadre",
    icon: Users,
    color: "bg-green-600",
  },
  {
    title: "Giocatori",
    subtitle: "Gestisci i giocatori",
    href: "/admin/giocatori",
    icon: User,
    color: "bg-blue-600",
  },
  {

    title: "Nuovo Torneo",

    subtitle: "Azzera e crea il nuovo torneo",

    href: "/admin/calendario/genera",

    icon: CalendarDays,

    color: "bg-indigo-600",

  },
  {
    title: "Partite",
    subtitle: "Calendario e risultati",
    href: "/admin/partite",
    icon: CalendarDays,
    color: "bg-orange-500",
  },
];

export default async function AdminPage() {
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
    return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Admin"
        subtitle="Pannello di controllo"
        showLogout
      />
      <div className="max-w-md mx-auto p-4">

  <div className="bg-white rounded-xl shadow p-5 mb-5">

    <h2 className="font-bold text-xl mb-4">
      📊 Statistiche
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

  {liveMatch && (

  <Link href={`/admin/partite/${liveMatch.id}`}>

    <div className="bg-red-600 text-white rounded-xl p-5 mb-5 hover:bg-red-700 transition cursor-pointer">

      <div className="text-center">

        <div className="text-xl font-bold mb-3 animate-pulse">
          🔴 PARTITA LIVE
        </div>

        <div className="text-2xl font-bold">
          {liveHomeTeam?.name}
        </div>

        <div className="text-5xl font-black my-4">
          {liveMatch.homeGoals} - {liveMatch.awayGoals}
        </div>

        <div className="text-2xl font-bold">
          {liveAwayTeam?.name}
        </div>

        <div className="mt-5 inline-block bg-white text-red-600 px-4 py-2 rounded-lg font-bold">
          Apri gestione →
        </div>

      </div>

    </div>

  </Link>

)}

</div>
      <div className="max-w-md mx-auto p-4 space-y-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:shadow-lg transition cursor-pointer">

                <div>
                  <h2 className="font-bold text-lg">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {item.subtitle}
                  </p>
                </div>

                <div className={`${item.color} p-3 rounded-xl text-white`}>
                  <Icon size={24} />
                </div>

              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}