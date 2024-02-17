function favoritesList() {
    var favorites = document.querySelector('#favorites');

    var savedCountries = JSON.parse(localStorage.getItem("savedCountries"));

    if (savedCountries === null) {
        var favoriteEl = document.createElement('div');
        favoriteEl.innerHTML = `<div class='favoriteCardEmpty'>
                                <h1>No Favorite Flags Yet!</h1>
                                </div>`;

        favorites.appendChild(favoriteEl);
    } else {
        for(let i=0; i < savedCountries.length; i++){
                    
            var favoriteEl = document.createElement('div');
            favoriteEl.innerHTML = `<div class='favoriteCard swirl-in-fwd' style='background-image: url(${savedCountries[i].flag});'>
                                    <h3>${savedCountries[i].name}</h3>
                                    <h4>Capitial: ${savedCountries[i].capitial}</h4>
                                    <h4>Continent: ${savedCountries[i].continent}</h4>
                                    <h4>Langauge: ${savedCountries[i].langauge}</h4>
                                    <h4>Population: ${savedCountries[i].population}</h4>
                                    </div>`;

            favorites.appendChild(favoriteEl);
        }
    }
}

favoritesList()