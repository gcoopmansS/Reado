import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <div className="text-xl font-bold text-indigo-600">
          <a href="/">Reado</a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-indigo-600">
            Library
          </a>
          <a href="#" className="hover:text-indigo-600">
            Discover
          </a>
          <a href="#" className="hover:text-indigo-600">
            Achievements
          </a>
          <a href="#" className="hover:text-indigo-600">
            Friends
          </a>
        </nav>

        {/* Right side: XP and avatar */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">🔥 XP: 120</div>
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-500 hover:text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile nav menu */}
      {menuOpen && (
        <nav className="md:hidden px-4 pb-4 text-sm font-medium text-gray-700 space-y-2">
          <a href="#" className="block hover:text-indigo-600">
            Library
          </a>
          <a href="#" className="block hover:text-indigo-600">
            Discover
          </a>
          <a href="#" className="block hover:text-indigo-600">
            Achievements
          </a>
          <a href="#" className="block hover:text-indigo-600">
            Friends
          </a>
        </nav>
      )}
    </header>
  );
}
