"use client";

import { useState } from "react";

interface Props {
  disabled: boolean;
  onSave: () => Promise<void>;
}

export default function SaveButton({
  disabled,
  onSave,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
try {
  await onSave();
} catch (error) {
  console.error(error);
  alert("❌ Errore durante il salvataggio del calendario.");
}    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition"
    >
      {loading ? "Salvataggio..." : "💾 Salva Calendario"}
    </button>
  );
}