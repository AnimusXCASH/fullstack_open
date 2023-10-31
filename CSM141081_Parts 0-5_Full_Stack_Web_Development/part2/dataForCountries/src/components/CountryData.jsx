import { CountryWeather } from "./Weather";


export const CountryData = ({country}) =>{

    return (
        <div>
            <h1>{country.name.official}</h1>
            <p>capital {country.capital[0]}</p>
            <h2>languages:</h2>
            <ul>
                {Object.entries(country.languages).map(([code, name]) => (
                    <li key={code}>{name} </li>
                ))}
            </ul>
            <img src={country.flags.png} 
            alt={`Flag ${country.name.official}`} />
            <h2>Weather in {country.capital[0]}</h2>
            <CountryWeather location={country.capital[0]} />
        </div>
    );
}
