interface Team {
  id: string;
  name: string;
}

export interface AvailableMatch {

  id: string;

  homeTeam: string;

  awayTeam: string;

  homeTeamName: string;

  awayTeamName: string;

  label: string;

}

export function generateAllMatches(
  teams: Team[]
): AvailableMatch[] {
  const matches: AvailableMatch[] = [];

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({
  id: `${teams[i].id}-${teams[j].id}`,

  homeTeam: teams[i].id,
  awayTeam: teams[j].id,

  homeTeamName: teams[i].name,
  awayTeamName: teams[j].name,

  label: `${teams[i].name} vs ${teams[j].name}`,
});
    }
  }

  return matches;
}