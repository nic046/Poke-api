import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { tipos } from "../utils/helpers";
import "../styles/Details.css";
import { UseMove } from "../hooks/UseMove";
import Loader from "../components/pokedex/Loader";

function Details() {
  const params = useParams();
  const [pokemon, setPokemons, loading, errorCode] = useFetch();
  const [moveDescription, getMoveDescription] = UseMove();

  useEffect(() => {
    if (params.name) {
      getPokemon();
    }
  }, [params.name]);

  useEffect(() => {
    scrollUp();
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const getPokemon = () => {
    setPokemons(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  };

  const types = pokemon?.types?.map((type) => type?.type?.name);
  const cries = pokemon?.cries?.latest
    ? pokemon?.cries?.latest
    : "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/6.ogg";

  return (
    <>
      {loading ? (
        <div className="center">
          <Loader />
        </div>
      ) : (
        <>
          {errorCode ? (
            <div className="error">
              <img src={psyduck} alt={errorCode} width={200} />
              <h1>{errorCode}</h1>
            </div>
          ) : (
            <div className={`details ${types?.[0] ? `type--${types[0]}` : ""}`}>
              <div className="detalis__container">
                <Link className="pokedex__return padding" to={"/pokedex"}>
                  {"⇐"} volver
                </Link>
                <div className="details__image-container">
                  <div className="details__image">
                    <img
                      src={
                        pokemon?.sprites?.other?.dream_world?.front_default ||
                        pokemon?.sprites?.other?.home?.front_default
                      }
                      width={200}
                      alt={pokemon?.name}
                    />
                  </div>
                  <div className="custom-audio">
                    <audio controls>
                      <source src={cries} type="audio/ogg" />
                      <source src={cries} type="audio/mp3" />
                    </audio>
                  </div>
                  <div className="details__extra-images">
                    <img
                      src={pokemon?.sprites?.front_default}
                      alt={`${pokemon?.name} default`}
                      className="details__extra-image"
                    />
                    <img
                      src={pokemon?.sprites?.front_shiny}
                      alt={`${pokemon?.name} shiny`}
                      className="details__extra-image"
                    />
                    <img
                      src={pokemon?.sprites?.back_default}
                      alt={`${pokemon?.name} back`}
                      className="details__extra-image"
                    />
                    <img
                      src={pokemon?.sprites?.back_shiny}
                      alt={`${pokemon?.name} shiny back`}
                      className="details__extra-image"
                    />
                  </div>
                </div>
                <div className="details__data">
                  <span className="details__data-id">
                    #{pokemon?.id?.toString().padStart(3, "0")}
                  </span>
                  <h2 className="details__data-name">{pokemon?.name}</h2>
                  <div className="details__data-size">
                    <div className="details__data-weight">
                      <span>Peso</span>
                      <span>{pokemon?.weight} kg</span>
                    </div>
                    <div className="details__data-height">
                      <span>Altura</span>
                      <span>{pokemon?.height} m</span>
                    </div>
                  </div>
                  <div className="details__data-description">
                    <div>
                      <h3>Tipo</h3>
                      <div className="poke__card-types">
                        {types?.map((type) => (
                          <span
                            className={` poke__card--type poke__card--${type}`}
                            key={type}
                          >
                            {tipos[type]}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3>Habilidades</h3>
                      <div className="details__habilities">
                        {pokemon?.abilities?.map((data) => (
                          <span
                            className="details__hability"
                            key={data.ability.name}
                          >
                            {data.ability.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`details__stats ${
                      types?.[0] ? `type--${types[0]}` : ""
                    }`}
                  >
                    <h2>Stats</h2>
                    <div className="details__stats-detail">
                      <div className="details__stats-header">
                        <span className="details__stats-text">HP</span>
                        <span className="details__stats-value">
                          {pokemon?.stats[0]?.base_stat}/150
                        </span>
                      </div>
                      <div className="details__stats-bar-container">
                        <div
                          className="details__stats-bar hp"
                          style={{
                            width: `${
                              (pokemon?.stats[0]?.base_stat / 150) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="details__stats-detail">
                      <div className="details__stats-header">
                        <span className="details__stats-text">Ataque</span>
                        <span className="details__stats-value">
                          {pokemon?.stats[1]?.base_stat}/150
                        </span>
                      </div>
                      <div className="details__stats-bar-container">
                        <div
                          className="details__stats-bar attack"
                          style={{
                            width: `${
                              (pokemon?.stats[1]?.base_stat / 150) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="details__stats-detail">
                      <div className="details__stats-header">
                        <span className="details__stats-text">Defensa</span>
                        <span className="details__stats-value">
                          {pokemon?.stats[2]?.base_stat}/150
                        </span>
                      </div>
                      <div className="details__stats-bar-container">
                        <div
                          className="details__stats-bar defense"
                          style={{
                            width: `${
                              (pokemon?.stats[2]?.base_stat / 150) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="details__stats-detail">
                      <div className="details__stats-header">
                        <span className="details__stats-text">
                          Ataque especial
                        </span>
                        <span className="details__stats-value">
                          {pokemon?.stats[3]?.base_stat}/150
                        </span>
                      </div>
                      <div className="details__stats-bar-container">
                        <div
                          className="details__stats-bar attack-special"
                          style={{
                            width: `${
                              (pokemon?.stats[3]?.base_stat / 150) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="details__stats-detail">
                      <div className="details__stats-header">
                        <span className="details__stats-text">
                          Defensa especial
                        </span>
                        <span className="details__stats-value">
                          {pokemon?.stats[4]?.base_stat}/150
                        </span>
                      </div>
                      <div className="details__stats-bar-container">
                        <div
                          className="details__stats-bar  defense-special"
                          style={{
                            width: `${
                              (pokemon?.stats[4]?.base_stat / 150) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="details__stats-detail">
                      <div className="details__stats-header">
                        <span className="details__stats-text">Velocidad</span>
                        <span className="details__stats-value">
                          {pokemon?.stats[5]?.base_stat}/150
                        </span>
                      </div>
                      <div className="details__stats-bar-container">
                        <div
                          className="details__stats-bar speed"
                          style={{
                            width: `${
                              (pokemon?.stats[5]?.base_stat / 150) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="details__movements">
                    <h2>Movimientos</h2>
                    {moveDescription && (
                      <div className="details__movements-description">
                        {moveDescription}
                      </div>
                    )}
                    <ul className="details__movements-list">
                      {pokemon?.moves?.map((move) => (
                        <li
                          key={move.move.name}
                          onClick={() => getMoveDescription(move.move.url)}
                          className="details__movement"
                        >
                          {move.move.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
export { Details };
