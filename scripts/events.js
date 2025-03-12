// Events.js
import { handleFetchSearchTerm, fetchMovieDetails } from "./api.js";
import { displayMovies, displayWatchlist  } from "./dom.js";

/**
 * Handles the movies search form submission
 * @param {Event} event -  The form submission event
 */
async function handleMovieSearchFormSubmit(event) {
    event.preventDefault();

    const searchQuery = document.getElementById('movie-search-input').value.trim()

    if (!searchQuery) {
        console.error("No search query entered");
        return;
    }

    // Search results for the search query
    const movies = await handleFetchSearchTerm(searchQuery)

    if(movies.length === 0) {
        displayMovies([])
        return
    }

    // More details for each movie using their imdb ID
    const detailedMovies = await Promise.all(movies.map(movie => fetchMovieDetails(movie.imdbID)))


    displayMovies(detailedMovies)
}

function handleWatchlistAction(event) {
    const dataset = event.target.dataset
    const action = dataset.action
    const movieId = dataset.id

    if(!action || !movieId) return 

    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

    if(action === "add") {
        const movieData = {
            id: movieId,
            title: dataset.title,
            poster: dataset.poster,
            imdbRating: dataset.imdb,
            runtime: dataset.runtime,
            genre: dataset.genre,
            description: dataset.description
        }

        if(!watchlist.some(movie => movie.id === movieData.id)) {
            watchlist.push(movieData)
            localStorage.setItem('watchlist', JSON.stringify(watchlist))
            console.log("Added to watchlist", movieData)
        }
    }
    else if (action === "remove") {
        watchlist = watchlist.filter(movie => movie.id !== movieId)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        console.log("Removed from watchlist:", movieId)

        displayWatchlist()
    }
}

/**
 * Initalise event listeners
 */
function initializeEventListeners() {
    const movieSearchForm = document.getElementById('movie-search-form');

    // Handle submit for seach query
    if (movieSearchForm) {
        movieSearchForm.addEventListener('submit', handleMovieSearchFormSubmit)
    } else {
        console.error("Error: movieSearchForm not found")
    }

    document.addEventListener('click', handleWatchlistAction);
}

export { initializeEventListeners }