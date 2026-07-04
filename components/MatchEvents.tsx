interface Props {
  events: any[];
}

export default function MatchEvents({ events }: Props) {
  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="font-bold mb-3">
          Eventi partita
        </h2>

        <p className="text-gray-500">
          Nessun evento.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="font-bold mb-3">
        Eventi partita
      </h2>

      <div className="space-y-2">
        {events.map((event, index) => (
          <div
            key={index}
            className="border rounded-lg p-3"
          >
            ⚽ Goal ({event.team})
          </div>
        ))}
      </div>
    </div>
  );
}