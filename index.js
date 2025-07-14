let moviesFromLocalStorage = JSON.parse(localStorage.getItem("myWatchlist"))

const searchButton = document.getElementById("search")
const inputSearch = document.getElementById("input")
const moviesContainer = document.getElementById("movies-container")

// console.log( localStorage.getItem("myWatchlist") )

let myWatchlist = []

if (moviesFromLocalStorage){
    myWatchlist = moviesFromLocalStorage
}

document.addEventListener('click', function(e){
    if(e.target.dataset.imdbid){
        handleImdbIdClick(e.target.dataset.imdbid)
    }
})

function handleImdbIdClick(imdbid){
    fetch(`https://www.omdbapi.com/?i=${imdbid}&apikey=6bbd5fb6`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            myWatchlist.push(data)
            localStorage.setItem("myWatchlist",JSON.stringify(myWatchlist))
            // console.log( localStorage.getItem("myWatchlist") )
        })
    
}

searchButton.addEventListener("click", function(e){
    e.preventDefault()
    fetch(`https://www.omdbapi.com/?s=${inputSearch.value}&apikey=6bbd5fb6&type=movie`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let apiData = ""
            for(movie of data.Search){
                fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=6bbd5fb6`)
                    .then(res => res.json())
                    .then(data => {
                        
                        // console.log(data)
                        apiData += `
                            <div class = "movie">
                                <img class= "img-movie" src="${data.Poster}">
                                <div class = "data">
                                    <div class = "container">
                                        <h1 class = "title">${data.Title}</h1>
                                        <i class="fa-solid fa-star"></i>
                                        <h2 class= "rating">${data.imdbRating}</h2>
                                    </div>
                                    <div class = "container">
                                        <h2 class = "details">${data.Runtime}</h2>
                                        <h2 class = "details">${data.Genre}</h2>
                                        <i class="fa-solid fa-plus" data-imdbID="${data.imdbID}">wachtlist</i>
                                    </div>
                                    
                                    <p class= "plot">${data.Plot}</p>
                                </div>
                            </div>
                        `
                    })
            }
            
            setTimeout(() => {
                // console.log(apiData)
                moviesContainer.innerHTML = apiData
            }, 500)
        })
        
})
