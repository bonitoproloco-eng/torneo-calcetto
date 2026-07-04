import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

export interface Match {
  id: string;
  round: number;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
  date: string;
  status: "scheduled" | "live" | "finished";
}

export async function getMatches(): Promise<Match[]> {
  const snapshot = await getDocs(collection(db, "matches"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Match[];
}

export async function addMatch(match: Omit<Match, "id">) {
  await addDoc(collection(db, "matches"), match);
}

export async function deleteAllMatches() {
  const snapshot = await getDocs(collection(db, "matches"));

  await Promise.all(
    snapshot.docs.map((d) => deleteDoc(doc(db, "matches", d.id)))
  );
}