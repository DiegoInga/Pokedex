"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Ruler, Weight } from "lucide-react";

type PokemonCardProps = {
  id: number;
  cache: Map<number, any>;
};

const typeColors: Record<string, string> = {
  FIRE: "bg-orange-500",
  WATER: "bg-blue-500",
  ELECTRIC: "bg-yellow-400 text-gray-800",
  FIGHTING: "bg-red-600",
  GRASS: "bg-green-500",
  ICE: "bg-cyan-400",
  POISON: "bg-purple-600",
  GROUND: "bg-yellow-600",
  FLYING: "bg-indigo-400",
  PSYCHIC: "bg-pink-500",
  BUG: "bg-lime-600",
  ROCK: "bg-yellow-700",
  GHOST: "bg-indigo-900",
  DARK: "bg-gray-800",
  DRAGON: "bg-purple-700",
  STEEL: "bg-gray-400 text-gray-800",
  FAIRY: "bg-pink-400",
  NORMAL: "bg-gray-500",
};

const typeGradients: Record<string, string> = {
  FIRE: "from-orange-400 to-red-500",
  WATER: "from-blue-400 to-cyan-500",
  ELECTRIC: "from-yellow-300 to-yellow-500",
  FIGHTING: "from-red-500 to-red-700",
  GRASS: "from-green-400 to-green-600",
  ICE: "from-cyan-300 to-blue-400",
  POISON: "from-purple-500 to-purple-700",
  GROUND: "from-yellow-500 to-yellow-700",
  FLYING: "from-indigo-300 to-indigo-500",
  PSYCHIC: "from-pink-400 to-purple-500",
  BUG: "from-lime-500 to-green-600",
  ROCK: "from-yellow-600 to-yellow-800",
  GHOST: "from-indigo-800 to-purple-900",
  DARK: "from-gray-700 to-gray-900",
  DRAGON: "from-purple-600 to-indigo-700",
  STEEL: "from-gray-400 to-gray-600",
  FAIRY: "from-pink-300 to-pink-500",
  NORMAL: "from-gray-400 to-gray-600",
};

export default function PokemonCard({ id, cache }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState<{
    name: string;
    image: string;
    types: string[];
    height: string;
    weight: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Verificar caché primero
        if (cache.has(id)) {
          setPokemon(cache.get(id));
          setLoading(false);
          return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!response.ok) {
          throw new Error("Pokemon not found");
        }

        const data = await response.json();

        const pokemonData = {
          name: data.name,
          image: data.sprites.other["official-artwork"].front_default,
          types: data.types.map((type: any) => type.type.name),
          height: `${data.height / 10}m`,
          weight: `${data.weight / 10}kg`,
        };

        // Guardar en caché
        cache.set(id, pokemonData);
        setPokemon(pokemonData);
      } catch (error) {
        console.error("Error al cargar el Pokémon:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id, cache]);

  if (loading) {
    return (
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full animate-pulse">
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="mt-36 space-y-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
          <div className="flex justify-center gap-2">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
          <div className="flex justify-around pt-2">
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full text-center">
        <p className="text-red-500 dark:text-red-400">Error al cargar</p>
      </div>
    );
  }

  const primaryType = pokemon.types[0].toUpperCase();
  const gradient = typeGradients[primaryType] || "from-gray-400 to-gray-600";

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer w-full">
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>

      {/* Número de fondo */}
      <div className="absolute top-4 right-4 text-6xl md:text-7xl font-black text-gray-100 dark:text-gray-700 select-none opacity-50">
        #{id.toString().padStart(3, "0")}
      </div>

      {/* Contenido */}
      <div className="relative z-10 p-6">
        {/* Imagen del Pokémon */}
        <div className="relative h-32 md:h-40 flex items-center justify-center mb-4">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          )}
          <Image
            src={pokemon.image}
            alt={`${pokemon.name} - Pokémon #${id}`}
            width={160}
            height={160}
            className={`w-32 h-32 md:w-40 md:h-40 object-contain transform transition-all duration-300 group-hover:scale-110 drop-shadow-2xl ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            unoptimized
          />
        </div>

        {/* Nombre */}
        <h2 className="text-xl md:text-2xl font-bold capitalize text-center text-gray-800 dark:text-white mb-3 tracking-wide">
          {pokemon.name}
        </h2>

        {/* Tipos */}
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-4 py-1.5 rounded-full text-white text-xs md:text-sm font-bold uppercase shadow-md transition-transform hover:scale-110 ${
                typeColors[type.toUpperCase()] || "bg-gray-500"
              }`}
            >
              {type}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-around items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Ruler className="w-4 h-4" />
            <span className="text-sm font-medium">{pokemon.height}</span>
          </div>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Weight className="w-4 h-4" />
            <span className="text-sm font-medium">{pokemon.weight}</span>
          </div>
        </div>
      </div>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
    </div>
  );
}
