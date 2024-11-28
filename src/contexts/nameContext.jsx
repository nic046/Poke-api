import { createContext, useContext, useReducer } from "react";

const nameContext = createContext()

const initialName = window.localStorage.getItem("name") || null

export const types = {
    SET_NAME: "SET_NAME",
    CLEAR_NAME: "CLEAR_NAME"
}

const nameReducer = (state, action) => {
    switch (action.type) {
        case types.SET_NAME:
            window.localStorage.setItem("name", action.payload)
            return action.payload
        case types.CLEAR_NAME:
            window.localStorage.removeItem("name")
            return null
        default:
            return state;
    }
}

function NameProvider({children}) {
    const [state, dispach] = useReducer(nameReducer, initialName)
  
    return (
        <nameContext.Provider value={[state, dispach]}>
            {children}
        </nameContext.Provider>
    )
}

const useNameContext = () => useContext(nameContext)

export {NameProvider, useNameContext}
export default nameContext
