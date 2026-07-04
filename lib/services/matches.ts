import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  arrayUnion,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";

export interface Match {
  id: string;
  round: number;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
  status: string;
}

export async function getMatches(): Promise<Match[]> {
  const snapshot = await getDocs(collection(db, "matches"));

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Match, "id">),
    }))
    .sort((a, b) => a.round - b.round);
}
export async function clearMatches() {
  const snapshot = await getDocs(collection(db, "matches"));

  console.log("Partite da eliminare:", snapshot.size);

  await Promise.all(
    snapshot.docs.map((d) =>
      deleteDoc(doc(db, "matches", d.id))
    )
  );

  console.log("Eliminazione completata");
}

export async function saveMatches(matches: any[]) {
  await Promise.all(
    matches.map((match) =>
      addDoc(collection(db, "matches"), {
        ...match,
        homeGoals: 0,
        awayGoals: 0,
        status: "scheduled",
        events: [],
      })
    )
  )
}
export async function startMatch(matchId: string) {
  // Controlla se esiste già una partita LIVE
  const snapshot = await getDocs(collection(db, "matches"));

  const liveMatch = snapshot.docs.find(
    (doc) =>
      doc.id !== matchId &&
      doc.data().status === "live"
  );

  if (liveMatch) {
    throw new Error("Esiste già una partita LIVE.");
  }

  const ref = doc(db, "matches", matchId);

  const matchSnapshot = await getDoc(ref);

  if (!matchSnapshot.exists()) return;

  const match = matchSnapshot.data() as any;

  // Riprendi da pausa
  if (match.status === "paused") {
    const pausedTime = Date.now() - match.pausedAt;

    await updateDoc(ref, {
      status: "live",
      pausedAt: null,
      pausedDuration: (match.pausedDuration ?? 0) + pausedTime,
    });

    return;
  }

  // Primo avvio
  await updateDoc(ref, {
    status: "live",
  });
}

export async function finishMatch(matchId: string) {
  await updateDoc(doc(db, "matches", matchId), {
    status: "finished",
    finishedAt: Date.now(),
  });
}
export async function pauseMatch(matchId: string) {
  await updateDoc(doc(db, "matches", matchId), {
    status: "paused",
    pausedAt: Date.now(),
  });
}

export async function addGoal(
  matchId: string,
  team: "home" | "away"
) {
  const ref = doc(db, "matches", matchId);

  await updateDoc(ref, {
    [team === "home"
      ? "homeGoals"
      : "awayGoals"]: increment(1),

    events: arrayUnion({
      type: "goal",
      team,
      minute: 0,
      createdAt: Date.now(),
    }),
  });
}
// Goal squadra di casa
export async function addHomeGoal(matchId: string) {
  const ref = doc(db, "matches", matchId);

  const event = {
    type: "goal",
    team: "home",
    createdAt: Date.now(),
  };

  await updateDoc(ref, {
    homeGoals: increment(1),
    events: arrayUnion(event),
  });
}

// Goal squadra ospite
export async function addAwayGoal(matchId: string) {
  const ref = doc(db, "matches", matchId);

  const event = {
    type: "goal",
    team: "away",
    createdAt: Date.now(),
  };

  await updateDoc(ref, {
    awayGoals: increment(1),
    events: arrayUnion(event),
  });
}


export async function addHomeGoalByPlayer(
  matchId: string,
  player: {
    id: string;
    name: string;
    number: number;
  }
) {
  const ref = doc(db, "matches", matchId);

  await updateDoc(ref, {
    homeGoals: increment(1),
    events: arrayUnion({
      type: "goal",
      team: "home",
      playerId: player.id,
      playerName: player.name,
      number: player.number,
      createdAt: Date.now(),
    }),
  });
}
export async function addAwayGoalByPlayer(
  matchId: string,
  player: {
    id: string;
    name: string;
    number: number;
  }
) {
  const ref = doc(db, "matches", matchId);

  await updateDoc(ref, {
    awayGoals: increment(1),
    events: arrayUnion({
      type: "goal",
      team: "away",
      playerId: player.id,
      playerName: player.name,
      number: player.number,
      createdAt: Date.now(),
    }),
  });
}
import { removePlayerGoal } from "../players";

export async function deleteGoalEvent(
  matchId: string,
  createdAt: number
) {
  const ref = doc(db, "matches", matchId);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return;

  const match = snapshot.data() as any;

  const events = [...(match.events || [])];

  const event = events.find(
    (e) => e.createdAt === createdAt
  );

  if (!event) return;

  const newEvents = events.filter(
    (e) => e.createdAt !== createdAt
  );

  const update: any = {
    events: newEvents,
  };

  if (event.team === "home") {
    update.homeGoals = Math.max(0, match.homeGoals - 1);
  } else {
    update.awayGoals = Math.max(0, match.awayGoals - 1);
  }

  await updateDoc(ref, update);

  if (event.playerId) {
    await removePlayerGoal(event.playerId);
  }
}

export async function restartMatch(matchId: string) {
  const ref = doc(db, "matches", matchId);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return;

  const match = snapshot.data() as any;

  // Rimuove i gol dai cannonieri
  for (const event of match.events ?? []) {
    if (event.playerId) {
      await removePlayerGoal(event.playerId);
    }
  }

  // Ripristina la partita
  await updateDoc(ref, {
    homeGoals: 0,
    awayGoals: 0,
    events: [],
    status: "scheduled",
  });
}