const accessKey = 'xBigxA0phJZgU2psEmMvwmsIRjLa_OL2HB6TkaZCg1Y'; // Replace with your real key
const container = document.getElementById('image-container');
const favoritesContainer = document.getElementById('favorites-container');

// State for favorites
let favorites = JSON.parse(localStorage.getItem('my_favorites_v1')) || [];

function saveFavorites() {
    localStorage.setItem('my_favorites_v1', JSON.stringify(favorites));
}

function toggleFavorite(photo, favBtn) {
    const index = favorites.findIndex(fav => fav.id === photo.id);
    if (index === -1) {
        // Add to favorites
        favorites.push(photo);
        favBtn.classList.add('active');
        favBtn.innerHTML = '❤️';
    } else {
        // Remove from favorites
        favorites.splice(index, 1);
        favBtn.classList.remove('active');
        favBtn.innerHTML = '🤍';

        // If we untoggled it and we are on an image that is also rendered in the search results, it might need updating there too. 
        // For simplicity, we just re-render favorites immediately.
    }
    saveFavorites();
    renderFavorites();
}

function createPhotoCard(photo) {
    const card = document.createElement('div');
    card.className = 'image-card';

    const img = document.createElement('img');
    img.src = photo.urls.small;
    img.alt = photo.alt_description || 'Unsplash image';

    const overlay = document.createElement('div');
    overlay.className = 'image-overlay';

    const favBtn = document.createElement('button');
    favBtn.className = 'fav-btn';

    const isFav = favorites.some(fav => fav.id === photo.id);
    if (isFav) {
        favBtn.classList.add('active');
        favBtn.innerHTML = '❤️';
    } else {
        favBtn.innerHTML = '🤍';
    }

    favBtn.onclick = () => toggleFavorite(photo, favBtn);

    overlay.appendChild(favBtn);
    card.appendChild(img);
    card.appendChild(overlay);

    return card;
}

function displayImages(data) {
    container.innerHTML = ''; // Clear previous results

    if (!data.results || data.results.length === 0) {
        container.innerHTML = '<div class="empty-state">No photos found. Try another search!</div>';
        return;
    }

    data.results.forEach(photo => {
        const card = createPhotoCard(photo);
        container.appendChild(card);
    });
}

function renderFavorites() {
    favoritesContainer.innerHTML = '';

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<div class="empty-state">No favorite photos yet. Click the heart to save!</div>';
        return;
    }

    favorites.forEach(photo => {
        const card = createPhotoCard(photo);
        favoritesContainer.appendChild(card);
    });
}

// Initial render for favorites list on page load
renderFavorites();

// Method 1: XMLHttpRequest (XHR)
function searchWithXHR() {
    const query = document.getElementById('search-query').value || 'Makkah';
    const xhr = new XMLHttpRequest();
    const url = `https://api.unsplash.com/search/photos?query=${query}`;

    xhr.open('GET', url);
    xhr.setRequestHeader('Authorization', `Client-ID ${accessKey}`);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            displayImages(response);
        }
    };
    xhr.send();
}

// Method 2: Fetch with Promises (.then)
function searchWithPromises() {
    const query = document.getElementById('search-query').value || 'Makkah';
    const url = `https://api.unsplash.com/search/photos?query=${query}`;

    fetch(url, {
        headers: { Authorization: `Client-ID ${accessKey}` }
    })
        .then(response => response.json())
        .then(data => displayImages(data))
        .catch(err => console.error("Error:", err));
}

// Method 3: Fetch with Async/Await
async function searchWithAsync() {
    const query = document.getElementById('search-query').value || 'Makkah';
    const url = `https://api.unsplash.com/search/photos?query=${query}`;

    try {
        const response = await fetch(url, {
            headers: { Authorization: `Client-ID ${accessKey}` }
        });
        const data = await response.json();
        displayImages(data);
    } catch (err) {
        console.error("Fetch failed:", err);
    }
}