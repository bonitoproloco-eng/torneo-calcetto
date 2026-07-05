import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Area Amministratore"
        subtitle="Accedi per gestire il torneo"
      />

      <div className="max-w-md mx-auto p-5">
        <div className="bg-white rounded-xl shadow p-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}