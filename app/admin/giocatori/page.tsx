import Header from "@/components/Header";
import AddPlayerForm from "@/components/AddPlayerForm";
import PlayerList from "@/components/PlayerList";

export default function GiocatoriPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Giocatori"
        subtitle="Gestione giocatori"
      />

      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-bold mb-4">
            Nuovo Giocatore
          </h2>

          <AddPlayerForm />
        </div>

        <PlayerList />
      </div>
    </main>
  );
}