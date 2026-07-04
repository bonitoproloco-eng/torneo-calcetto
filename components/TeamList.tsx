"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  deleteTeam,
  updateTeam,
} from "@/lib/teams";
import { Trash2, Pencil } from "lucide-react";

interface Team {
  id: string;
  name: string;
  color: string;
}

export default function TeamList() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "teams"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Team, "id">),
        }));

        setTeams(data);
      }
    );

    return () => unsubscribe();
  }, []);

  async function handleDelete(team: Team) {
    const conferma = confirm(
      `Vuoi eliminare la squadra "${team.name}"?`
    );

    if (!conferma) return;

    await deleteTeam(team.id);
  }

  async function handleEdit(team: Team) {
    const nuovoNome = prompt(
      "Modifica nome squadra",
      team.name
    );

    if (!nuovoNome) return;

    if (nuovoNome.trim() === "") return;

    if (nuovoNome === team.name) return;

    await updateTeam(
      team.id,
      nuovoNome.trim()
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-bold mb-4">
        Squadre
      </h2>

      <div className="space-y-2">

        {teams.map((team) => (

          <div
            key={team.id}
            className="flex items-center justify-between border rounded-lg p-3"
          >

            <div className="flex items-center gap-3">

              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: team.color,
                }}
              />

              <span className="font-medium">
                {team.name}
              </span>

            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={() => handleEdit(team)}
                className="p-2 rounded hover:bg-gray-100"
                title="Modifica"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => handleDelete(team)}
                className="p-2 rounded text-red-600 hover:bg-red-50"
                title="Elimina"
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