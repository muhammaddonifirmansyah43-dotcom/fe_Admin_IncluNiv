"use client";

import { Bell, Menu } from "lucide-react";

type HeaderProps = {
  onMobileMenu: () => void;
};

export default function Header({ onMobileMenu }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#0F2D5B] px-4 sm:px-6">
      <button
        onClick={onMobileMenu}
        className="rounded p-2 text-white hover:bg-white/10 lg:hidden"
        aria-label="Buka menu"
      >
        <Menu size={21} />
      </button>

      <div className="ml-auto">
        <button
          className="relative rounded-full p-2 text-white hover:bg-white/10"
          aria-label="Notifikasi"
        >
          <Bell size={20} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#F97316]" />
        </button>
      </div>
    </header>
  );
}