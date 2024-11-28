import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import HeaderPokedex from "../components/pokedex/HeaderPokedex";
import Search from "../components/pokedex/Search";
import Filters from "../components/pokedex/Filters";
import "../styles/pokedex.css";
import PokemonList from "../components/pokedex/PokemonList";
import PokemonCard from "../components/pokedex/PokemonCard";
import { pokeWallpaper } from "../images";
import Buttons from "../components/pokedex/Buttons";

const urlBase = "https://pokeapi.co/api/v2/pokemon";
const urlFilter = "https://pokeapi.co/api/v2/type/";

function Pokedex() {
  const [pokemons, setPokemons, loading, error] = useFetch();
  const [pokemonUrl, setPokemonUrl] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    scrollUp();
  }, [setPokemons]);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getPokemons = () => {
    setPokemons(urlBase);
  };

  const handleSearch = (value) => {
    if (!value) {
      setPokemonUrl(null);
      setPokemons(urlBase);
    } else {
      value = value.toLowerCase().trim();
      setPokemonUrl(urlBase + "/" + value);
    }
    setSelectedType("");
    setIsFiltering(false);
  };
  const handleTypeFilter = (type) => {
    setPokemonUrl(null);
    if (!type) {
      setIsFiltering(false);
      setPokemons(urlBase);
    } else {
      setIsFiltering(true);
      setPokemons(urlFilter + type);
    }
    setSelectedType(type);
  };

  const pokemonsArray = isFiltering ? pokemons?.pokemon : pokemons?.results;

  return (
    <>
      <div className="hero">
        <img src={pokeWallpaper} alt="Pokemon Wallpaper" />
      </div>
      <div className="pokedex">
        <div className="pokedex__container">
          <HeaderPokedex />
          <div className="pokedex__form">
            <Search handleSearch={handleSearch} />
            <Filters
              handleTypeFilter={handleTypeFilter}
              selectedType={selectedType}
            />
          </div>
          <Buttons pokemons={pokemons} setPokemons={setPokemons} />
          <div className="pokedex__cards">
            {pokemonUrl ? (
              <PokemonCard url={pokemonUrl} />
            ) : (
              <PokemonList pokemons={pokemonsArray} isFiltering={isFiltering} />
            )}
          </div>
          <Buttons pokemons={pokemons} setPokemons={setPokemons} />
        </div>
      </div>
    </>
  );
}

export { Pokedex };
