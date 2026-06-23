var search = "";
var save;
var saved = [];

var searchInput = document.querySelector("#input");
var searchButton = document.querySelector("#button");

var prompt = document.getElementById("modal");
var promptTxt = document.getElementById("promptTxt");
var exitPrompt = document.getElementById("close");

function searchForm(event) {
  event.preventDefault();

  search = searchInput.value.trim();

  if (search === "") {
    prompt.style.display = "block";
    promptTxt.textContent = "Alert: Please Enter Country Name";

    exitPrompt.addEventListener("click", function () {
      prompt.style.display = "none";
    });

    return;
  }

  getCountryInfo();
}

function clear() {
  document.querySelector("#card").innerHTML = "";
}

function showError(message) {
  prompt.style.display = "block";
  promptTxt.textContent = message;

  exitPrompt.onclick = function () {
    prompt.style.display = "none";
  };
}

function getCountryInfo() {
  fetch(`/api/countries/${search}`)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Country not found");
      }

      return response.json();
    })

    .then(function (data) {
      clear();

      if (save) {
        save.remove();
      }

      console.log(data.data);
      console.log(data.data.objects[0].names.common);

      displayCountry(data);
    })

    .catch(function (err) {
      console.log(err);

      showError(err.message);
    });
}

function displayCountry(display) {
  searchInput.value = "";

  var country = display.data.objects[0];

  var countryObject = {
    name: country.names.common,
    capital: country.capitals[0].name,
    continent: country.continents[0],
    language: country.languages[0].name,
    population: country.population
      ? country.population.toLocaleString()
      : "Unknown",
    flag: country.flag.url_png,
  };

  var card = document.querySelector("#card");

  card.style.border = "3px solid black";
  card.style.backgroundImage = `url(${countryObject.flag})`;
  card.style.backgroundSize = "cover";

  var cardEl = document.createElement("div");

  cardEl.className = "center";

  cardEl.innerHTML = `
    <h2>${countryObject.name}</h2>
    <h3>Capital: ${countryObject.capital}</h3>
    <h3>Continent: ${countryObject.continent}</h3>
    <h3>Language: ${countryObject.language}</h3>
    <h3>Population: ${countryObject.population}</h3>
  `;

  card.appendChild(cardEl);

  saveButton(countryObject);
}

function saveButton(countryObject) {
  var form = document.querySelector("#form");

  save = document.createElement("button");

  save.textContent = "Save";
  save.style.padding = "5px 10px";

  form.appendChild(save);

  save.addEventListener("click", function (event) {
    event.preventDefault();

    var savedCountries =
      JSON.parse(localStorage.getItem("savedCountries")) || [];

    saved = savedCountries;

    var alreadySaved = saved.some(function (country) {
      return country.name === countryObject.name;
    });

    if (!alreadySaved) {
      saved.push(countryObject);

      localStorage.setItem("savedCountries", JSON.stringify(saved));

      save.style.display = "none";
    }
  });
}

searchButton.addEventListener("click", searchForm);
