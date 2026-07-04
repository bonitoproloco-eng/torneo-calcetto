import { getMatches } from "@/lib/services/matches";
import { getTeams } from "@/lib/teams";
import { calculateStandings } from "@/lib/utils/calculateStandings";

export default async function ClassificaPage() {
  const teams = await getTeams();
  const matches = await getMatches();

  const standings = calculateStandings(teams, matches);

  return (
    <main className="min-h-screen bg-gray-100 p-5">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          🏆 Classifica
        </h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-green-600 text-white">

              <tr>
                <th className="p-3 text-left">#</th>
                <th className="text-left">Squadra</th>
                <th>Pt</th>
                <th>G</th>
                <th>V</th>
                <th>N</th>
                <th>P</th>
                <th>GF</th>
                <th>GS</th>
                <th>DR</th>
              </tr>

            </thead>

            <tbody>

              {standings.map((team, index) => (

                <tr
                  key={team.teamId}
                  className="border-b last:border-0"
                >

                  <td className="p-3 font-bold">
                    {index + 1}
                  </td>

                  <td className="font-semibold">
                    {team.teamName}
                  </td>

                  <td className="text-center font-bold">
                    {team.points}
                  </td>

                  <td className="text-center">
                    {team.played}
                  </td>

                  <td className="text-center">
                    {team.won}
                  </td>

                  <td className="text-center">
                    {team.drawn}
                  </td>

                  <td className="text-center">
                    {team.lost}
                  </td>

                  <td className="text-center">
                    {team.goalsFor}
                  </td>

                  <td className="text-center">
                    {team.goalsAgainst}
                  </td>

                  <td className="text-center font-semibold">
                    {team.goalDifference > 0
                      ? `+${team.goalDifference}`
                      : team.goalDifference}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}