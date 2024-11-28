import { useRef } from "react";
import { IoSearch } from "react-icons/io5";

export default function Search({handleSearch}) {

    const inputRef = useRef()

    const onSearch = () => {
        handleSearch(inputRef.current.value)
        inputRef.current.value = ""
    }

  return (
    <div className="search">
      <div className="search__input">
        <IoSearch />
        <input type="text" placeholder="Buscar un pokemon" ref={inputRef} className="search__search"/>
      </div>
      <button className="search__btn" onClick={onSearch}>Buscar</button>
    </div>
  );
}
