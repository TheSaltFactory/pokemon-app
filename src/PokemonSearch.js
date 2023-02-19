function PokemonSearch(props) {
    
    return (
        <div className="input-group mb-3 row mx-auto">
            <input 
            type="text" 
            className="form-control text-center light" 
            placeholder="Search Pokemon by Name, Filtering Occurs as you Type" 
            aria-label="Search Pokemon by Name, Filtering Occurs as you Type" 
            aria-describedby="basic-addon2" 
            onChange={props.search} />
        </div>
    )
}

export default PokemonSearch;