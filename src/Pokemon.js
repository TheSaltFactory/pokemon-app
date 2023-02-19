import React, { useState, useEffect} from 'react';
import PokemonCard from './PokemonCard.js';
import PokemonSearch from './PokemonSearch.js';

function Pokemon() {
  const [err, setError] = useState(null);
  const [isPokeLoaded, setIsPokeLoaded] = useState(false);
  const [poke, setPoke] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [battle, setBattle] = useState(false);

  const handleChange = (input) => {
    input.preventDefault();
    searchMon(input.target.value, poke, setFiltered);
  }

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=9&amp;offset=0")
      .then(res => res.json())
      .then(
        (data) => {
          setIsPokeLoaded(true);
          setPoke(data.results);
          setFiltered(data.results);
        },
        (err) => {
          setIsPokeLoaded(true);
          setError(err);
        });
  }, [])

  if(err) {
    return <div>Error: {err.message}</div>;
  } else if (!isPokeLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="dark">
        <PokemonSearch search={handleChange} />
        <div className="row row-cols-1 row-cols-md-3 col-sm-12 col-md-6 col-lg-4 col-xs-12 mx-auto border border-dark border-4 rounded-top light">
          <div className="col-md-12 text-center">
            <button type="button" className="btn btn-danger btn-lg" onClick={ () => setBattle(!battle)}>BATTLE!</button>
          </div>
          {filtered.map((poke) => (
            <PokemonCard
            key={poke.name}
            name={poke.name}
            url={poke.url}
            battle={battle}
            />
          ))}
        </div>
      </div>
    );
  }
}

function searchMon(input, mon, setFiltered) {
  if (input.length > 0) {
    setFiltered(mon.filter((mon) => {
      return mon.name.includes(input.toLowerCase());
    }));
    console.log(mon);
  } else {
    setFiltered(mon);
  }
}

export default Pokemon;
