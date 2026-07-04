import { Trophy } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-green-600 text-white rounded-b-3xl shadow-lg">
      <div className="max-w-md mx-auto px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-xl">
            <Trophy className="w-7 h-7" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">{title}</h1>

            {subtitle && (
              <p className="text-green-100 text-sm">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}