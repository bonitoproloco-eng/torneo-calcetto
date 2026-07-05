"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import MatchSlot from "./MatchSlot";
import { AvailableMatch } from "./AvailableMatches";
import SaveButton from "./SaveButton";
import { saveSchedule } from "@/lib/services/saveSchedule";

const DAYS = [
  { round: 1, day: "Mercoledì 8", date: "2026-07-08", slots: 2 },
  { round: 2, day: "Venerdì 10", date: "2026-07-10", slots: 2 },
  { round: 3, day: "Lunedì 13", date: "2026-07-13", slots: 2 },
  { round: 4, day: "Martedì 14", date: "2026-07-14", slots: 2 },
  { round: 5, day: "Mercoledì 15", date: "2026-07-15", slots: 2 },

  {
    round: 6,
    day: "Finale",
    date: "2026-07-17",
    slots: 1,
    final: true,
  },
];

const TIMES = ["20:30", "21:30"];

interface Props {
  matches: AvailableMatch[];
  teams: {
    id: string;
    name: string;
  }[];
}

export default function CalendarEditor({
  matches,
  teams,
}: Props) {
        const router = useRouter();
      const [calendar, setCalendar] = useState<
    Record<number, Record<string, AvailableMatch | null>>
 >({
  1: { "20:30": null, "21:30": null },
  2: { "20:30": null, "21:30": null },
  3: { "20:30": null, "21:30": null },
  4: { "20:30": null, "21:30": null },
  5: { "20:30": null, "21:30": null },

  6: { "20:30": null },
});

  const usedIds = useMemo(() => {
    return Object.values(calendar)
      .flatMap((r) => Object.values(r))
      .filter(Boolean)
      .map((m) => m!.id);
  }, [calendar]);

  function getMatchesForRound(round: number) {
    const matchesInRound = Object.values(calendar[round]).filter(
      Boolean
    ) as AvailableMatch[];

    const usedTeams = new Set<string>();

    matchesInRound.forEach((m) => {
      usedTeams.add(m.homeTeam);
      usedTeams.add(m.awayTeam);
    });

    return matches.filter((m) => {
      if (usedIds.includes(m.id)) return false;

      if (usedTeams.has(m.homeTeam)) return false;

      if (usedTeams.has(m.awayTeam)) return false;

      return true;
    });
  }

  function assignMatch(
    round: number,
    time: string,
    matchId: string
  ) {
    const match = matches.find((m) => m.id === matchId);

    if (!match) return;

    setCalendar((prev) => ({
      ...prev,
      [round]: {
        ...prev[round],
        [time]: match,
      },
    }));
  }

  function removeMatch(
    round: number,
    time: string
  ) {
    setCalendar((prev) => ({
      ...prev,
      [round]: {
        ...prev[round],
        [time]: null,
      },
    }));
  }
 function getRestingTeam(round: number) {
  const matchesInRound = Object.values(calendar[round]).filter(
    Boolean
  ) as AvailableMatch[];

  if (matchesInRound.length !== 2) {
    return null;
  }

  const playingTeams = new Set<string>();

  matchesInRound.forEach((match) => {
    playingTeams.add(match.homeTeam);
    playingTeams.add(match.awayTeam);
  });

  return teams.find((team) => !playingTeams.has(team.id)) ?? null;
}
async function saveCalendar() {
  const confirmed = window.confirm(
    "⚠️ Verranno eliminate tutte le partite attuali e sostituite con il nuovo calendario.\n\nVuoi continuare?"
  );

  if (!confirmed) {
    return;
  }

  await saveSchedule(calendar);

  alert("✅ Calendario salvato con successo!");

  router.push("/admin/partite");
}
  const assigned = usedIds.length;
  const total = matches.length;

  return (
    <>
      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <div className="flex justify-between mb-2">
          <span className="font-bold">
            Avanzamento
          </span>

          <span>
            {assigned} / {total}
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-gray-200">

          <div
            className="h-3 rounded-full bg-green-600"
            style={{
              width: `${(assigned / total) * 100}%`,
            }}
          />

        </div>

      </div>

      <div className="space-y-6">

        {DAYS.map((day) => (

          <div
            key={day.round}
            className="bg-white rounded-xl shadow p-5"
          >

            <h2 className="text-xl font-bold">
  {day.final
    ? "🏆 Finale"
    : `${day.round}ª Giornata`}
</h2>

            <p className="text-gray-500 mb-5">
              {day.day}
            </p>

            <div className="space-y-4">

                {TIMES.slice(0, day.slots).map((time) => (
                <MatchSlot
                  key={time}
                  time={time}
                  match={calendar[day.round][time]}
                  availableMatches={getMatchesForRound(
                    day.round
                  )}
                  onAssign={(id) =>
                    assignMatch(
                      day.round,
                      time,
                      id
                    )
                  }
                  onRemove={() =>
                    removeMatch(
                      day.round,
                      time
                    )
                  }
                />

              ))}

            </div>
{!day.final && getRestingTeam(day.round) && (
    <div className="mt-5 rounded-lg bg-yellow-50 border border-yellow-300 p-4 text-center font-semibold">
    💤 Riposa: {getRestingTeam(day.round)?.name}
  </div>
)}
          </div>

        ))}

            </div>

      <div className="mt-8">
        <SaveButton
          disabled={assigned !== total}
          onSave={saveCalendar}
        />
      </div>

    </>
  );
}