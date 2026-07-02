"use client";

import Link from "next/link";
import { Home, CalendarDays, Trophy, Goal } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="max-w-md mx-auto flex justify-around py-3">

        <Link href="/" className="flex flex-col items-center text-green-600">
          <Home size={22} />
          <span className="text-xs">Home</span>
        </Link>

        <Link href="/calendario" className="flex flex-col items-center">
          <CalendarDays size={22} />
          <span className="text-xs">Calendario</span>
        </Link>

        <Link href="/classifica" className="flex flex-col items-center">
          <Trophy size={22} />
          <span className="text-xs">Classifica</span>
        </Link>

        <Link href="/cannonieri" className="flex flex-col items-center">
          <Goal size={22} />
          <span className="text-xs">Goal</span>
        </Link>

      </div>
    </nav>
  );
}