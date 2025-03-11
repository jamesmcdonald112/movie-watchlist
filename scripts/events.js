// Events.js
import { handleFetchSearchTerm, fetchMovieDetails } from "./api.js";
import { displayMovies  } from "./dom.js";

/**
 * Handles the movies search form submission
 * @param {Event} event -  The form submission event
 */
async function handleMovieSearchFormSubmit(event) {
    event.preventDefault();

    const searchQuery = document.getElementById('movie-search-input').value.trim()

    // TODO: `Display console error in the DOM`
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
}

export { initializeEventListeners }