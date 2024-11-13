const clearMyWatchlist = document.getElementById("clear-my-watchlist")

let movies = []

let moviesFromLocalStorage = JSON.parse(localStorage.getItem("myWatchlist"))
// console.log(moviesFromLocalStorage)

if(moviesFromLocalStorage){
    movies = moviesFromLocalStorage
    renderMovies()
}

function renderMovies(){
    let list = ""
    for(movie of movies){
            
        list += `
            <div class = "movie">
                <img class= "img-movie" src="${movie.Poster}">
                <div class = "data">
                    <div class = "container">
                        <h1 class = "title">${movie.Title}</h1>
                        <i class="fa-solid fa-star"></i>
                        <h2 class= "rating">${movie.imdbRating}</h2>
                    </div>
                    <div class = "container">
                        <h2 class = "details">${movie.Runtime}</h2>
                        <h2 class = "details">${movie.Genre}</h2>
                    </div>
                    
                    <p class= "plot">${movie.Plot}</p>
                </div>
            </div>
        `
        document.getElementById("movies-container").innerHTML = list
    }
    
}

clearMyWatchlist.addEventListener("click",function(){
    localStorage.clear()
})