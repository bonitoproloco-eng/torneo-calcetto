interface Match {
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
  status: string;
}

interface Team {
  id: string;
  name: string;
}

export interface Standing {
  teamId: string;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export function calculateStandings(
  teams: Team[],
  matches: Match[]
): Standing[] {
  const table: Record<string, Standing> = {};

  teams.forEach((team) => {
    table[team.id] = {
      teamId: team.id,
      teamName: team.name,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    };
  });

  matches
    .filter((m) => m.status === "finished")
    .forEach((match) => {
      const home = table[match.homeTeam];
      const away = table[match.awayTeam];

      home.played++;
      away.played++;

      home.goalsFor += match.homeGoals;
      home.goalsAgainst += match.awayGoals;

      away.goalsFor += match.awayGoals;
      away.goalsAgainst += match.homeGoals;

      if (match.homeGoals > match.awayGoals) {
        home.won++;
        home.points += 3;
        away.lost++;
      } else if (match.homeGoals < match.awayGoals) {
        away.won++;
        away.points += 3;
        home.lost++;
      } else {
        home.drawn++;
        away.drawn++;
        home.points++;
        away.points++;
      }

      home.goalDifference =
        home.goalsFor - home.goalsAgainst;

      away.goalDifference =
        away.goalsFor - away.goalsAgainst;
    });

  return Object.values(table).sort((a, b) => {
    if (b.points !== a.points)
      return b.points - a.points;

    if (b.goalDifference !== a.goalDifference)
      return b.goalDifference - a.goalDifference;

    return b.goalsFor - a.goalsFor;
  });
}