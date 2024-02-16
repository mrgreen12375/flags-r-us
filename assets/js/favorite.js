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
            favoriteEl.innerHTML = `<div class='favoriteCard swirl-in-fwd' style='background-image: url(${savedCountries[i][5]});'>
                                    <h3>${savedCountries[i][0]}</h3>
                                    <h4>${savedCountries[i][1]}</h4>
                                    <h4>${savedCountries[i][2]}</h4>
                                    <h4>${savedCountries[i][3]}</h4>
                                    <h4>${savedCountries[i][4]}</h4>
                                    </div>`;

            favorites.appendChild(favoriteEl);
        }
    }
}

favoritesList()