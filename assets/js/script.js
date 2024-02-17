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

    var card = document.querySelector('#card');
    card.setAttribute('style', `border: 3px solid black; background-image: url(${display[0].flags.svg}); background-size: cover`);

    var flag = display[0].flags.svg;

    searchInput.value = "";

    var nameEl = document.createElement('h2');
    nameEl.textContent = display[0].name.official;

    var capitialEl = document.createElement('h3');
    capitialEl.textContent = "Capital: " + display[0].capital;

    var continentEL = document.createElement('h3');
    continentEL.textContent = "Continent: " + display[0].continents;

    var langaugeEl = document.createElement('h3');
    langaugeEl.textContent = "langauge: " + Object.values(display[0].languages)[0];

    var populationtEL = document.createElement('h3');
    populationtEL.textContent = "Population: " + display[0].population.toLocaleString();

    card.appendChild(nameEl);
    card.appendChild(capitialEl);
    card.appendChild(continentEL);
    card.appendChild(langaugeEl);
    card.appendChild(populationtEL);

    saveButton(nameEl, capitialEl, continentEL, langaugeEl, populationtEL, flag)
}

function saveButton(nameEl, capitialEl, continentEL, langaugeEl, populationtEL, flag) {
    
    var form = document.querySelector("#form");

    save = document.createElement('button');
    save.setAttribute('style', 'padding: 5px 10px 5px 10px;')
    save.textContent = "Save";

    form.appendChild(save);

    save.addEventListener('click', function(event){
        event.preventDefault();

        var savedObject = {
            name: nameEl.textContent,
            capitial: capitialEl.textContent,
            continent: continentEL.textContent,
            langauge: langaugeEl.textContent,
            population: populationtEL.textContent,
            flag: flag
        }

        var savedCountries = JSON.parse(localStorage.getItem("savedCountries"))
        if (savedCountries !== null) {
            saved = savedCountries;
        }

        if(!saved.includes(savedObject)){
        saved.push(savedObject);
        window.localStorage.setItem('savedCountries', JSON.stringify(saved));
        save.setAttribute('style', 'display: none;');
        }
    })
}

searchButton.addEventListener('click', searchForm);