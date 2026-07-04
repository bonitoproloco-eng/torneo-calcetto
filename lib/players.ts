import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

export interface Player {
  id: string;
  name: string;
  teamId: string;
  number: number;
  goals: number;
  yellowCards: number;
  redCards: number;
}

export async function getPlayers(): Promise<Player[]> {
  const snapshot = await getDocs(collection(db, "players"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Player[];
}

export async function addPlayer(
  name: string,
  teamId: string,
  number: number
) {
  await addDoc(collection(db, "players"), {
    name,
    teamId,
    number,
    goals: 0,
    yellowCards: 0,
    redCards: 0,
  });
}

export async function deletePlayer(id: string) {
  await deleteDoc(doc(db, "players", id));
}
import {
  query,
  where,
} from "firebase/firestore";


export interface Player {
  id: string;
  name: string;
  number: number;
  teamId: string;
  goals: number;
  yellowCards: number;
  redCards: number;
}

export async function getPlayersByTeam(teamId: string) {
  const q = query(
    collection(db, "players"),
    where("teamId", "==", teamId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Player, "id">),
    }))
    .sort((a, b) => a.number - b.number);
}
import {  updateDoc, increment } from "firebase/firestore";

export async function addPlayerGoal(playerId: string) {
  await updateDoc(doc(db, "players", playerId), {
    goals: increment(1),
  });
}
export async function removePlayerGoal(playerId: string) {
  await updateDoc(doc(db, "players", playerId), {
    goals: increment(-1),
  });
}