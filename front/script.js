let countriesList = document.createElement('ul');
let submitBtn = document.querySelector('#btnShowData');
const countryOption = document.querySelector('#country');
const capitalOption = document.querySelector('#capital');
const continentOption = document.querySelector('#continents');
const  continentsList = document.querySelector('.continents-options');
const searchForm = document.querySelector('form');
const allInfosFields = document.querySelectorAll('h3');
let toggle = false;


// INITIALIZING THE COUNTRIES DATA API :
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

continentOption.addEventListener('click', () => {

    toggle = true; 
    if (continentOption.checked) {
        continentsList.style.display = "flex"; 
    } 
     toggle = false;
})




