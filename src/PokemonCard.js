import React, { useState, useEffect} from 'react';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function typeColor(type) {
    if (type === "grass") {
        return <span className="text-success">{type}</span>
    } else if (type === "fire") {
        return <span className="text-danger">{type}</span>
    } else if (type === "water") {
        return <span className="text-primary">{type}</span>
    } else {
        return <span>{type}</span>
    }
}

function PokemonCard(mon) {
    const [error, setError] = useState(null);
    const [isDetailLoaded, setIsDetailLoaded] = useState(false);
    const [detail, setDetail] = useState([]);
    useEffect(() => {
        fetch(mon.url)
        .then(res => res.json())
        .then(
            (data) => {
            setIsDetailLoaded(true);
            setDetail(data);
            },
            (err) => {
            setIsDetailLoaded(true);
            setError(err);
            });
    }, [mon])


    if(error) {
        return <div>Error: {error.message}</div>;
    } else if (!isDetailLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
        <div className="p-2">
            <div className={"card mt-5 monCard " + ((mon.battle) && "monHover")}>
                <img className="card-img-top" src={detail.sprites.front_default} alt={detail.name} />
                <h5 className="card-title text-center">{capitalizeFirstLetter(detail.name)}</h5>
                <ul className="list-group"> 
                    <li className="list-group-item"><b>Ability:</b> {detail.abilities[0].ability.name} </li> 
                    <li className="list-group-item"><b>Type:</b> {typeColor(detail.types[0].type.name)} </li>
                    <li className="list-group-item"><b>Height:</b> {detail.height} </li> 
                    <li className="list-group-item"><b>Weight:</b> {detail.weight} </li>
                </ul>
            </div>
        </div> );
    }
}

export default PokemonCard;