"use client";

import { useRouter } from "next/navigation";
import { addHomeGoalByPlayer } from "@/lib/services/matches";
import { addPlayerGoal } from "@/lib/players";

interface Props {
  matchId: string;
  player: {
    id: string;
    name: string;
    number: number;
  };
}

export default function PlayerGoalButton({
  matchId,
  player,
}: Props) {
  const router = useRouter();

  async function handleClick() {
    await addHomeGoalByPlayer(matchId, player);
    await addPlayerGoal(player.id);

    router.push(`/admin/partite/${matchId}`);
    router.refresh();
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-white rounded-xl shadow p-4 hover:bg-green-50"
    >
      <div className="flex justify-between">
        <span className="font-bold">
          #{player.number}
        </span>

        <span>{player.name}</span>
      </div>
    </button>
  );
}