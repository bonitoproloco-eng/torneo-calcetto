"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { deletePlayer } from "@/lib/players";
import { Pencil, Trash2 } from "lucide-react";

interface Player {
  id: string;
  name: string;
  number: number;
  teamId: string;
  goals: number;
}

interface Team {
  id: string;
  name: string;
}

export default function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const unsubPlayers = onSnapshot(
      collection(db, "players"),
      (snapshot) => {
        setPlayers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Player, "id">),
          }))
        );
      }
    );

    const unsubTeams = onSnapshot(
      collection(db, "teams"),
      (snapshot) => {
        setTeams(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Team, "id">),
          }))
        );
      }
    );

    return () => {
      unsubPlayers();
      unsubTeams();
    };
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Eliminare questo giocatore?")) return;

    await deletePlayer(id);
  }

  function getTeamName(teamId: string) {
    return teams.find((t) => t.id === teamId)?.name || "-";
  }

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-bold mb-4">
        Giocatori
      </h2>

      <div className="space-y-2">

        {players.map((player) => (

          <div
            key={player.id}
            className="border rounded-xl p-3 flex justify-between items-center"
          >

            <div>

              <div className="font-semibold">
                {player.name}
              </div>

              <div className="text-sm text-gray-500">
                {getTeamName(player.teamId)}
              </div>

            </div>

            <div className="flex items-center gap-3">

              <span className="font-bold">
                #{player.number}
              </span>

              <span>
                ⚽ {player.goals}
              </span>

              <button>
                <Pencil size={18} />
              </button>

              <button
                onClick={() => handleDelete(player.id)}
                className="text-red-600"
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}