export default function Calendario() {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">📅 Calendario</h1>

      <div className="bg-white rounded-xl shadow p-5 mb-4">
        <p className="font-semibold">Real Bonito</p>
        <p className="text-center text-2xl font-bold">3 - 2</p>
        <p className="font-semibold text-right">Atletico</p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <p className="font-semibold">Rangers</p>
        <p className="text-center text-2xl font-bold text-red-600">
          🔴 LIVE 1 - 0
        </p>
        <p className="font-semibold text-right">Bar Centrale</p>
      </div>
    </main>
  );
}