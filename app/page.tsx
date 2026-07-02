import { partite } from "@/lib/data";
export default function Home() {
  const partitaLive = partite.find((p) => p.stato === "LIVE");
  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-6 shadow">
        <h1 className="text-3xl font-bold">🏆 Torneo di Calcetto</h1>
        <p className="text-green-100">Girone unico + Finale</p>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <section className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-bold mb-3">📅 Prossima partita</h2>

          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">Real Bonito</h3>
              <p>🆚</p>
              <h3 className="font-semibold">Atletico</h3>
            </div>

            <div className="text-right">
              <p>10 Luglio</p>
              <p className="font-bold">20:30</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow p-5">
  <h2 className="text-xl font-bold mb-3 text-red-600">
    🔴 Partita LIVE
  </h2>

  {partitaLive ? (
    <div className="text-center">
      <h3 className="text-2xl font-bold">
        {partitaLive.casa} {partitaLive.golCasa} - {partitaLive.golOspite}{" "}
        {partitaLive.ospite}
      </h3>
    </div>
  ) : (
    <p>Nessuna partita in corso.</p>
  )}
</section>
      </div>
    </main>
  );
}