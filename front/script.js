// ---------------------------- INITIALIZING MY VARIABLES ------------------------------- :
const submitBtn = document.querySelector('#btnShowData'); //Submit Button
const resetBtn = document.querySelector('#reset-btn'); // Reset Button
let inputFieldValue = document.querySelector('#searchbar').value; //Input field value (search bar)

const loadingSpinner = document.querySelector('.lds-spinner'); //Load spinner for website loading
loadingSpinner.style.display = "none"; //LOAD SPINNER : HIDDEN

const getDisplayInitialCountiesListByUl = document.querySelector('initialCountiesList'); //Initial countries list 

const countryOption = document.querySelector('#country'); 
const capitalOption = document.querySelector('#capital'); 
const continentOption = document.querySelector('#continents'); 

const continentsList = document.querySelector('.continents-options');  
const countriesList = document.querySelector('.countries-options'); 

const searchForm = document.querySelector('form');
const allInfosFields = document.querySelectorAll('h3'); 

let countriesList1 = document.createElement('ul'); 
const continentsSelectOption = document.querySelector('#continents-list'); //Continents category : continents select option
const countriesSelectOption = document.querySelector('#countries-select-options');//Continents subcategory : Countries select option  
let toggle = false;

let targetPlace = [47.5, 19.08]; //Map settings view : corresponding to the country/capital's position 
let map = L.map('map').setView(targetPlace, 6); // Map view;

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 13,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHlzaWFuZSIsImEiOiJja3luMnlwb2EzbDdlMnFvOGRmYWI5YW8yIn0.xLYPqil-ZwAtIqcxljjGOg'
}).addTo(map);

document.querySelector('#map').style.display = "none"; //Hiding the map before any API request

// ------------------------- INITIALIZING THE COUNTRIES DATA API ------------------------- :
async function getAllCountries() {
    
    const res = await fetch('https://restcountries.com/v3.1/all');
    const data = await res.json();
    // const countryTest = `Country: ${data[0].name.common}; Capital :${ data[0].capital[0]} ; Continent : ${data[0].continents[0]}; Currency : ${data[0].currencies.PGK.name}. `
    
    //DISPLAYING THE COUNTRIES LIST INTO AN UL LIST IN THE HTML : 
    const initialCountiesList = document.createElement('ul');
    initialCountiesList.id = "initialCountiesList";
    
    for (let i = 0; i < data.length; i++) {
        
        let country = document.createElement('li');
        country.classList.add('ulCountry');
        
        if (data[i].hasOwnProperty('capital')) {
            country.innerHTML = `COUNTRY : ${data[i].name.common} | Capital :${data[i].capital[0]} | CONTINENT: ${data[i].continents[0]} `
        } else {
            country.innerHTML = `COUNTRY : ${data[i].name.common} | CONTINENT: ${data[i].continents[0]} `
        }
        initialCountiesList.appendChild(country); 
    }

    //INSERTING MY UL LIST INTO THE DOM BELOW THE <HR> ------- : 
    const displayInitialCountiesList = document.querySelector('hr').parentElement.insertBefore(initialCountiesList, allInfosFields[0]);

};

getAllCountries();

// CREATING A FUNCTION THAT WILL SEARCH A COUNTRY WITH ITS CAPITAL'S NAME

async function getCountryByCapital() {

    const capital = document.querySelector('#searchbar').value;

    //Guard : 
    if (capital === ""|| capital === " ") {

        loadingSpinner.style.display = "none";
        const msgError = document.createElement('p');
        msgError.innerHTML = "Erreur, remplissez correctement le champs! ";
        msgError.classList.add('error');
        document.body.insertBefore(msgError, searchForm);

        setTimeout(() => {
            msgError.remove();
        }, 2000);

        return;
    }
    
    loadingSpinner.style.display = "inline-block";

    const countryField = document.querySelector('#about-country');
    const capitalField = document.querySelector('#about-capital');
    const currencyField = document.querySelector('#about-currency');
    const continentField = document.querySelector('#about-continent');

    const res = await fetch(`https://restcountries.com/v3.1/capital/${capital}`);
    const data = await res.json();

    //GETTING THE POSITION OF THE COUNTRY IN THE JSON:
    let x = data[0].capitalInfo.latlng[0];
    let y = data[0].capitalInfo.latlng[1];
    let targetPlace = [x, y];

    // SETTING MY MAP VIEW WITH MY CAPITAL'S POSITION:
    map.setView(targetPlace, 6);

    //MAP VIEW DISPLAY : 
    document.querySelector('#map').style.display = "block";


    //HIDING MY INITIAL GLOBAL COUNTRIES LIST TO REPLACE IT WITH THE USER'S SEARCH RESULTS :
    document.querySelector('ul').style.display = "none";

    //REMOVING THE LOADING SPINNER AS SOON AS THE SEARCH RESULTS ARE DISPLAYED : 
    loadingSpinner.style.display = "none";
    
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

};

