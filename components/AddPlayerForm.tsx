"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { addPlayer } from "@/lib/players";

interface Team {
  id: string;
  name: string;
}

export default function AddPlayerForm() {
  const [teams, setTeams] = useState<Team[]>([]);

  const [name, setName] = useState("");
  const [number, setNumber] = useState(10);
  const [teamId, setTeamId] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "teams"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Team, "id">),
      }));

      setTeams(data);

      if (data.length > 0 && !teamId) {
        setTeamId(data[0].id);
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) return;

    await addPlayer(name, teamId, number);

    setName("");
    setNumber(10);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input
        className="w-full border rounded-lg p-3"
        placeholder="Nome giocatore"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        className="w-full border rounded-lg p-3"
        placeholder="Numero"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />

      <select
        className="w-full border rounded-lg p-3"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
      >
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>

      <button
        className="w-full bg-blue-600 text-white rounded-lg p-3"
      >
        Aggiungi giocatore
      </button>

    </form>
  );
}