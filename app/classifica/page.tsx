export default function Classifica() {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🏆 Classifica</h1>

      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3">#</th>
            <th>Squadra</th>
            <th>Pt</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="p-3">1</td>
            <td>Real Bonito</td>
            <td>6</td>
          </tr>

          <tr className="border-b">
            <td className="p-3">2</td>
            <td>Rangers</td>
            <td>3</td>
          </tr>

          <tr>
            <td className="p-3">3</td>
            <td>Atletico</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}