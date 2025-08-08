import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  TrophyIcon,
  UsersIcon,
  ChevronDownIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 ${
      isActive
        ? "text-indigo-600 font-semibold"
        : "text-gray-600 hover:text-indigo-600"
    }`;

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <div className="text-xl font-bold text-indigo-600">
          <NavLink to="/">Reado</NavLink>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <NavLink to="/" className={navLinkClass}>
            <BookOpenIcon className="w-5 h-5" />
            <span>Library</span>
          </NavLink>
          <NavLink to="/discover" className={navLinkClass}>
            <MagnifyingGlassIcon className="w-5 h-5" />
            <span>Discover</span>
          </NavLink>
          <NavLink to="/achievements" className={navLinkClass}>
            <TrophyIcon className="w-5 h-5" />
            <span>Achievements</span>
          </NavLink>
          <NavLink to="/friends" className={navLinkClass}>
            <UsersIcon className="w-5 h-5" />
            <span>Friends</span>
          </NavLink>
        </nav>

        {/* Right side: XP + Avatar dropdown */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <FireIcon className="w-4 h-4 text-orange-500 animate-pulse" />
            XP: 120
          </div>

          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-1 focus:outline-none cursor-pointer">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            </MenuButton>
            <MenuItems
              transition
              className="transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50"
            >
              <div className="px-1 py-1 text-sm text-gray-700">
                <MenuItem
                  as="button"
                  className="w-full text-left px-4 py-2 data-focus:bg-gray-100"
                >
                  Profile
                </MenuItem>
                <MenuItem
                  as="button"
                  className="w-full text-left px-4 py-2 data-focus:bg-gray-100"
                >
                  Settings
                </MenuItem>
                <hr className="my-1" />
                <MenuItem
                  as="button"
                  className="w-full text-left px-4 py-2 text-red-500 data-focus:bg-gray-100"
                >
                  Log Out
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
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
          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Library
          </NavLink>
          <NavLink
            to="/discover"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Discover
          </NavLink>
          <NavLink
            to="/achievements"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Achievements
          </NavLink>
          <NavLink
            to="/friends"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Friends
          </NavLink>
        </nav>
      )}
    </header>
  );
}
