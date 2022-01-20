let countriesList1 = document.createElement('ul');
let submitBtn = document.querySelector('#btnShowData');
const countryOption = document.querySelector('#country');
const capitalOption = document.querySelector('#capital');
const continentOption = document.querySelector('#continents');

const continentsList = document.querySelector('.continents-options');
const countriesList = document.querySelector('.countries-options');

const searchForm = document.querySelector('form');
const allInfosFields = document.querySelectorAll('h3'); 

const continentsSelectOption = document.querySelector('#continents-list'); //Continents category : continents select option
const countriesSelectOption = document.querySelector('#countries-select-options');//Continents subcategory : Countries select option  
let toggle = false;


// ------------------------- INITIALIZING THE COUNTRIES DATA API ------------------------- :
async function getAllCountries() {
    
    const res = await fetch('https://restcountries.com/v3.1/all');
    const data = await res.json();
    const countryTest = `Country: ${data[0].name.common}; Capital :${ data[0].capital[0]} ; Continent : ${data[0].continents[0]}; Currency : ${data[0].currencies.PGK.name}. `


    for (let i = 0; i < data.length; i++) {
        
        let country = document.createElement('li');
        
        if (data[i].hasOwnProperty('capital')) {
            country.innerHTML = `COUNTRY : ${data[i].name.common} | Capital :${data[i].capital[0]} | CONTINENT: ${data[i].continents[0]} `
        } else {
            country.innerHTML = `COUNTRY : ${data[i].name.common} | CONTINENT: ${data[i].continents[0]} `
        }
        countriesList.appendChild(country); 
    }

    // console.log(data);
    // console.log(countriesList);

    //GETTING EUROPE COUNTRIES : 
    const resEurope = await fetch('https://restcountries.com/v3.1/region/europe');
    const dataEurope = await resEurope.json();
    // console.log(dataEurope);

    const europeanCountries = dataEurope.map((country)=> {

        return country.name.common;
    })

    // console.log(europeanCountries);

    //GETTING ASIA COUNTRIES : 
    const resAsia = await fetch('https://restcountries.com/v3.1/region/asia');
    const dataAsia = await resAsia.json();
    // console.log(dataAsia);

    const asianCountries = dataAsia.map((country)=> {

        return country.name.common;
    })

    // console.log(asianCountries);

    //GETTING AMERICAS COUNTRIES : 
    const resAmericas = await fetch('https://restcountries.com/v3.1/region/americas');
    const dataAmericas = await resAmericas.json();
    // console.log(dataAmericas);

    const americasCountries = dataAmericas.map((country)=> {

        return country.name.common;
    })

    // console.log(americasCountries);


    //GETTING AFRICA'S COUNTRIES : 
    const resAfrica = await fetch('https://restcountries.com/v3.1/region/africa');
    const dataAfrica = await resAfrica.json();
    // console.log(dataAfrica);

    const africaCountries = dataAfrica.map((country)=> {

        return country.name.common;
    })

    // console.log(africaCountries);

    //GETTING OCEANIA'S COUNTRIES : 
    const resOceania = await fetch('https://restcountries.com/v3.1/region/oceania');
    const dataOceania = await resOceania.json();
    // console.log(dataOceania);

    const oceaniaCountries = dataOceania.map((country)=> {

        return country.name.common;
    })

    // console.log(oceaniaCountries);
    
}

// getAllCountries();

// CREATING A FUNCTION THAT WILL SEARCH A COUNTRY WITH ITS CAPITAL'S NAME

async function getCountryByCapital() {
    
    const capital = document.querySelector('#searchbar').value;
    const countryField = document.querySelector('#about-country');
    const capitalField = document.querySelector('#about-capital');
    const currencyField = document.querySelector('#about-currency');
    const continentField = document.querySelector('#about-continent');
    // const res = await fetch(`https://restcountries.com/v3.1/capital/lima`);

    const res = await fetch(`https://restcountries.com/v3.1/capital/${capital}`);
    const data = await res.json();

    // CURRENCY :
    let currencies = data[0].currencies;
    let currencyKey = Object.values(currencies);
    currencyKey = currencyKey[0].name;
    currencies = currencyKey;

    //CONTINENT :
    const continent = `${data[0].continents[0]}`;


    // FILLING MY HTML RESULTS FIELDS WITH THE COUNTRY'S DATA :
    countryField.innerHTML =  data[0].name.common;
    capitalField.innerHTML = capital;
    currencyField.innerHTML = currencyKey;
    continentField.innerHTML = continent;

    //MAKING MY INFOS VISIBLE BY CHANGING THE DISPLAY:
    allInfosFields.forEach(field => field.style.display = "block");

}

// getCountryByCapital();



// CREATING A FUNCTION THAT WILL SEARCH A COUNTRY WITH ITS NAME

