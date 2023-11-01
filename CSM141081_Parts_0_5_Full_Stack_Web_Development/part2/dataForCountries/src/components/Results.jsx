import { useState } from "react";
import React from "react";
import { CountryData } from "./CountryData";
import { ShowButton } from "./ShowButton";

export const Results = ({countries}) => {
    const [selectedCountry, setSelectedCountry] = useState(null);

    // If no countries than component should not render
    if (!countries || countries.length === 0) {
        return null; 
    }

    // Handle the function for showing the country uppon user selection
    function handleShow(country){
        setSelectedCountry(country);
    }

    // if user has selected the country than render it
    if (selectedCountry) {
        return <CountryData country={selectedCountry} />;
    }
    
    return (
        <div>
            {countries.length > 1 ? 
                countries.map(country => (
                    <div key={country.name.official}>
                        {country.name.official} 
                        <ShowButton country={country} handleShow={handleShow} />
                    </div>
                )) :
                <CountryData country={countries[0]} />
            }
        </div>
    );
}
