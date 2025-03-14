import { displayWatchlist } from "./dom.js"

// Watchlist.js
document.addEventListener("DOMContentLoaded", () => {
    displayWatchlist()

    document.getElementById("watchlist-container").addEventListener('click', (event) => {
        const {action, id} = event.target.dataset

        if(action === 'remove' && id) {
            removeFromWatchlist(id)
        }
    })
})

function removeFromWatchlist(movieId) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    
    // Filter out the movie
    watchlist = watchlist.filter(movie => movie.id !== movieId);
    
    // Update localStorage
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    
    // Refresh the displayed watchlist
    displayWatchlist();
}