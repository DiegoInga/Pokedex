"use client";

import React, { useEffect, useState } from "react";

type PokemonCardProps = {
  id: number;
};

const typeColors: Record<string, string> = {
  FIRE: "bg-orange-500",
  WATER: "bg-blue-400",
  ELECTRIC: "bg-yellow-400",
  FIGHTING: "bg-red-600",
  GRASS: "bg-green-500",
  ICE: "bg-cyan-300",
  POISON: "bg-purple-600",
  GROUND: "bg-yellow-600",
  FLYING: "bg-indigo-400",
  PSYCHIC: "bg-pink-500",
  BUG: "bg-lime-600",
  ROCK: "bg-yellow-700",
  GHOST: "bg-indigo-800",
  DARK: "bg-gray-800",
  DRAGON: "bg-purple-700",
  STEEL: "bg-gray-400",
  FAIRY: "bg-pink-300",
  NORMAL: "bg-gray-500",
};

export default function PokemonCard({ id }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState<{
    name: string;
    image: string;
    types: string[];
    height: string;
    weight: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        setPokemon({
          name: data.name,
          image: data.sprites.other["official-artwork"].front_default,
          types: data.types.map((type: any) => type.type.name),
          height: `${data.height / 10}m`,
          weight: `${data.weight / 10}kg`,
        });
      } catch (error) {
        console.error("Error al cargar el Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 dark:text-white rounded-xl shadow-lg p-4 w-60 text-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 dark:text-white rounded-xl shadow-lg p-4 w-60 text-center">
        <p>Error al cargar los datos</p>
      </div>
    );
  }

  return (
    <div className="relative bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg p-4 w-60 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Número centrado detrás de la imagen y de todo */}
      <p className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl font-bold text-gray-200 select-none dark:text-gray-400 z-0">
        #{id.toString().padStart(3, "0")}
      </p>

      <div className="relative z-10">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-24 h-24 mx-auto"
        />
      </div>

      <h2 className="text-lg font-bold uppercase">{pokemon.name}</h2>
      <div className="flex justify-center gap-2 mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
              typeColors[type.toUpperCase()] || "bg-gray-300"
            }`}
          >
            {type}
          </span>
        ))}
      </div>
      <div className="flex justify-around mt-4 text-sm text-gray-700 dark:text-gray-300">
        <p>{pokemon.height}</p>
        <p>{pokemon.weight}</p>
      </div>
    </div>
  );
}
