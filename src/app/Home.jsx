import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNameContext, types } from "../contexts/nameContext";
import "../styles/Home.css";
import { pokelogo, pokeWallpaper } from "../images";

function Home() {
  const inputRef = useRef();
  const [name, dispach] = useNameContext();
  const navigate = useNavigate();

  const setName = () => {
    dispach({
      type: types.SET_NAME,
      payload: inputRef.current.value.trim(),
    });
    inputRef.current.value = "";
    navigate("/pokedex");
  };

  const clearName = () => {
    dispach({
      type: types.CLEAR_NAME,
    });
  };

  return (
    <>
      <div
        className="home"
        style={{ backgroundImage: `url(${pokeWallpaper})` }}
      >
        <div className="home__content">
          <img className="home__img" width={200} src={pokelogo} alt="pokedex" />
          <h2 className="home__title">
            ¡Hola {name ? <>de nuevo {name}</> : "Entrenador"}!
          </h2>

          <div>
            {name ? (
              <>
                <p className="home__text">
                  ¡Continuemos con tu viaje! Ve a tu{" "}
                  <Link className="home__link" to="/pokedex">
                    Pokedex
                  </Link>
                </p>
                <button onClick={clearName} className="home__btn btn--radius">
                  Salir
                </button>
              </>
            ) : (
              <>
                <p>Para poder comenzar, dame tu nombre</p>
                <input
                  type="text"
                  placeholder="Tu nombre..."
                  ref={inputRef}
                  className="home__input"
                />
                <button className="home__btn" onClick={setName}>
                  Comenzar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { Home };
