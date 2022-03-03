const baseUrl = "http://localhost:8000/api/v1/titles/";
const allUrls = [
    "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=fantasy&sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score&page_size=7"];
const movieGenres = [
    document.getElementById("best_film"),
    document.querySelectorAll("#crsl1_sect1 div.film, #crsl1_sect2 div.film"),
    document.querySelectorAll("#crsl2_sect1 div.film, #crsl2_sect2 div.film"),
    document.querySelectorAll("#crsl3_sect1 div.film, #crsl3_sect2 div.film"),
    document.querySelectorAll("#crsl4_sect1 div.film, #crsl4_sect2 div.film")]

var bestRating = [];
var fantasy = [];
var comedy = [];
var drama = []; 


async function getMoviesList(url, movieData) {
    response = await fetch(url);
    resJson = await response.json();
    for (var i = 0; i < resJson.results.length; i++) {
        movieData.push(baseUrl + resJson.results[i].id);
    }
}


async function bestFilm(url, genre) {
    response = await fetch(url);
    resJson = await response.json();

    genre.querySelector("img").src = resJson.image_url;
    genre.getElementsByClassName("info")[0].querySelector("h1.best_film_title").innerText = resJson.title;
    genre.getElementsByClassName("info")[0].querySelector("p.description").innerText = resJson.description;

    modal = createModal();
    aside = document.createElement("aside");
    aside.appendChild(modal);
    genre.appendChild(aside);
    genre.querySelector("aside div").setAttribute("id", resJson.id);

    genre.querySelector("#open-modal").dataset.open = resJson.id;

    modalData(resJson);
}


async function carousel(urlList, genreList) {
    let jsonList = [];

    for (var i = 0; i < urlList.length; i++){
        response = await fetch(urlList[i]);
        resJson = await response.json();
        jsonList.push(resJson);
    }
    
    for (var i = 0; i < 4; i++) {
        genreList[i].querySelector("img").src = jsonList[i].image_url;
        genreList[i].querySelector("img").innerHTML = modal; 
    }

    for (var i = 4, j = 3; i < 8; i++, j++) {
        genreList[i].querySelector("img").src = jsonList[j].image_url;
        genreList[i].querySelector("img").setAttribute("id",jsonList[j].id );
    }
}


function createModal() {
    divModal = document.createElement("div");
    divModal.className = "modal";
    divModal.setAttribute("id", "");

    divDialog = document.createElement("div");
    divDialog.className = "modal-dialog";

    divContent = document.createElement("div");
    divContent.className = "modal-content";
    divDialog.appendChild(divContent);

    span = document.createElement("span");
    span.className = "close";
    span.innerHTML = "&times;";

    dataImg = document.createElement("img");
    dataImg.setAttribute("data-img", "");
    
    dataTitle = document.createElement("p");
    dataTitle.setAttribute("data-title", "");
    dataTitle.innerHTML = "Titre : ";

    dataGenre = document.createElement("p");
    dataGenre.setAttribute("data-genre", "");
    dataGenre.innerHTML = "Genre : ";

    dataDate = document.createElement("p");
    dataDate.setAttribute("data-date", "");
    dataDate.innerHTML = "Date de sortie : ";

    dataRated = document.createElement("p");
    dataRated.setAttribute("data-rated", "");
    dataRated.innerHTML = "Rated : ";

    dataImdbScore = document.createElement("p");
    dataImdbScore.setAttribute("data-imdb", "");
    dataImdbScore.innerHTML = "Note IMDb : ";

    dataDirectors = document.createElement("p");
    dataDirectors.setAttribute("data-dir", "");
    dataDirectors.innerHTML = "Réalisation : ";

    dataActors = document.createElement("p");
    dataActors.setAttribute("data-actors", "");
    dataActors.innerHTML = "Casting principal : ";

    divContent.append
    
    (span, dataImg, dataTitle, dataGenre, dataDate, dataRated, dataImdbScore, dataDirectors, dataActors);

    divModal.appendChild(divDialog);
    return divModal;
}

function modalData(json) {
    document.querySelector("[data-img]").src = json.image_url;
    document.querySelector("[data-title]").appendChild(document.createTextNode(json.title));
    document.querySelector("[data-genre]").appendChild(document.createTextNode(json.genres));

    var d = new Date(json.date_published);
    document.querySelector("[data-date]").appendChild(document.createTextNode((d.getDate()) + "/" + (d.getMonth()+1) + "/" + (d.getFullYear())));

    document.querySelector("[data-rated]").appendChild(document.createTextNode(json.rated));
}


async function main() {
    await getMoviesList(allUrls[0], bestRating);
    await getMoviesList(allUrls[1], fantasy);
    await getMoviesList(allUrls[2], comedy);
    await getMoviesList(allUrls[3], drama);

    bestFilm(bestRating[0], movieGenres[0]);
    carousel(bestRating, movieGenres[1]);
    carousel(fantasy, movieGenres[2]);
    carousel(comedy, movieGenres[3]);
    carousel(drama, movieGenres[4]);
}

main();

var btnOpen = document.querySelector("[data-open]");
var isVisible = "is-visible";

btnOpen.addEventListener("click", function() {
    var modalId = btnOpen.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
    document.querySelector("body").style.overflow = "hidden";
});

document.addEventListener("click", function(e) {
    if (e.target && e.target.className == "close") {
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
        document.querySelector("body").style.overflow = "visible";
    }
})

document.addEventListener("click", function(e) {
    if (e.target == document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
        document.querySelector("body").style.overflow = "visible";
    }
});
