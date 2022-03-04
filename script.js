const baseUrl = "http://localhost:8000/api/v1/titles/";
const allUrls = [
    "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=fantasy&sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score&page_size=7"];
const movieGenres = [
    document.getElementById("best-film"),
    document.querySelectorAll("#crsl1-sect1 div.film, #crsl1-sect2 div.film"),
    document.querySelectorAll("#crsl2-sect1 div.film, #crsl2-sect2 div.film"),
    document.querySelectorAll("#crsl3-sect1 div.film, #crsl3-sect2 div.film"),
    document.querySelectorAll("#crsl4-sect1 div.film, #crsl4-sect2 div.film")]

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

    genre.querySelector("#best-film-img").src = resJson.image_url;
    genre.getElementsByClassName("info")[0].querySelector("h1.best-film-title").innerText = resJson.title;
    genre.getElementsByClassName("info")[0].querySelector("p.description").innerText = resJson.description;

    // modal = createModal();
    // aside = document.createElement("aside");
    // aside.appendChild(modal);
    // genre.appendChild(aside);
    // genre.querySelector("aside div").setAttribute("id", resJson.id);

    // genre.querySelector("#open-modal").dataset.open = resJson.id;

    // modalData(resJson, genre);

    
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
        genreList[i].querySelector("img").setAttribute("data-open", jsonList[i].id);


        modal = createModal();
        aside = document.createElement("aside");
        aside.appendChild(modal);
        genreList[i].appendChild(aside);
        genreList[i].querySelector("aside div").setAttribute("id", jsonList[i].id);

        modalData(jsonList[i], genreList[i]);


    }

    for (var i = 4, j = 3; i < 8; i++, j++) {
        genreList[i].querySelector("img").src = jsonList[j].image_url;
        genreList[i].querySelector("img").setAttribute("data-open", jsonList[j].id);
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
    dataImg.className = "data-img";
    
    dataInfo = document.createElement("p");
    dataInfo.setAttribute("data-info", "");

    divContent.append
    
    (span, dataImg, dataInfo);

    divModal.appendChild(divDialog);
    return divModal;
}


function modalData(json, genre) {
    genre.querySelector("[data-img]").src = json.image_url;

    let actors = "";
    for (let i in json.actors) {
        if (i == json.actors.length - 1) {
            actors += json.actors[i];
        } else {
            actors += json.actors[i] + ", ";
        }
    }

    hours = Math.floor(json.duration / 60);
    minutes = Math.round(json.duration % 60);

    let d = new Date(json.date_published);

    let rated = "";
    if (json.rated == "Not rated or unkown rating") {
        rated = "N/A";
    } else {
        rated = json.rated;
    }

    let income = "";
    if (json.worldwide_gross_income == null) {
        income = "N/A";
    } else {
        income = json.worldwide_gross_income;
    }


    genre.querySelector("[data-info]").innerHTML = 
    "<strong>Titre : </strong>" + json.title 
    + "<br><br><strong>Genre :  </strong>" + json.genres
    +"<br><br><strong>Date de sortie : </strong>" + (d.getDate()) + "/" + (d.getMonth()+1) + "/" + (d.getFullYear())
    +"<br><br><strong>Rated : </strong>" + rated
    +"<br><br><strong>Note Imdb : </strong>" + json.imdb_score + "/10"
    +"<br><br><strong>Réalisation : </strong>" + json.directors
    +"<br><br><strong>Acteurs : </strong>" + actors
    +"<br><br><strong>Durée : </strong>" + hours + "h " + minutes + "min"
    +"<br><br><strong>Pays d'origine : </strong>" + json.countries
    +"<br><br><strong>Box-Office : </strong>" + income
    +"<br><br><strong>Synopsis : </strong>" + json.description
    ;
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

var btnOpen = document.querySelector("#open-modal");
var images = document.querySelectorAll("img");
console.log(images)
var isVisible = "is-visible";

btnOpen.addEventListener("click", function() {
    var modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
    document.querySelector("body").style.overflow = "hidden";
});

for(var img of images) {
    img.addEventListener("click", function() {
        var modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
        document.querySelector("body").style.overflow = "hidden";
    });
  }


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
