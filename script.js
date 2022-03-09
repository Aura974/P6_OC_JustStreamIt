const BASE_URL = "http://localhost:8000/api/v1/titles/";
const ALL_URLS = [
    "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=fantasy&sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score&page_size=7"];
const MOVIE_GENRES = [
    document.getElementById("best-film"),
    document.querySelectorAll("#carousel1 img"),
    document.querySelectorAll("#carousel2 img"),
    document.querySelectorAll("#carousel3 img"),
    document.querySelectorAll("#carousel4 img")];

var bestRating = [];
var fantasy = [];
var comedy = [];
var drama = [];

class Carousel {
    /**
     * @param {HTMLElement} element
     * @param {Object} options
     * @param {Object} options.slidesToScroll
     * @param {Object} options.slidesVisible
     * @param {Object} options.title
     */

    constructor(element, options={}) {
    
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 3,
            slidesVisible: 4,
            title: "", 
        }, options);
        let children = [].slice.call(element.children); // Only access the element children
        this.currentItem = 0;

        // Create the carousel title
        this.title = document.createElement("h1");
        this.title.setAttribute("class", "title");
        this.title.innerHTML = this.options.title;
        this.element.appendChild(this.title);
    
        // Create the carousel outlay
        this.root = this.createDivWithClass("carousel");
        this.container = this.createDivWithClass("carousel__container");
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);

        // Transform the DOM elements into a carousel
        this.items = children.map((child) => {
          let item = this.createDivWithClass("carousel__item");
          item.appendChild(child);
          this.container.appendChild(item);
          return item;
        });

    
        this.setStyle();
        this.createNavigation();
    
    }
    
    createDivWithClass (className) {
    let div = document.createElement("div");
    div.setAttribute("class", className);
    return div;
    }

    
    // Set the correct size to the visible carousel and items
    setStyle () {
    let ratio = this.items.length / this.options.slidesVisible;
    this.container.style.width = (ratio * 100) + "%";
    this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible / ratio) + "%"));
    }

    
    // Create the next and previous buttons
    createNavigation() {
    let nextButton = this.createDivWithClass("carousel__next");
    nextButton.innerHTML = "&rsaquo;";
    let prevButton = this.createDivWithClass("carousel__prev");
    prevButton.innerHTML = "&lsaquo;";
    this.root.appendChild(nextButton);
    this.root.appendChild(prevButton);
    nextButton.addEventListener("click", this.next.bind(this));
    prevButton.addEventListener("click", this.prev.bind(this));
    }

    next() {
    this.goToItem(this.currentItem + this.options.slidesToScroll);
    }

    prev() {
    this.goToItem(this.currentItem - this.options.slidesToScroll);
    }

    // Move the carousel to the wanted element (index)
    goToItem(index) {
    if (index < 0) {
        index = this.items.length - this.options.slidesVisible;
    } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined) {
        index = 0;
    }
    let translateX = index * -100 / this.items.length;
    this.container.style.transform = "translate3d(" + translateX + "%, 0, 0)";
    this.currentItem = index;
    }   
}

class Modal {
    /**
     * @param {HTMLElement} element
     * @param {Object} options
     * @param {Object} options.id 
     */

    constructor(element, json, options={}) {
    
        this.element = element;
        this.json = json;
        this.options = Object.assign({}, {
            id: 1, 
        }, options);
    
        // Create the modal HTML in the DOM
        this.modalRoot = document.createElement("aside");
        this.modalContainer = this.createDivWithClass("modal");
        this.modalContainer.setAttribute("id", this.options.id);
        this.modalDialog = this.createDivWithClass("modal__dialog");
        this.modalContent = this.createDivWithClass("modal__content");
        this.modalDialog.appendChild(this.modalContent);
        this.modalContainer.appendChild(this.modalDialog);
        this.modalRoot.appendChild(this.modalContainer);
        this.wrapper = document.querySelector("#wrapper");
        this.wrapper.appendChild(this.modalRoot);

        // Create and add the modal content to the DOM
        this.span = document.createElement("span");
        this.span.setAttribute("class", "close");
        this.span.innerHTML = "x";
        this.image = document.createElement("img");
        this.image.setAttribute("class", "modal__img");
        this.image.src = this.json.image_url;
        this.parag = document.createElement("p");
        this.parag.setAttribute("class", "modal__info");
        this.modalContent.append(this.span, this.image, this.parag);
        
        // Modify the information inside the modal
        let genres = this.addSpaces(json.genres);
        let actors = this.addSpaces(json.actors);
        let directors = this.addSpaces(json.directors);
        let d = new Date(json.date_published);
        let rated = this.checkIfNull(json.rated, "Not rated or unkown rating");
        let income = this.checkIfNull(json.worldwide_gross_income, null);
        let hours = Math.floor(json.duration / 60);
        let minutes = Math.round(json.duration % 60);

        this.parag.innerHTML = 
        "<strong>Titre : </strong>" + json.title 
        + "<br><br><strong>Genre :  </strong>" + genres
        +"<br><br><strong>Date de sortie : </strong>" + (d.getDate()) + "/" + (d.getMonth()+1) + "/" + (d.getFullYear())
        +"<br><br><strong>Rated : </strong>" + rated
        +"<br><br><strong>Note Imdb : </strong>" + json.imdb_score + "/10"
        +"<br><br><strong>Réalisation : </strong>" + directors
        +"<br><br><strong>Acteurs : </strong>" + actors
        +"<br><br><strong>Durée : </strong>" + hours + "h " + minutes + "min"
        +"<br><br><strong>Pays d'origine : </strong>" + json.countries
        +"<br><br><strong>Box-Office : </strong>" + income
        +"<br><br><strong>Synopsis : </strong>" + json.description;
    }

