import { Link } from "react-router-dom";
import { useNameContext } from "../../contexts/nameContext";

export default function HeaderPokedex() {
  const [name] = useNameContext()
  return (
    <div className="pokedex__header">
        <Link className="pokedex__return" to={"/"}>{"⇐"} Volver</Link>
        <div className="pokedex__welcome">
          <p>Bienvenido <strong>{name}</strong> Aqui podras encontrar tu pokemón favorito</p>
        </div>
      </div>
  )
}
