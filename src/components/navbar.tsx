"use client";

import React from "react";
import { ModeToggle } from "@/components/theme-button";

interface Type {
  name: string;
  color: string;
  hoverColor: string;
}

const Navbar: React.FC = () => {
  const types: Type[] = [
    {
      name: "VER TODOS",
      color: "bg-gray-300",
      hoverColor: "hover:bg-gray-400",
    },
    { name: "NORMAL", color: "bg-gray-500", hoverColor: "hover:bg-gray-600" },
    { name: "FIRE", color: "bg-orange-500", hoverColor: "hover:bg-orange-600" },
    { name: "WATER", color: "bg-blue-400", hoverColor: "hover:bg-blue-500" },
    { name: "GRASS", color: "bg-green-500", hoverColor: "hover:bg-green-600" },
    {
      name: "ELECTRIC",
      color: "bg-yellow-400",
      hoverColor: "hover:bg-yellow-500",
    },
    { name: "ICE", color: "bg-cyan-300", hoverColor: "hover:bg-cyan-400" },
    { name: "FIGHTING", color: "bg-red-600", hoverColor: "hover:bg-red-700" },
    {
      name: "POISON",
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700",
    },
    {
      name: "GROUND",
      color: "bg-yellow-600",
      hoverColor: "hover:bg-yellow-700",
    },
    {
      name: "FLYING",
      color: "bg-indigo-400",
      hoverColor: "hover:bg-indigo-500",
    },
    { name: "PSYCHIC", color: "bg-pink-500", hoverColor: "hover:bg-pink-600" },
    { name: "BUG", color: "bg-lime-600", hoverColor: "hover:bg-lime-700" },
    { name: "ROCK", color: "bg-yellow-700", hoverColor: "hover:bg-yellow-800" },
    {
      name: "GHOST",
      color: "bg-indigo-800",
      hoverColor: "hover:bg-indigo-900",
    },
    { name: "DARK", color: "bg-gray-800", hoverColor: "hover:bg-gray-900" },
    {
      name: "DRAGON",
      color: "bg-purple-700",
      hoverColor: "hover:bg-purple-800",
    },
    { name: "STEEL", color: "bg-gray-400", hoverColor: "hover:bg-gray-500" },
    { name: "FAIRY", color: "bg-pink-300", hoverColor: "hover:bg-pink-400" },
  ];

  return (
    <div className="bg-inherit py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <img src="/pokedex.png" alt="Pokedex" className="h-12" />

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          {types.map((type) => (
            <button
              key={type.name}
              className={`px-4 py-2 text-white rounded-full transition-all duration-200 ${type.color} ${type.hoverColor}`}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;