async function getCountryByName() {

    const country = document.querySelector('#searchbar').value;
    const countryField = document.querySelector('#about-country');
    const capitalField = document.querySelector('#about-capital');
    const currencyField = document.querySelector('#about-currency');
    const continentField = document.querySelector('#about-continent');
    // const res = await fetch(`https://restcountries.com/v3.1/name/peru`);

    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();

    // CURRENCY :
    let currencies = data[0].currencies;
    let currencyKey = Object.values(currencies);
    currencyKey = currencyKey[0].name;
    currencies = currencyKey;

    //CONTINENT :
    const continent = data[0].continents[0];

    //CAPITAL :
    const capital = data[0].capital[0];

    
    // FILLING MY HTML RESULTS FIELDS WITH THE COUNTRY'S DATA :
    countryField.innerHTML =  country.toUpperCase();
    capitalField.innerHTML = capital;
    currencyField.innerHTML = currencyKey;
    continentField.innerHTML = continent;

    //MAKING MY INFOS VISIBLE BY CHANGING THE DISPLAY:
    allInfosFields.forEach(field => field.style.display = "block");

}

// getCountryByName()

//-------------------- CREATING MY SEARCH FUNCTIONS  -------------------- : 

//Adding an event listener to my form :
function launchResearchCountry() {


    searchForm.addEventListener('submit', (e) => {

        e.preventDefault();
    
        if (countryOption.checked) {
            getCountryByName();
    
        } else if (capitalOption.checked) {

            getCountryByCapital(); 
        }
        
    });
    const inputField = document.querySelector('#searchbar').value = "";
};

launchResearchCountry();

//Adding an event listener to my submit button :
submitBtn.addEventListener('click', (e) => {
    

    e.preventDefault();
    
    if (countryOption.checked) {
        getCountryByName();
        
    } else if (capitalOption.checked) {
        getCountryByCapital(); 
    }
    const inputField = document.querySelector('#searchbar').value = "";

});

//AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * 

// //CREATING A FUNCTION THAT WILL CREATE A LIST OF THE AFRICAN COUNTRIES WHEN AFRICA CONTINENT IS SELECTED:

async function listAfricanCountries() {
    
    const resAfrica = await fetch('https://restcountries.com/v3.1/region/africa');
    const dataAfrica = await resAfrica.json();

    const africaCountries = dataAfrica.map((country)=> {

        return country.name.common;
    })

    while (countriesSelectOption.length > 1) {
        console.log("supprimé AFRICA: ", countriesSelectOption.lastElementChild);
        countriesSelectOption.removeChild(countriesSelectOption.lastElementChild);
    }

    console.log("longueur countries list AFRICA ", countriesSelectOption.length);

    for (let i = 0; i < africaCountries.length; i++) {
        

        let africanCountry = document.createElement('option');
        africanCountry.value = africaCountries[i];
        africanCountry.innerHTML = africaCountries[i];
        countriesSelectOption.appendChild(africanCountry);
        
    }

    console.log("longueur countries AFRICA post ajout: ", countriesSelectOption.length );
}

// listAfricanCountries();

//AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * 

//CREATING A FUNCTION THAT WILL CREATE A LIST OF THE AMERICAS COUNTRIES WHEN AMERICAS CONTINENT IS SELECTED:

async function listAmericasCountries() {
    
    const resAmericas = await fetch('https://restcountries.com/v3.1/region/americas');
    const dataAmericas = await resAmericas.json();

    const americasCountries = dataAmericas.map((country)=> {

        return country.name.common;
    })

    // console.log(americasCountries);

    while (countriesSelectOption.length > 1) {
        console.log("supprimé: AMERICA", countriesSelectOption.lastElementChild);
        countriesSelectOption.removeChild(countriesSelectOption.lastElementChild);
    }

    console.log("longueur countries list AMERICAS", countriesSelectOption.length);

    for (let i = 0; i < americasCountries.length; i++) {

        let americanCountry = document.createElement('option');
        americanCountry.value = americasCountries[i];
        americanCountry.innerHTML = americasCountries[i];
        countriesSelectOption.appendChild(americanCountry);
        
    }

    console.log("longueur countries AMERICAS post ajout: ", countriesSelectOption.length );
}

// listAmericasCountries();

// EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * 

//CREATING A FUNCTION THAT WILL CREATE A LIST OF THE EUROPEAN COUNTRIES WHEN EUROPEAN CONTINENT IS SELECTED:

async function listEuropeCountries() {
    
    const resEurope = await fetch('https://restcountries.com/v3.1/region/europe');
    const dataEurope = await resEurope.json();

    const europeanCountries = dataEurope.map((country)=> {

        return country.name.common;
    })

    while (countriesSelectOption.length > 1) {
        countriesSelectOption.removeChild(countriesSelectOption.lastElementChild);
    }

    for (let i = 0; i < europeanCountries.length; i++) {

        let europeanCountry = document.createElement('option');
        europeanCountry.value = europeanCountries[i];
        europeanCountry.innerHTML = europeanCountries[i];
        countriesSelectOption.appendChild(europeanCountry);
    }

}
// listEuropeCountries();







continentOption.addEventListener('click', () => {

    toggle = true; 
    if (continentOption.checked) {
        continentsList.style.display = "flex"; 
    } 
     toggle = false;
})



continentsSelectOption.addEventListener('change', () => {
    
    countriesList.style.display = "flex";
    
    if (continentsSelectOption.value === "Africa") {
        
        listAfricanCountries();
        
    } else if (continentsSelectOption.value === "Americas") {
        listAmericasCountries();
        console.log("coucou Americas");

    } else if (continentsSelectOption.value === "Europe") {
        listEuropeCountries();
    }

    
})

//  ---------------------------------- TO DO  ---------------------------------

//catch errors : if country's name or capital's name is wrong or field empty 




 

