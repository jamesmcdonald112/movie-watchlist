// dom.js

const searchResultsContainer = document.getElementById
('search-results-container')
function displayMovies(movies) {
    searchResultsContainer.innerHTML = movies.map(movie => (
        `
        <div class="movie-card">
            <img src="${movie.Poster}" class="movie-poster">
            <div class="movie-details">
                <div class="movie-title-container">
                    <h2 class="movie-title">${movie.Title}</h2>
                    <p class="movie-rating"><i class="fa-solid fa-star"></i> ${movie.imdbRating}</p>
                </div>
                <div class="movie-meta">
                    <p class="movie-runtime">${movie.Runtime}</p>
                    <p class="movie-genre">${movie.Genre}</p>
                    <button class="watchlist-btn " 
                        data-action="add"
                        data-id="${movie.imdbID}" 
                        data-title="${movie.Title}" 
                        data-poster="${movie.Poster}"
                        data-imdb="${movie.imdbRating}"
                        data-runtime="${movie.Runtime}"
                        data-genre="${movie.Genre}"
                        data-description="${movie.Plot}">
                        Add to Watchlist
                    </button>
                </div>
                <p class="movie-description">${movie.Plot}</p>
            </div>
        </div>
    `
    )).join('');    
}

function displayWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const watchlistContainer = document.getElementById("watchlist-container");

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = `<p class="empty-watchlist-message">Your watchlist is empty.</p>`;
    } else {
        let movieCards = "";
    
        watchlist.forEach(movie => {
            movieCards += `
                <div class="movie-card">
                    <img src="${movie.poster}" class="movie-poster">
                    <div class="movie-details">
                        <h2 class="movie-title">${movie.title}</h2>
                        <p class="movie-rating"><i class="fa-solid fa-star"></i> ${movie.imdbRating}</p>
                        <div class="movie-meta">
                            <p class="movie-runtime">${movie.runtime}</p>
                            <p class="movie-genre">${movie.genre}</p>
                            <button class="watchlist-btn" 
                                data-action="remove" 
                                data-id="${movie.id}">
                                <i class="fa-solid fa-trash"></i> Remove
                            </button>
                        </div>
                        <p class="movie-description">${movie.description}</p>
                    </div>
                </div>
            `;
        });
    
        watchlistContainer.innerHTML = movieCards;
    }
}


export { displayMovies, displayWatchlist }