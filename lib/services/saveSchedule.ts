import {
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { AvailableMatch } from "@/components/calendar-editor/AvailableMatches";

const DAYS = [
  {
    round: 1,
    day: "Mercoledì 8",
    date: "2026-07-08",
    slots: ["20:30", "21:30"],
  },
  {
    round: 2,
    day: "Venerdì 10",
    date: "2026-07-10",
    slots: ["20:30", "21:30"],
  },
  {
    round: 3,
    day: "Lunedì 13",
    date: "2026-07-13",
    slots: ["20:30", "21:30"],
  },
  {
    round: 4,
    day: "Martedì 14",
    date: "2026-07-14",
    slots: ["20:30", "21:30"],
  },
  {
    round: 5,
    day: "Mercoledì 15",
    date: "2026-07-15",
    slots: ["20:30", "21:30"],
  },
  {
    round: 6,
    day: "Finale",
    date: "2026-07-17",
    slots: ["20:30"],
  },
];

export async function saveSchedule(
  calendar: Record<number, Record<string, AvailableMatch | null>>
)
 {
  // elimina tutte le vecchie partite

  const snapshot = await getDocs(collection(db, "matches"));

  for (const document of snapshot.docs) {
    await deleteDoc(doc(db, "matches", document.id));
  }

  // crea il nuovo calendario

  for (const day of DAYS) {
    for (const time of day.slots) {
      const match = calendar[day.round][time];

      if (!match) continue;

      await addDoc(collection(db, "matches"), {
        round: day.round,
        day: day.day,
        date: day.date,
        time,

        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,

        homeGoals: 0,
        awayGoals: 0,

        status: "scheduled",

        events: [],
      });
    }
  }
}