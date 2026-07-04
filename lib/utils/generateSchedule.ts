interface Team {
  id: string;
  name: string;
}

export interface GeneratedMatch {
  round: number;
  homeTeam: string;
  awayTeam: string;
}

export function generateSchedule(teams: Team[]) {
  const list = [...teams];

  // Numero dispari → aggiunge il turno di riposo
  if (list.length % 2 !== 0) {
    list.push({
      id: "BYE",
      name: "Riposo",
    });
  }

  const rounds = list.length - 1;
  const matchesPerRound = list.length / 2;

  const schedule: GeneratedMatch[] = [];

  for (let round = 0; round < rounds; round++) {
    for (let i = 0; i < matchesPerRound; i++) {
      const home = list[i];
      const away = list[list.length - 1 - i];

      if (home.id !== "BYE" && away.id !== "BYE") {
        schedule.push({
          round: round + 1,
          homeTeam: home.id,
          awayTeam: away.id,
        });
      }
    }

    const last = list.pop();

    if (last) {
      list.splice(1, 0, last);
    }
  }

  return schedule;
}