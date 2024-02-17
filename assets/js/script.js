var searchInput = document.querySelector('#input');
var searchButton = document.querySelector('#button');
var save;
var saved = [];

var prompt = document.getElementById('modal');
var promptTxt = document.getElementById('promptTxt');
var exitPrompt = document.getElementById('close');

function searchForm(event){
    event.preventDefault();
    search = searchInput.value.trim();
    if(search == ''){
        prompt.style.display = 'block';
            promptTxt.textContent = "Alert: Please Enter Country Name";
            exitPrompt.addEventListener('click', function() {
                prompt.style.display = 'none';
        })
        return
    } 
    getCountryInfo()
}

function clear() {
    card.innerHTML = '';
}

function getCountryInfo() {

    var countryInfo = `https://restcountries.com/v3.1/name/${search}`;
  
    fetch(countryInfo)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        clear() 
        if(save){
            save.setAttribute('style', 'display: none;');
        }
        displayCountry(data)
    });
}

function displayCountry(display) {
    
    searchInput.value = "";

    var countryObject = {
        name: display[0].name.official,
        capitial: display[0].capital,
        continent: display[0].continents,
        langauge: Object.values(display[0].languages)[0],
        population: display[0].population.toLocaleString(),
        flag: display[0].flags.svg
    }

    var card = document.querySelector('#card');
    card.setAttribute('style', `border: 3px solid black; background-image: url(${countryObject.flag}); background-size: cover`);

    var cardEl = document.createElement('div');
    cardEl.setAttribute('class', 'center');
    cardEl.innerHTML = `<h2>${countryObject.name}</h2>
                        <h3>Capitial: ${countryObject.capitial}</h3>
                        <h3>Continent: ${countryObject.continent}</h3>
                        <h3>Langauge: ${countryObject.langauge}</h3>
                        <h3>Population: ${countryObject.population}</h3>`;

    card.appendChild(cardEl);

    saveButton(countryObject)
}

function saveButton(countryObject) {
    
    var form = document.querySelector("#form");

    save = document.createElement('button');
    save.setAttribute('style', 'padding: 5px 10px 5px 10px;')
    save.textContent = "Save";

    form.appendChild(save);

    save.addEventListener('click', function(event){
        event.preventDefault();

        var savedCountries = JSON.parse(localStorage.getItem("savedCountries"))
        if (savedCountries !== null) {
            saved = savedCountries;
        }

        if(!saved.includes(countryObject)){
        saved.push(countryObject);
        window.localStorage.setItem('savedCountries', JSON.stringify(saved));
        save.setAttribute('style', 'display: none;');
        }
    })
}

searchButton.addEventListener('click', searchForm);