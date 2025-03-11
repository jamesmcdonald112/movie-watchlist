// api.js
const BASE_URL = 'http://www.omdbapi.com/?apikey='
const API_KEY = '4976347d'

async function handleFetchSearchTerm(searchQuery) {
    const url = `${BASE_URL}${API_KEY}&s=${searchQuery}`
    try {
        const response = await fetch(url)
        const data = await response.json()

        if(data.Response === "True") {
            console.log("Fetched movies:", data.Search)
            return data.Search
        } else {
            console.warn("No results found:", data.Error)
            return []
        }

    } catch (error) {
        console.error("Error fetching movies:", error)
        return []
    }
}

async function fetchMovieDetails(imdbID) {
    const url = `${BASE_URL}${API_KEY}&i=${imdbID}`
    try {
        const response = await fetch(url)
        const data = await response.json()

        if(data.Response === "True") {
            return data
        } else {
            console.warn("Error fetching movie details: ", data.Error)
            return null
        }

    } catch (error) {
        console.error("Error fetching movie details using imdbID", error)
        return null
    }
}

export { handleFetchSearchTerm, fetchMovieDetails }