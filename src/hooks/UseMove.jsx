import {  useState } from "react";

function UseMove() {
    const [moveDescription, setMoveDescription] = useState("");

    const getMoveDescription = async (url) => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setMoveDescription(
            data.flavor_text_entries.find((entry) => entry.language.name === "es")
              ?.flavor_text || "Descripción no disponible"
          );
        } catch {
          setMoveDescription("Error al obtener la descripción del movimiento");
        } 
      };
    
  return [moveDescription, getMoveDescription ]
}

export { UseMove }