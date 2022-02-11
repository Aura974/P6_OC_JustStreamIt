async function getData() {
    const [bestImdbRes, fantasyRes, comedyRes, dramaRes] = await Promise.all([
        fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7"),
        fetch("http://localhost:8000/api/v1/titles/?genre=fantasy&sort_by=-imdb_score&page_size=7"),
        fetch("http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=7"),
        fetch("http://localhost:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score&page_size=7")
    ]);

    const bestImdb = await bestImdbRes.json();
    const fantasy = await fantasyRes.json();
    const comedy = await comedyRes.json();
    const drama = await dramaRes.json();

    return [bestImdb, fantasy, comedy, drama];
}

getData()
    .then(function(res) {
        console.log(res)
        getImg(res);
    })
    // .catch(function(err) {
    //     console.log(err);
    // })


var bestPage1 = document.getElementById("crsl1_sect1").getElementsByClassName("film")

var bestPage2 = document.getElementById("crsl1_sect2").getElementsByClassName("film")

var fantasyPage1 = document.getElementById("crsl2_sect1").getElementsByClassName("film")

var fantasyPage2 = document.getElementById("crsl2_sect2").getElementsByClassName("film")

var comedyPage1 = document.getElementById("crsl3_sect1").getElementsByClassName("film")

var comedyPage2 = document.getElementById("crsl3_sect2").getElementsByClassName("film")

var dramaPage1 = document.getElementById("crsl4_sect1").getElementsByClassName("film")

var dramaPage2 = document.getElementById("crsl4_sect2").getElementsByClassName("film")

function getImg(data) {
    for (var i = 0; i < bestPage1.length; i++) {
        bestPage1[i].querySelector("a img").src = data[0].results[i].image_url;
    }

    for (var i = 0; i < bestPage2.length; i++) {
        bestPage2[i].querySelector("a img").src = data[0].results[i+3].image_url;
    }

    for (var i = 0; i < fantasyPage1.length; i++) {
        fantasyPage1[i].querySelector("a img").src = data[1].results[i].image_url;
    }

    for (var i = 0; i < fantasyPage2.length; i++) {
        fantasyPage2[i].querySelector("a img").src = data[1].results[i+3].image_url;
    }

    for (var i = 0; i < comedyPage1.length; i++) {
        comedyPage1[i].querySelector("a img").src = data[2].results[i].image_url;
    }

    for (var i = 0; i < comedyPage2.length; i++) {
        comedyPage2[i].querySelector("a img").src = data[2].results[i+3].image_url;
    }

    for (var i = 0; i < dramaPage1.length; i++) {
        dramaPage1[i].querySelector("a img").src = data[3].results[i].image_url;
    }

    for (var i = 0; i < dramaPage2.length; i++) {
        dramaPage2[i].querySelector("a img").src = data[3].results[i+3].image_url;
    }


}

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






    
    