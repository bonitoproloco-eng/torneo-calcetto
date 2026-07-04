import Header from "@/components/Header";
import AddTeamForm from "@/components/AddTeamForm";
import TeamList from "@/components/TeamList";
import Link from "next/link";

export default function SquadrePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Squadre"
        subtitle="Gestione squadre del torneo"
      />

      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-bold mb-4">
            Nuova Squadra
          </h2>

          <AddTeamForm />
        </div>

        <TeamList />
      </div>
    </main>
  );
}