// CREATING A FUNCTION THAT WILL SEARCH A COUNTRY WITH ITS NAME

async function getCountryByName() {

    //Guards 
    let country = document.querySelector('#searchbar').value;

    if (country.toUpperCase() === 'CHINA') {
        country = "Chine";
    } else if (country === ""|| country === " ") {

        loadingSpinner.style.display = "none";
        const msgError = document.createElement('p');
        msgError.innerHTML = "Erreur, remplissez correctement le champs! ";
        msgError.classList.add('error');
        document.body.insertBefore(msgError, searchForm);

        setTimeout(() => {
            msgError.remove();
        }, 2000);

        return;
    }


    loadingSpinner.style.display = "inline-block";

    const countryField = document.querySelector('#about-country');
    const capitalField = document.querySelector('#about-capital');
    const currencyField = document.querySelector('#about-currency');
    const continentField = document.querySelector('#about-continent');

    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();

    //GETTING THE POSITION OF THE COUNTRY IN THE JSON:
    let x = data[0].latlng[0];
    let y = data[0].latlng[1];
    let targetPlace = [x, y];
    
    // SETTING MY MAP VIEW WITH MY CAPITAL'S POSITION:
    map.setView(targetPlace, 6);

    //MAP VIEW DISPLAY : 
    document.querySelector('#map').style.display = "block";

    //HIDING MY INITIAL GLOBAL COUNTRIES LIST TO REPLACE IT WITH THE USER'S SEARCH RESULTS :
    
    if ( document.querySelector('ul')) {
        document.querySelector('ul').style.display = "none";
        
    }

    //REMOVING THE LOADING SPINNER AS SOON AS THE SEARCH RESULTS ARE DISPLAYED : 
    loadingSpinner.style.display = "none";

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

};


// ADDING A RESET FUNCTION : WHEN CLICKING ON THE RESET BUTTON, THE WEBSITE FIELDS GET REINITIALIZED ----

function resetAll() {
    
    resetBtn.addEventListener('click', (e) => {
        
        e.preventDefault();
        //HIDING THE USER'S SEARCH RESULTS TO DISPLAY THE INITIAL GLOBAL COUNTRIES LIST:
        document.querySelector('input').value = "";
        document.querySelectorAll('span').forEach(info => info.innerHTML = "");
        continentsList.style.display = "none";
        countriesList.style.display = "none";
        document.querySelectorAll('h3').forEach(info => info.style.display = "none");
        
        //HIDING THE MAP VIEW :
        document.querySelector('#map').style.display = "none";
        
        //DISPLAYING MY INITIAL GLOBAL LIST OF COUNTRIES:
        document.querySelector('ul').style.display = "block";
        loadingSpinner.style.display = "none";
    })
};


//-------------------- CREATING MY SEARCH FUNCTIONS  -------------------- : 

//Adding event listeners to my form :
function launchResearchCountry() {

    //Enabling the reset function :
    resetAll();

    searchForm.addEventListener('submit', (e) => {

        loadingSpinner.style.display = "inline-block";
        e.preventDefault();
    
        if (countryOption.checked) {
            getCountryByName();
    
        } else if (capitalOption.checked) {

            getCountryByCapital(); 
        }
        
    });
    inputField = document.querySelector('#searchbar').value = "";
};

launchResearchCountry();

