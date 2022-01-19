// global.fetch = require("node-fetch");
let countriesList = document.createElement('ul');

async function getAllCountries() {
    
    const res = await fetch('https://restcountries.com/v3.1/all');
    const data = await res.json();
    const countryTest = `Country: ${data[0].name.common}; Capital :${ data[0].capital[0]} ; Continent : ${data[0].continents[0]}; Currency : ${data[0].currencies.PGK.name}. `


    for (let i = 0; i < data.length; i++) {
        
        let country = document.createElement('li');
        // country.innerHTML = `COUNTRY : ${data[i].name.common} | CONTINENT: ${data[i].continents[0]} `
        
        if (data[i].hasOwnProperty('capital')) {
            country.innerHTML = `COUNTRY : ${data[i].name.common} | Capital :${data[i].capital[0]} | CONTINENT: ${data[i].continents[0]} `
        } else {
            country.innerHTML = `COUNTRY : ${data[i].name.common} | CONTINENT: ${data[i].continents[0]} `
        }
        countriesList.appendChild(country); 
    }

    // console.log(data);
    console.log(countriesList);
    
}

getAllCountries();


