"use client";

export interface AvailableMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  label: string;
}

interface Props {
  matches: AvailableMatch[];
  selectedMatchId: string | null;
  onSelect: (match: AvailableMatch) => void;
}

export default function AvailableMatches({
  matches,
  selectedMatchId,
  onSelect,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5 h-fit">

      <h2 className="text-xl font-bold mb-4">
        ⚽ Partite disponibili
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        {matches.length} partite rimaste
      </p>

      <div className="space-y-2">

        {matches.map((match) => (
          <button
            key={match.id}
            onClick={() => onSelect(match)}
            className={`w-full text-left rounded-lg border p-3 transition ${
              selectedMatchId === match.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            {match.label}
          </button>
        ))}

      </div>

    </div>
  );
}