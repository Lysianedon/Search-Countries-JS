// global.fetch = require("node-fetch");

async function getAllCountries() {
    
    const res = await fetch('https://restcountries.com/v3.1/all');
    const data = await res.json();
    const country = `Country: ${data[0].name.common}; Capital :${ data[0].capital[0]} ; Continent : ${data[0].continents[0]}; Currency : ${data[0].currencies.PGK.name}. `



    console.log("test country 1", country);
    console.log("liste pays:", data);
    
}


getAllCountries();


