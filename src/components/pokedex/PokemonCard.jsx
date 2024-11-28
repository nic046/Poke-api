import React, { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { tipos } from "../../utils/helpers";
import { PiHeartHalfDuotone } from "react-icons/pi";
import { TbSword } from "react-icons/tb";
import { IoShieldHalfOutline } from "react-icons/io5";
import { IoMdSpeedometer } from "react-icons/io";
import Loader from "./Loader";
import { psyduck } from "../../images/index";

export default function PokemonCard({ url }) {
  const [pokemon, setPokemon, loading, errorCode] = useFetch();

  useEffect(() => {
    if (url) getPokemon();
  }, [url]);

  const getPokemon = () => {
    setPokemon(url);
  };

  const types = pokemon?.types.map((type) => type.type.name);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {errorCode ? (
            <div className="error">
              <img src={psyduck} alt={errorCode} width={200}/>
              <h1>{errorCode}</h1>
            </div>
          ) : (
            <Link to={`/pokedex/${pokemon?.name}`}>
              <div className={`poke__card type--${types ? types[0] : ""}`}>
                <div className="poke__card-header">
                  <img
                    className="poke__card-image"
                    src={
                      pokemon?.sprites?.other?.dream_world?.front_default
                        ? pokemon?.sprites?.other?.dream_world?.front_default
                        : pokemon?.sprites?.other?.home?.front_default
                    }
                    width={200}
                    alt={pokemon?.name}
                  />
                </div>
                <div className="poke__card-body">
                  <div>
                    <h2 className="poke__card-name">{pokemon?.name}</h2>
                    <span className="poke__card-types">
                      {types?.map((type, index) => {
                        return (
                          <span
                            key={index + 1}
                            className={`poke__card--type poke__card--${type}`}
                          >
                            <span>{tipos[type]} </span>
                          </span>
                        );
                      })}
                    </span>
                    <p className="poke__card-type-label">Tipo ✨</p>
                  </div>

                  <div className="poke__card-stats">
                    <div className="poke__card-stats-item">
                      <span>
                        HP <PiHeartHalfDuotone />
                      </span>
                      <span>{pokemon?.stats[0]?.base_stat}</span>
                    </div>
                    <div className="poke__card-stats-item">
                      <span>
                        Ataque <TbSword />
                      </span>
                      <span>{pokemon?.stats[1]?.base_stat}</span>
                    </div>
                    <div className="poke__card-stats-item">
                      <span>
                        Defensa <IoShieldHalfOutline />
                      </span>
                      <span>{pokemon?.stats[2]?.base_stat}</span>
                    </div>
                    <div className="poke__card-stats-item">
                      <span>
                        Velocidad <IoMdSpeedometer />
                      </span>
                      <span>{pokemon?.stats[5]?.base_stat}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </>
      )}
    </>
  );
}
