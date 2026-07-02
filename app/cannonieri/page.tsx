export default function Cannonieri() {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">⚽ Cannonieri</h1>

      <div className="bg-white rounded-xl shadow">

        <div className="flex justify-between border-b p-4">
          <span>Marco Rossi</span>
          <span className="font-bold">5</span>
        </div>

        <div className="flex justify-between border-b p-4">
          <span>Luca Esposito</span>
          <span className="font-bold">4</span>
        </div>

        <div className="flex justify-between p-4">
          <span>Antonio Romano</span>
          <span className="font-bold">3</span>
        </div>

      </div>
    </main>
  );
}