//Adding an event listener to my submit button :
submitBtn.addEventListener('click', (e) => {
    
    loadingSpinner.style.display = "inline-block";
    e.preventDefault();
    
    if (countryOption.checked) {
        getCountryByName();
        
    } else if (capitalOption.checked) {
        getCountryByCapital(); 
    }
    const inputField = document.querySelector('#searchbar').value = "";
    loadingSpinner.style.display = "none";

});

//AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * AFRICA * 

// //CREATING A FUNCTION THAT WILL MAKE AN HTML SELECT LIST OF THE AFRICAN COUNTRIES WHEN AFRICA CONTINENT IS SELECTED:

async function listAfricanCountries() {
    
    const resAfrica = await fetch('https://restcountries.com/v3.1/region/africa');
    const dataAfrica = await resAfrica.json();
    
    //HIDING MY INITIAL GLOBAL COUNTRIES LIST TO REPLACE IT WITH THE USER'S SEARCH RESULTS :
    document.querySelector('ul').style.display = "none";

    //REMOVING THE LOADING SPINNER AS SOON AS THE SEARCH RESULTS ARE DISPLAYED : 
    loadingSpinner.style.display = "none";

    const africaCountries = dataAfrica.map((country)=> {

        return country.name.common;
    })

    while (countriesSelectOption.length > 1) {
        countriesSelectOption.removeChild(countriesSelectOption.lastElementChild);
    }

    for (let i = 0; i < africaCountries.length; i++) {
        

        let africanCountry = document.createElement('option');
        africanCountry.value = africaCountries[i];
        africanCountry.innerHTML = africaCountries[i];
        countriesSelectOption.appendChild(africanCountry);
        
    }
};

//AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * AMERICAS * 

//CREATING A FUNCTION THAT WILL MAKE AN HTML SELECT LIST OF THE AMERICAS COUNTRIES WHEN AMERICAS CONTINENT IS SELECTED:

async function listAmericasCountries() {
    
    const resAmericas = await fetch('https://restcountries.com/v3.1/region/americas');
    const dataAmericas = await resAmericas.json();

    //HIDING MY INITIAL GLOBAL COUNTRIES LIST TO REPLACE IT WITH THE USER'S SEARCH RESULTS :
    document.querySelector('ul').style.display = "none";

    //REMOVING THE LOADING SPINNER AS SOON AS THE SEARCH RESULTS ARE DISPLAYED : 
    loadingSpinner.style.display = "none";

    const americasCountries = dataAmericas.map((country)=> {

        return country.name.common;
    })

    while (countriesSelectOption.length > 1) {
        countriesSelectOption.removeChild(countriesSelectOption.lastElementChild);
    }

    for (let i = 0; i < americasCountries.length; i++) {

        let americanCountry = document.createElement('option');
        americanCountry.value = americasCountries[i];
        americanCountry.innerHTML = americasCountries[i];
        countriesSelectOption.appendChild(americanCountry);  
    }
};


// EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * EUROPE * 

//CREATING A FUNCTION THAT WILL MAKE AN HTML SELECT LIST OF THE EUROPEAN COUNTRIES WHEN EUROPEAN CONTINENT IS SELECTED:

async function listEuropeCountries() {
    
    const resEurope = await fetch('https://restcountries.com/v3.1/region/europe');
    const dataEurope = await resEurope.json();

    //HIDING MY INITIAL GLOBAL COUNTRIES LIST TO REPLACE IT WITH THE USER'S SEARCH RESULTS :
    document.querySelector('ul').style.display = "none";

    //REMOVING THE LOADING SPINNER AS SOON AS THE SEARCH RESULTS ARE DISPLAYED : 
    loadingSpinner.style.display = "none";

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

};

//ASIA * ASIA * ASIA * ASIA * ASIA * ASIA * ASIA * ASIA * ASIA * ASIA * ASIA * ASIA * ASIA * ASIA * ASIA * ASIA * ASIA * ASIA * 
//CREATING A FUNCTION THAT WILL MAKE AN HTML SELECT LIST OF THE ASIAN COUNTRIES WHEN ASIA CONTINENT IS SELECTED:

