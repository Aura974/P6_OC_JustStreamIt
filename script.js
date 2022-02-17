const baseUrl = "http://localhost:8000/api/v1/titles/";
const allUrls = [
    "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=fantasy&sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=7",
    "http://localhost:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score&page_size=7"];

let movieTest = [];
let movieTest2 = [];

async function getMovieList(url, movieList) {
    response = await fetch(url);
    resJson = await response.json();
    for (var i = 0; i < 7; i++) {
        movieList.push(baseUrl + resJson.results[i].id);
    }
    return movieList;
}

async function getData(movieList, movieData) {
    for (var i = 0; i < 7; i++) {
        resData = await fetch(movieList[i]);
        resJsonData = await resData.json();
        movieData.push(resJsonData);
    }
    return movieData;
}

var bestRating = document.querySelectorAll("#crsl1_sect1 div.film, #crsl1_sect2 div.film")
async function test(url, genre) {
    await getMovieList(url, movieTest);
    await getData(movieTest, movieTest2);
    for (var i = 0; i < genre.length; i++) {
        genre[i].querySelector("a img").src = movieTest2[i].image_url;
    }
    return genre;
    
}

test(allUrls[0], bestRating);
console.log(movieTest2)



// for (var i = 0; i < bestRating.length; i++) {
//     bestRating[i].querySelector("a img").src = movieTest2[i].image_url;
// }


var bestPage1 = document.getElementById("crsl1_sect1").getElementsByClassName("film")

var bestPage2 = document.getElementById("crsl1_sect2").getElementsByClassName("film")

var fantasyPage1 = document.getElementById("crsl2_sect1").getElementsByClassName("film")

var fantasyPage2 = document.getElementById("crsl2_sect2").getElementsByClassName("film")

var comedyPage1 = document.getElementById("crsl3_sect1").getElementsByClassName("film")

var comedyPage2 = document.getElementById("crsl3_sect2").getElementsByClassName("film")

var dramaPage1 = document.getElementById("crsl4_sect1").getElementsByClassName("film")

var dramaPage2 = document.getElementById("crsl4_sect2").getElementsByClassName("film")

// function getImg(data) {
//     for (var i = 0; i < bestPage1.length; i++) {
//         bestPage1[i].querySelector("a img").src = data[0].results[i].image_url;
//     }

//     for (var i = 0; i < bestPage2.length; i++) {
//         bestPage2[i].querySelector("a img").src = data[0].results[i+3].image_url;
//     }

//     for (var i = 0; i < fantasyPage1.length; i++) {
//         fantasyPage1[i].querySelector("a img").src = data[1].results[i].image_url;
//     }

//     for (var i = 0; i < fantasyPage2.length; i++) {
//         fantasyPage2[i].querySelector("a img").src = data[1].results[i+3].image_url;
//     }

//     for (var i = 0; i < comedyPage1.length; i++) {
//         comedyPage1[i].querySelector("a img").src = data[2].results[i].image_url;
//     }

//     for (var i = 0; i < comedyPage2.length; i++) {
//         comedyPage2[i].querySelector("a img").src = data[2].results[i+3].image_url;
//     }

//     for (var i = 0; i < dramaPage1.length; i++) {
//         dramaPage1[i].querySelector("a img").src = data[3].results[i].image_url;
//     }

//     for (var i = 0; i < dramaPage2.length; i++) {
//         dramaPage2[i].querySelector("a img").src = data[3].results[i+3].image_url;
//     }
// }

// function getBestFilm(data) {
//     let bestFilm = document.getElementById("best_film")
//     bestFilm.querySelector("img").src = data[0].results[0].image_url;
//     bestFilm.getElementsByClassName("info")[0].querySelector("h1.best_film_title").innerText = data[0].results[0].title;
//     bestFilm.getElementsByClassName("info")[0].querySelector("p.description").innerText = "temporary description, Nostrud elit consectetur qui reprehenderit culpa duis irure. Ea qui deserunt eiusmod nulla laborum sunt velit. Quis proident id pariatur fugiat eu in adipisicing ullamco eiusmod nulla sunt tempor proident. Velit reprehenderit ad sint do nulla incididunt laboris. Lorem dolor nostrud eu proident incididunt labore id.";
// }

// function getTitle(data) {
//     for (var i = 0; i < bestPage1.length; i++) {
//         bestPage1[i].querySelector("a h1.title").innerText = data[0].results[i].title;
//     }

//     for (var i = 0; i < bestPage2.length; i++) {
//         bestPage2[i].querySelector("a h1.title").innerText = data[0].results[i+3].title;
//     }

//     for (var i = 0; i < fantasyPage1.length; i++) {
//         fantasyPage1[i].querySelector("a h1.title").innerText = data[1].results[i].title;
//     }

//     for (var i = 0; i < fantasyPage2.length; i++) {
//         fantasyPage2[i].querySelector("a h1.title").innerText = data[1].results[i+3].title;
//     }
// };






    
    