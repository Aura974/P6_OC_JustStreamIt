const baseUrl = "http://localhost:8000/api/v1/titles/";
const allUrls = [
    "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=fantasy&sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score&page_size=7"];

async function getData(url, movieData) {
    var movieList = [];
    response = await fetch(url);
    resJson = await response.json();
    for (var i = 0; i < 7; i++) {
        movieList.push(baseUrl + resJson.results[i].id);
    }
    for (var i = 0; i < 7; i++) {
        resData = await fetch(movieList[i]);
        resJsonData = await resData.json();
        movieData.push(resJsonData);
    }
    return movieData;
}

async function bestFilm(url, genre) {
    var bestFilm = [];
    await getData(url, bestFilm);
    genre.querySelector("img").src = bestFilm[0].image_url;
    genre.getElementsByClassName("info")[0].querySelector("h1.best_film_title").innerText = bestFilm[0].title;
    genre.getElementsByClassName("info")[0].querySelector("p.description").innerText = bestFilm[0].description;
}

async function carousel(url, genre, movieData) {
    await getData(url, movieData);
    for (var i = 0, j = 0; i < 4; i++, j++) {
        genre[i].querySelector("img").src = movieData[j].image_url;
        genre[i].querySelector("img").setAttribute("id",movieData[j].id );
    }
    for (var i = 4, j = 3; i < 8; i++, j++) {
        genre[i].querySelector("img").src = movieData[j].image_url;
        genre[i].querySelector("img").setAttribute("id",movieData[j].id );
    }    
}

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

bestFilm(allUrls[0], movieGenres[0], bestRating);
carousel(allUrls[0], movieGenres[1], bestRating);
carousel(allUrls[1], movieGenres[2], fantasy);
carousel(allUrls[2], movieGenres[3], comedy);
carousel(allUrls[3], movieGenres[4], drama);

var btnOpen = document.querySelector("[data-open]");
var btnClose = document.querySelector(".close");
var isVisible = "is-visible";

btnOpen.addEventListener("click", function() {
    var modalId = btnOpen.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
    document.querySelector("body").style.overflow = "hidden";
});

btnClose.addEventListener("click", function() {
    var modalId = btnOpen.dataset.open;
    document.getElementById(modalId).classList.remove(isVisible);
    document.querySelector("body").style.overflow = "visible";
});

// var modal = document.querySelector(".modal");
// var btnOpen = document.querySelector("#open-modal");
// var btnClose = document.querySelector(".close");

// btnOpen.onclick = function() {
//     modal.style.visibility = "visible";
// }

// btnClose.onclick = function() {
//     modal.style.visibility = "hidden";
// }



    
    