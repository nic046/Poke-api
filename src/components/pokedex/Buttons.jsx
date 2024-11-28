function Buttons( { pokemons, setPokemons } ) {

    const onNext = () => {
        setPokemons(pokemons?.next);
      };
      const onPrev = () => {
        setPokemons(pokemons?.previous);
      };

  return (
    <div className="container__btn">
      <button className="btn" onClick={onPrev} disabled={!pokemons?.previous}>
      ←
      </button>
      <button className="btn" onClick={onNext} disabled={!pokemons?.next}>
      →
      </button>
    </div>
  );
}

export default Buttons;
