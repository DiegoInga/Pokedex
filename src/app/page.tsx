"use client";

import React, { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/navbar";
import PokemonCard from "@/components/cardpokemon";

// Tipos para los datos de Pokémon
interface PokemonData {
  name: string;
  image: string;
  types: string[];
  height: string;
  weight: string;
}

// Cache para almacenar datos de Pokémon
const pokemonCache = new Map<number, PokemonData>();
const typeCache = new Map<string, number[]>();

function SkeletonCard() {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full animate-pulse">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      <div className="mt-28 space-y-3">
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

export default function Home() {
  const [pokemonIds, setPokemonIds] = useState<number[]>([]);
  const [filteredIds, setFilteredIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPokemonIds = async () => {
      try {
        const ids = Array.from({ length: 151 }, (_, i) => i + 1);
        setPokemonIds(ids);
        setFilteredIds(ids);
      } catch (error) {
        console.error("Error al cargar la lista de Pokémon:", error);
        setError("Error al cargar la lista de Pokémon");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonIds();
  }, []);

  useEffect(() => {
    if (selectedType === "") {
      setFilteredIds(pokemonIds);
      return;
    }

    const fetchFilteredPokemons = async () => {
      setFiltering(true);
      setError("");

      try {
        // Verificar si ya tenemos este tipo en caché
        if (typeCache.has(selectedType.toLowerCase())) {
          const cachedIds = typeCache.get(selectedType.toLowerCase())!;
          setFilteredIds(cachedIds);
          setFiltering(false);
          return;
        }

        // Usar el endpoint de tipo de PokeAPI (mucho más eficiente)
        const response = await fetch(
          `https://pokeapi.co/api/v2/type/${selectedType.toLowerCase()}`
        );

        if (!response.ok) {
          throw new Error("Tipo no encontrado");
        }

        const data = await response.json();

        // Filtrar solo los Pokémon de la primera generación (1-151)
        const typeIds = data.pokemon
          .map((p: { pokemon: { url: string } }) => {
            const url = p.pokemon.url;
            const id = parseInt(url.split("/").slice(-2, -1)[0]);
            return id;
          })
          .filter((id: number) => id >= 1 && id <= 151)
          .sort((a: number, b: number) => a - b);

        // Guardar en caché
        typeCache.set(selectedType.toLowerCase(), typeIds);
        setFilteredIds(typeIds);
      } catch (error) {
        console.error("Error al obtener Pokémon por tipo:", error);
        setError("Error al filtrar Pokémon por tipo");
        setFilteredIds([]);
      } finally {
        setFiltering(false);
      }
    };

    fetchFilteredPokemons();
  }, [selectedType, pokemonIds]);

  const displayText = useMemo(() => {
    if (selectedType === "") return "Todos los Pokémon";
    return `Tipo: ${selectedType}`;
  }, [selectedType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar onTypeSelect={setSelectedType} selectedType={selectedType} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Navbar onTypeSelect={setSelectedType} selectedType={selectedType} />

      <div className="container mx-auto px-4 py-8">
        {/* Header de sección */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 drop-shadow-sm">
            {displayText}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
            {filtering
              ? "Filtrando..."
              : `${filteredIds.length} Pokémon encontrados`}
          </p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-center">
            {error}
          </div>
        )}

        {/* Grid de Pokémon */}
        {filtering ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredIds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredIds.map((id) => (
              <PokemonCard key={id} id={id} cache={pokemonCache} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No se encontraron Pokémon de este tipo
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export { pokemonCache };