    // Add spaces to the lists of strings
    addSpaces(entry) {
        let list = "";
        for (let i in entry) {
            if (i == entry.length -1) {
                list += entry[i];
            } else {
                list += entry[i] + ", ";
            }
        }
        return list;
    }

    checkIfNull(entry, text) {
        let list = "";
        if (entry == text) {
            list = "N/A";
        } else {
            list = entry;
        }
        return list;
    }

    createDivWithClass (className) {
        let div = document.createElement("div");
        div.setAttribute("class", className);
        return div;
    }
}


// Get the movies urls from the genre urls
async function getMoviesList(url, movieData) {
    let response = await fetch(url);
    let resJson = await response.json();
    for (var i = 0; i < resJson.results.length; i++) {
        movieData.push(BASE_URL + resJson.results[i].id);
    }
}


// Add data to the best film part and create its modal
async function bestFilm(url, genre) {
    let response = await fetch(url);
    let resJson = await response.json();

    genre.querySelector("#best-film__img").src = resJson.image_url;
    genre.querySelector("#best-film__title").innerText = resJson.title;
    genre.querySelector("#best-film__description").innerText = resJson.description;

    new Modal (genre, resJson, {
        id: resJson.id
    });

    genre.querySelector("#open-modal").dataset.open = resJson.id;
}


// Add data to each item in the carousels and create their modals
async function carouselData(urlList, genreList) {
    const JSON_LIST = [];

    for (const URL of urlList){
        let response = await fetch(URL);
        let resJson = await response.json();
        JSON_LIST.push(resJson);
    }
    
    for (var i = 0; i < genreList.length; i++) {
        genreList[i].src = JSON_LIST[i].image_url;
        genreList[i].setAttribute("data-open", JSON_LIST[i].id);
        new Modal (genreList[i], JSON_LIST[i], {
            id: JSON_LIST[i].id
        });
    }

}


// Call all functions to create the json lists
async function main() {
    await getMoviesList(ALL_URLS[0], bestRating);
    await getMoviesList(ALL_URLS[1], fantasy);
    await getMoviesList(ALL_URLS[2], comedy);
    await getMoviesList(ALL_URLS[3], drama);

    bestFilm(bestRating[0], MOVIE_GENRES[0]);
    carouselData(bestRating, MOVIE_GENRES[1]);
    carouselData(fantasy, MOVIE_GENRES[2]);
    carouselData(comedy, MOVIE_GENRES[3]);
    carouselData(drama, MOVIE_GENRES[4]);
}


// Wait for DOM to load because of the asynchronous script
document.addEventListener("DOMContentLoaded", function() {

    new Carousel (document.querySelector("#carousel1"), {
        title: "Films les mieux notés"
    });
  
    new Carousel (document.querySelector("#carousel2"), {
        title: "Fantasy"
    });

    new Carousel (document.querySelector("#carousel3"), {
        title: "Comédie"
    });

    new Carousel (document.querySelector("#carousel4"), {
        title: "Drame"
    });

    var btnOpen = document.querySelector("#open-modal");
    var isVisible = "is-visible";
    var images = document.querySelectorAll(".carousel__item img");

    // Opens the best film modal
    btnOpen.addEventListener("click", function() {
        var modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
        document.querySelector("body").style.overflow = "hidden";
    });

    // Opens all the matching modals by clicking on the image
    for(var img of images) {
        img.addEventListener("click", function() {
            var modalId = this.dataset.open;
            document.getElementById(modalId).classList.add(isVisible);
            document.querySelector("body").style.overflowY = "hidden";
        });
    }

    // Closes the modal by clicking on the close button
    document.addEventListener("click", function(e) {
        if (e.target && e.target.className == "close") {
            document.querySelector(".modal.is-visible").classList.remove(isVisible);
            document.querySelector("body").style.overflowY = "visible";
        }
    });
    
    // Closes the modal by clicking outside of the window
    document.addEventListener("click", function(e) {
        if (e.target == document.querySelector(".modal.is-visible")) {
            document.querySelector(".modal.is-visible").classList.remove(isVisible);
            document.querySelector("body").style.overflowY = "visible";
        }
    });
  
});


main();

