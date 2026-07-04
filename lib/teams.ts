import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Team {
  id: string;
  name: string;
  logo?: string;
  color?: string;
}

export async function getTeams(): Promise<Team[]> {
  const snapshot = await getDocs(collection(db, "teams"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Team[];
}

export async function addTeam(name: string) {
  return await addDoc(collection(db, "teams"), {
    name,
    logo: "",
    color: "#16a34a",
  });
}
export async function deleteTeam(id: string) {

  await deleteDoc(doc(db, "teams", id));

}
export async function updateTeam(
  id: string,
  name: string
) {
  await updateDoc(doc(db, "teams", id), {
    name,
  });
}
export async function getTeamsIds() {
  const snapshot = await getDocs(collection(db, "teams"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as any),
  }));
}
export async function getAllTeams() {

  const snapshot = await getDocs(collection(db, "teams"));

  return snapshot.docs.map((doc) => ({

    id: doc.id,

    ...(doc.data() as Omit<Team, "id">),

  })) as Team[];

}