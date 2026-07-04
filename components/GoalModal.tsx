"use client";

interface Player {
  id: string;
  name: string;
  number: number;
}

interface Props {
  open: boolean;
  title: string;
  players: Player[];
  onClose: () => void;
  onSelect: (player: Player) => void;
}

export default function GoalModal({
  open,
  title,
  players,
  onClose,
  onSelect,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold mb-5">
          {title}
        </h2>

        <div className="space-y-3 max-h-96 overflow-y-auto">

          {players.map((player) => (

            <button
              key={player.id}
              onClick={() => onSelect(player)}
              className="w-full border rounded-lg p-4 flex justify-between hover:bg-green-50"
            >
              <span className="font-bold">
                #{player.number}
              </span>

              <span>
                {player.name}
              </span>

            </button>

          ))}

        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 bg-gray-200 rounded-lg p-3"
        >
          Annulla
        </button>

      </div>

    </div>
  );
}