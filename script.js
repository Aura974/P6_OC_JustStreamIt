const baseUrl = "http://localhost:8000/api/v1/titles/";
const allUrls = [
    "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=fantasy&sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score&page_size=7"];
const movieGenres = [
    document.getElementById("best-film"),
    document.querySelectorAll("#carousel1 img"),
    document.querySelectorAll("#carousel2 img"),
    document.querySelectorAll("#carousel3 img"),
    document.querySelectorAll("#carousel4 img")]

var bestRating = [];
var fantasy = [];
var comedy = [];
var drama = [];

class Carousel {
    constructor(element, options={}) {
    
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 3,
            slidesVisible: 4,
            title: "", 
        }, options)
        let children = [].slice.call(element.children)
        this.currentItem = 0

        this.title = document.createElement("h1")
        this.title.setAttribute("class", "title")
        this.title.innerHTML = this.options.title
        this.element.appendChild(this.title)
    
        this.root = this.createDivWithClass("carousel")
        this.container = this.createDivWithClass("carousel__container")
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)

    
        this.items = children.map((child) => {
          let item = this.createDivWithClass("carousel__item")
          item.appendChild(child)
          this.container.appendChild(item)
          return item
        })

    
        this.setStyle()
        this.createNavigation()
    
    }
    
    createDivWithClass (className) {
    let div = document.createElement("div")
    div.setAttribute("class", className)
    return div
    }

    setStyle () {
    let ratio = this.items.length / this.options.slidesVisible
    this.container.style.width = (ratio * 100) + "%"
    this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible / ratio) + "%"))
    }

    createNavigation() {
    let nextButton = this.createDivWithClass("carousel__next")
    nextButton.innerHTML = "&rsaquo;"
    let prevButton = this.createDivWithClass("carousel__prev")
    prevButton.innerHTML = "&lsaquo;"
    this.root.appendChild(nextButton)
    this.root.appendChild(prevButton)
    nextButton.addEventListener("click", this.next.bind(this))
    prevButton.addEventListener("click", this.prev.bind(this))
    }

    next() {
    this.goToItem(this.currentItem + this.options.slidesToScroll)
    }

    prev() {
    this.goToItem(this.currentItem - this.options.slidesToScroll)
    }

    goToItem(index) {
    if (index < 0) {
        index = this.items.length - this.options.slidesVisible
    } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined) {
        index = 0
    }
    let translateX = index * -100 / this.items.length
    this.container.style.transform = "translate3d(" + translateX + "%, 0, 0)"
    this.currentItem = index
    }
        
}

class Modal {
    constructor(element, json, options={}) {
    
        this.element = element
        this.json = json
        this.options = Object.assign({}, {
            id: 1, 
        }, options)
    
        this.modalRoot = document.createElement("aside")
        this.modalContainer = this.createDivWithClass("modal")
        this.modalContainer.setAttribute("id", this.options.id)
        this.modalDialog = this.createDivWithClass("modal__dialog")
        this.modalContent = this.createDivWithClass("modal__content")
        this.modalDialog.appendChild(this.modalContent)
        this.modalContainer.appendChild(this.modalDialog)
        this.modalRoot.appendChild(this.modalContainer)
        this.wrapper = document.querySelector("#wrapper")
        this.wrapper.appendChild(this.modalRoot)

        this.span = document.createElement("span")
        this.span.setAttribute("class", "close")
        this.span.innerHTML = "x"
        this.image = document.createElement("img")
        this.image.setAttribute("class", "modal__img")
        this.image.src = this.json.image_url
        this.parag = document.createElement("p")
        this.parag.setAttribute("class", "data-info")
        this.modalContent.append(this.span, this.image, this.parag)
        
        let genres = this.addSpaces(json.genres)
        let actors = this.addSpaces(json.actors)
        let directors = this.addSpaces(json.directors)
        let d = new Date(json.date_published)
        let rated = this.checkIfNull(json.rated, "Not rated or unkown rating")
        let income = this.checkIfNull(json.worldwide_gross_income, null)
        let hours = Math.floor(json.duration / 60)
        let minutes = Math.round(json.duration % 60)

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
        +"<br><br><strong>Synopsis : </strong>" + json.description
    }

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
        let list = ""
        if (entry == text) {
            list = "N/A";
        } else {
            list = entry;
        }
        return list;
    }

    createDivWithClass (className) {
        let div = document.createElement("div")
        div.setAttribute("class", className)
        return div
    }
}


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

    genre.querySelector("#best-film__img").src = resJson.image_url;
    genre.querySelector("#best-film__title").innerText = resJson.title;
    genre.querySelector("#best-film__description").innerText = resJson.description;

    new Modal (genre, resJson, {
        id: resJson.id
    })

    genre.querySelector("#open-modal").dataset.open = resJson.id;
}


async function carouselImages(urlList, genreList) {
    const jsonList = [];

    for (const url of urlList){
        response = await fetch(url);
        resJson = await response.json();
        jsonList.push(resJson);
    }
    
    for (var i = 0; i < genreList.length; i++) {
        genreList[i].src = jsonList[i].image_url;
        genreList[i].setAttribute("data-open", jsonList[i].id);
        new Modal (genreList[i], jsonList[i], {
            id: jsonList[i].id
        })
    }

}





document.addEventListener("DOMContentLoaded", function() {

    new Carousel (document.querySelector("#carousel1"), {
        title: "Test titre"
    })
  
    new Carousel (document.querySelector("#carousel2"), {
        title: "Test titre 2"
    })

    new Carousel (document.querySelector("#carousel3"), {
        title: "Test titre 3"
    })

    new Carousel (document.querySelector("#carousel4"), {
        title: "Test titre 4"
    })

    var images = document.querySelectorAll(".carousel__item img")

    for(var img of images) {
        img.addEventListener("click", function() {
            var modalId = this.dataset.open;
            document.getElementById(modalId).classList.add(isVisible)
            document.querySelector("body").style.overflow = "hidden"
        })
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
  
})



async function main() {
    await getMoviesList(allUrls[0], bestRating);
    await getMoviesList(allUrls[1], fantasy);
    await getMoviesList(allUrls[2], comedy);
    await getMoviesList(allUrls[3], drama);

    bestFilm(bestRating[0], movieGenres[0]);
    carouselImages(bestRating, movieGenres[1]);
    carouselImages(fantasy, movieGenres[2]);
    carouselImages(comedy, movieGenres[3]);
    carouselImages(drama, movieGenres[4]);
}

main();

var btnOpen = document.querySelector("#open-modal");


var isVisible = "is-visible";

btnOpen.addEventListener("click", function() {
    var modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
    document.querySelector("body").style.overflow = "hidden";
});