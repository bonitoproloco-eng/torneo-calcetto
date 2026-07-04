"use client";

import { useRouter } from "next/navigation";
import { deleteGoalEvent } from "@/lib/services/matches";

interface Props {
  matchId: string;
  event: any;
}

export default function GoalEvent({
  matchId,
  event,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm(
      `Eliminare il gol di ${event.playerName}?`
    );

    if (!ok) return;

    await deleteGoalEvent(
      matchId,
      event.createdAt
    );

    router.refresh();
  }

  return (
    <div className="border rounded-lg p-3 flex items-center justify-between">

      <div>

        <div className="font-semibold">
          ⚽ {event.playerName}
        </div>

        <div className="text-sm text-gray-500">
          Maglia #{event.number}
        </div>

      </div>

      <button
        onClick={handleDelete}
        className="text-red-600 text-2xl hover:scale-110 transition"
      >
        🗑️
      </button>

    </div>
  );
}