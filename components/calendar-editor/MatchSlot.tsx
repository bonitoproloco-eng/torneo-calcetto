"use client";

import { AvailableMatch } from "./AvailableMatches";

interface Props {
  time: string;
  match: AvailableMatch | null;
  availableMatches: AvailableMatch[];
  onAssign: (matchId: string) => void;
  onRemove: () => void;
}

export default function MatchSlot({
  time,
  match,
  availableMatches,
  onAssign,
  onRemove,
}: Props) {
  return (
    <div className="border rounded-xl p-4 bg-gray-50">

      <div className="font-bold text-lg mb-3">
        🕣 {time}
      </div>

      {!match ? (
        <select
          className="w-full border rounded-lg p-3"
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) {
              onAssign(e.target.value);
            }
          }}
        >
          <option value="">
            Seleziona partita...
          </option>

          {availableMatches.map((m) => (
            <option
              key={m.id}
              value={m.id}
            >
              {m.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="bg-green-50 border border-green-300 rounded-lg p-4">

          <div className="font-bold text-center">
            {match.label}
          </div>

          <button
            onClick={onRemove}
            className="mt-4 w-full bg-red-600 text-white rounded-lg py-2"
          >
            Rimuovi
          </button>

        </div>
      )}

    </div>
  );
}