async function listAsianCountries() {
    
    loadingSpinner.style.display = "inline-block";
    const resAsia = await fetch('https://restcountries.com/v3.1/region/asia');
    const dataAsia = await resAsia.json();

    //HIDING MY INITIAL GLOBAL COUNTRIES LIST TO REPLACE IT WITH THE USER'S SEARCH RESULTS :
    document.querySelector('ul').style.display = "none";

    //REMOVING THE LOADING SPINNER AS SOON AS THE SEARCH RESULTS ARE DISPLAYED : 
    loadingSpinner.style.display = "none";

    const asianCountries = dataAsia.map((country)=> {

        return country.name.common;
    })

    while (countriesSelectOption.length > 1) {
        countriesSelectOption.removeChild(countriesSelectOption.lastElementChild);
    }

    for (let i = 0; i < asianCountries.length; i++) {

        let asianCountry = document.createElement('option');
        asianCountry.value = asianCountries[i];
        asianCountry.innerHTML = asianCountries[i];
        countriesSelectOption.appendChild(asianCountry);
    }

};


// OCEANIA * OCEANIA * OCEANIA * OCEANIA * OCEANIA * OCEANIA * OCEANIA * OCEANIA * OCEANIA * OCEANIA * OCEANIA * OCEANIA * OCEANIA * 
//CREATING A FUNCTION THAT WILL MAKE AN HTML SELECT LIST OF OCEANIA'S COUNTRIES WHEN OCEANIA REGION IS SELECTED:

async function listOceaniaCountries() {
    
    loadingSpinner.style.display = "inline-block";

    const resOceania = await fetch('https://restcountries.com/v3.1/region/oceania');
    const dataOceania = await resOceania.json();

    //HIDING MY INITIAL GLOBAL COUNTRIES LIST TO REPLACE IT WITH THE USER'S SEARCH RESULTS :
    document.querySelector('ul').style.display = "none";

    //REMOVING THE LOADING SPINNER AS SOON AS THE SEARCH RESULTS ARE DISPLAYED : 
    loadingSpinner.style.display = "none";

    const oceaniaCountries = dataOceania.map((country)=> {

        return country.name.common;
    })

    while (countriesSelectOption.length > 1) {
        countriesSelectOption.removeChild(countriesSelectOption.lastElementChild);
    }

    for (let i = 0; i < oceaniaCountries.length; i++) {

        let oceanianCountry = document.createElement('option');
        oceanianCountry.value = oceaniaCountries[i];
        oceanianCountry.innerHTML = oceaniaCountries[i];
        countriesSelectOption.appendChild(oceanianCountry);
    }

};

continentOption.addEventListener('click', () => {

    toggle = true; 
    if (continentOption.checked) {
        continentsList.style.display = "flex"; 
    } 
     toggle = false;
})


continentsSelectOption.addEventListener('change', () => {

    loadingSpinner.style.display = "inline-block";
    countriesList.style.display = "flex";
    
    if (continentsSelectOption.value === "Africa") {
        
        listAfricanCountries();
        
    } else if (continentsSelectOption.value === "Americas") {
        listAmericasCountries();

    } else if (continentsSelectOption.value === "Europe") {
        listEuropeCountries();

    } else if (continentsSelectOption.value === "Asia") {
        listAsianCountries();

    } else if (continentsSelectOption.value === "Oceania") {
        listOceaniaCountries();
    } else {

        while (countriesSelectOption.length > 1) {
            countriesSelectOption.removeChild(countriesSelectOption.lastElementChild);
        }
        countriesList.style.display = "none";
        //REMOVING THE LOADING SPINNER AS SOON AS THE SEARCH RESULTS ARE DISPLAYED : 
        loadingSpinner.style.display = "none";

        //DISPLAYING MY INITIAL GLOBAL COUNTRIES LIST TO REPLACE IT WITH THE USER'S SEARCH RESULTS :
        document.querySelector('ul').style.display = "block";
    }

});


countriesSelectOption.addEventListener('change', () => {
    document.querySelector('#searchbar').value = countriesSelectOption.value;
    inputFieldValue = countriesSelectOption.value;
    getCountryByName();

});






