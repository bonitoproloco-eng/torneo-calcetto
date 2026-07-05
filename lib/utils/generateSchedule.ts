interface Team {
  id: string;
  name: string;
}

export interface GeneratedMatch {
  round: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  day: string;
  time: string;
}

const ROUND_INFO = [
  {
    day: "Mercoledì 8",
    date: "2026-07-08",
  },
  {
    day: "Venerdì 10",
    date: "2026-07-10",
  },
  {
    day: "Lunedì 13",
    date: "2026-07-13",
  },
  {
    day: "Martedì 14",
    date: "2026-07-14",
  },
  {
    day: "Mercoledì 15",
    date: "2026-07-15",
  },
];

const TIMES = ["20:30", "21:30"];

export function generateSchedule(teams: Team[]) {
  const list = [...teams];

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
    let matchIndex = 0;

    for (let i = 0; i < matchesPerRound; i++) {
      const home = list[i];
      const away = list[list.length - 1 - i];

      if (home.id !== "BYE" && away.id !== "BYE") {
        schedule.push({
          round: round + 1,
          homeTeam: home.id,
          awayTeam: away.id,
          day: ROUND_INFO[round].day,
          date: ROUND_INFO[round].date,
          time: TIMES[matchIndex],
        });

        matchIndex++;
      }
    }

    const last = list.pop();

    if (last) {
      list.splice(1, 0, last);
    }
  }

  return schedule;
}