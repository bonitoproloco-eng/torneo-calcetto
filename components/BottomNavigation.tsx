"use client";

import Link from "next/link";
import { Home, Calendar, Trophy, Shield, Medal } from "lucide-react";
export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="max-w-md mx-auto flex justify-around py-3">

        <Link href="/">
          <Home />
        </Link>

        <Link href="/calendario">
          <Calendar />
        </Link>

        <Link href="/classifica">
          <Trophy />
        </Link>

        <Link href="/cannonieri">
  <Medal />
</Link>

        <Link href="/admin">
          <Shield />
        </Link>

      </div>
    </nav>
  );
}