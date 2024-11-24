"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import PokemonCard from "@/components/cardpokemon";

export default function Home() {
  const [pokemonIds, setPokemonIds] = useState<number[]>([]);
  const [filteredIds, setFilteredIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    const fetchPokemonIds = async () => {
      try {
        const ids = Array.from({ length: 151 }, (_, i) => i + 1);
        setPokemonIds(ids);
        setFilteredIds(ids); // Inicialmente muestra todos los Pokémon
      } catch (error) {
        console.error("Error al cargar la lista de Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonIds();
  }, []);

  useEffect(() => {
    if (selectedType === "") {
      setFilteredIds(pokemonIds); // Mostrar todos los Pokémon si no se ha seleccionado un tipo
    } else {
      const fetchFilteredPokemons = async () => {
        const filteredIds = [];
        for (let id of pokemonIds) {
          try {
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${id}`
            );
            const data = await response.json();
            const types = data.types.map((type: any) => type.type.name);
            if (types.includes(selectedType.toLowerCase())) {
              filteredIds.push(id);
            }
          } catch (error) {
            console.error("Error al obtener los datos de un Pokémon:", error);
          }
        }
        setFilteredIds(filteredIds);
      };
      fetchFilteredPokemons();
    }
  }, [selectedType, pokemonIds]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p>Cargando Pokémon...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar onTypeSelect={setSelectedType} />

      {/* Contenedor principal */}
      <div className="p-6 bg-gray-50">
        {/* Contenedor para centrar las cards */}
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredIds.map((id) => (
            <PokemonCard key={id} id={id} />
          ))}
        </div>
      </div>
    </div>
  );
}
