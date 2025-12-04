"use client";

import React, { useState } from "react";

import { ModeToggle } from "./theme-button";
import { Menu, X } from "lucide-react";

interface Type {
  name: string;
  color: string;
  hoverColor: string;
  textColor?: string;
}

interface NavbarProps {
  onTypeSelect: (type: string) => void;
  selectedType: string;
}

const Navbar: React.FC<NavbarProps> = ({ onTypeSelect, selectedType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const types: Type[] = [
    {
      name: "VER TODOS",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      hoverColor: "hover:from-purple-600 hover:to-pink-600",
    },
    { name: "NORMAL", color: "bg-gray-500", hoverColor: "hover:bg-gray-600" },
    { name: "FIRE", color: "bg-orange-500", hoverColor: "hover:bg-orange-600" },
    { name: "WATER", color: "bg-blue-500", hoverColor: "hover:bg-blue-600" },
    { name: "GRASS", color: "bg-green-500", hoverColor: "hover:bg-green-600" },
    {
      name: "ELECTRIC",
      color: "bg-yellow-400",
      hoverColor: "hover:bg-yellow-500",
      textColor: "text-gray-800",
    },
    { name: "ICE", color: "bg-cyan-400", hoverColor: "hover:bg-cyan-500" },
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
      color: "bg-indigo-900",
      hoverColor: "hover:bg-indigo-950",
    },
    { name: "DARK", color: "bg-gray-800", hoverColor: "hover:bg-gray-900" },
    {
      name: "DRAGON",
      color: "bg-purple-700",
      hoverColor: "hover:bg-purple-800",
    },
    { name: "STEEL", color: "bg-gray-400", hoverColor: "hover:bg-gray-500" },
    { name: "FAIRY", color: "bg-pink-400", hoverColor: "hover:bg-pink-500" },
  ];

  const isSelected = (typeName: string) => {
    if (typeName === "VER TODOS") return selectedType === "";
    return selectedType === typeName;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y Título */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onTypeSelect("")}
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pokédex
            </h1>
          </div>

          {/* Toggle de tema y menú */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Filtros de tipo - Desktop */}
        <div className="hidden lg:flex flex-wrap gap-2 mt-4 justify-center">
          {types.map((type) => (
            <button
              key={type.name}
              className={`px-4 py-2 ${
                type.textColor || "text-white"
              } rounded-full shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg font-semibold text-sm ${
                type.color
              } ${type.hoverColor} ${
                isSelected(type.name)
                  ? "ring-4 ring-offset-2 ring-blue-400 dark:ring-blue-600 scale-105"
                  : ""
              }`}
              onClick={() => {
                onTypeSelect(type.name === "VER TODOS" ? "" : type.name);
              }}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* Filtros de tipo - Mobile (desplegable) */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
            <div className="grid grid-cols-2 gap-2">
              {types.map((type) => (
                <button
                  key={type.name}
                  className={`px-3 py-2 ${
                    type.textColor || "text-white"
                  } rounded-lg shadow-md transition-all duration-200 active:scale-95 font-semibold text-xs ${
                    type.color
                  } ${type.hoverColor} ${
                    isSelected(type.name)
                      ? "ring-2 ring-blue-400 dark:ring-blue-600 scale-105"
                      : ""
                  }`}
                  onClick={() => {
                    onTypeSelect(type.name === "VER TODOS" ? "" : type.name);
                    setIsMenuOpen(false);
                  }}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
