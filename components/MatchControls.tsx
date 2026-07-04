"use client";

import {
  startMatch,
  pauseMatch,
  finishMatch,
  restartMatch,
} from "@/lib/services/matches";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  matchId: string;
  status: string;
}

export default function MatchControls({
  matchId,
  status,
}: Props) {
  const router = useRouter();

  async function refresh() {
    router.refresh();
  }

  async function handleStart() {
  try {
    await startMatch(matchId);
    refresh();
  } catch (error: any) {
    alert(error.message);
  }
}

  async function handlePause() {
    await pauseMatch(matchId);
    refresh();
  }

  async function handleFinish() {
    const ok = confirm(
      "Terminare la partita?"
    );

    if (!ok) return;

    await finishMatch(matchId);
    refresh();
  }
  async function handleRestart() {
  const ok = confirm(
    "Riavviare la partita?\n\nVerranno cancellati risultato e marcatori."
  );

  if (!ok) return;

  await restartMatch(matchId);
  router.refresh();
}
  return (
    <div className="grid grid-cols-2 gap-3">

      {/* Avvia */}
      {status === "scheduled" && (
        <button
          onClick={handleStart}
          className="col-span-2 bg-green-600 text-white rounded-lg p-3 font-bold"
        >
          ▶️ Avvia partita
        </button>
      )}

      {/* Live */}
      {status === "live" && (
        <>
          <button
            onClick={handlePause}
            className="bg-yellow-500 text-white rounded-lg p-3 font-bold"
          >
            ⏸️ Pausa
          </button>

          <button
            onClick={handleFinish}
            className="bg-red-600 text-white rounded-lg p-3 font-bold"
          >
            🏁 Termina
          </button>

          <Link
            href={`/admin/partite/${matchId}/goal/home`}
            className="bg-blue-600 text-white rounded-lg p-3 text-center font-bold"
          >
            ⚽ Goal Casa
          </Link>

          <Link
            href={`/admin/partite/${matchId}/goal/away`}
            className="bg-orange-600 text-white rounded-lg p-3 text-center font-bold"
          >
            ⚽ Goal Ospiti
          </Link>
        </>
      )}

      {/* Pausa */}
      {status === "paused" && (
        <>
          <button
            onClick={handleStart}
            className="bg-green-600 text-white rounded-lg p-3 font-bold"
          >
            ▶️ Riprendi
          </button>

          <button
            onClick={handleFinish}
            className="bg-red-600 text-white rounded-lg p-3 font-bold"
          >
            🏁 Termina
          </button>

          <button
            disabled
            className="bg-gray-300 text-gray-500 rounded-lg p-3"
          >
            ⚽ Goal Casa
          </button>

          <button
            disabled
            className="bg-gray-300 text-gray-500 rounded-lg p-3"
          >
            ⚽ Goal Ospiti
          </button>
        </>
      )}

      {/* Terminata */}
      {status === "finished" && (
  <>
    <div className="col-span-2 bg-green-600 text-white rounded-lg p-4 text-center font-bold text-lg">
      ✔ Partita terminata
    </div>

    <button
      onClick={handleRestart}
      className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 font-bold"
    >
      🔄 Riavvia partita
    </button>
  </>
)}

    </div>
  );
}