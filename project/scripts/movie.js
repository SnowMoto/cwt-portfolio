const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '8dceba02ffmshdd399241afae7aep1fe29djsn180124cf9706',
    'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
  }
};

document.getElementById("search").addEventListener("click", search);

async function search() {
  let token = document.getElementById("myInput").value;
  const url = `https://movie-database-alternative.p.rapidapi.com/?s=${token}&r=json&page=1`;
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    let list = document.getElementById('list1');
    list.innerHTML = ''; // Clear previous results
    let smooth = document.createElement('div');
    smooth.classList.add('list');
    for (const movie of result.Search) {
      if (movie.Type === 'movie') { // Check if the type is 'movie'
        const movieDetails = await fetchMovieDetails(movie.imdbID);
        const isFavorite = checkFavorite(movie.imdbID);
        const likes = getLikes(movie.imdbID);
        smooth.innerHTML += 
         `<div class="card" onclick="this.classList.toggle('flip')">
            <div class="inner">
              <div class="card-face">
                <img src="${movie.Poster}" alt="${movie.Title} Poster" loading="lazy">
              </div>
              <div class="back">
                <p><strong>Title:</strong> ${movieDetails.Title}</p>
                <p><strong>Year:</strong> ${movieDetails.Year}</p>
                <p><strong>Plot:</strong> ${movieDetails.Plot}</p>
                <p><strong>Awards:</strong> ${movieDetails.Awards}</p>
              </div>
          </div>
            <div class="favorite" onclick="toggleFavorite(event, '${movie.imdbID}')">
            <span class="heart ${isFavorite ? 'favorite' : ''}" data-imdbid="${movie.imdbID}">&#10084;</span>
            <span class="likes" id="likes-${movie.imdbID}">${likes}</span>
          </div>  
         </div>`;
      }
    }
    list.appendChild(smooth);
  } catch (error) {
    console.error(error);
  }
}

async function fetchMovieDetails(imdbID) {
  const url = `https://movie-database-alternative.p.rapidapi.com/?i=${imdbID}&r=json`;
  try {
    const response = await fetch(url, options);
    const movieDetails = await response.json();
    return movieDetails;
  } catch (error) {
    console.error(error);
  }
}

function toggleFavorite(event, imdbID) {
  event.stopPropagation();
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favorites.includes(imdbID)) {
    favorites = favorites.filter(id => id !== imdbID);
    updateLikes(imdbID, -1);
  } else {
    favorites.push(imdbID);
    updateLikes(imdbID, 1);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites();
}

function checkFavorite(imdbID) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites.includes(imdbID);
}

function getLikes(imdbID) {
  const likes = JSON.parse(localStorage.getItem('likes')) || {};
  return likes[imdbID] || 0;
}

function updateLikes(imdbID, change) {
  const likes = JSON.parse(localStorage.getItem('likes')) || {};
  if (!likes[imdbID]) {
    likes[imdbID] = 0;
  }
  likes[imdbID] += change;
  localStorage.setItem('likes', JSON.stringify(likes));
  document.getElementById(`likes-${imdbID}`).textContent = likes[imdbID];
}

function renderFavorites() {
  const hearts = document.querySelectorAll('.heart');
  hearts.forEach(heart => {
    const imdbID = heart.getAttribute('data-imdbid');
    if (checkFavorite(imdbID)) {
      heart.classList.add('favorite');
    } else {
      heart.classList.remove('favorite');
    }
  });

  const likesElements = document.querySelectorAll('.likes');
  likesElements.forEach(likeElem => {
    const imdbID = likeElem.id.split('-')[1];
    likeElem.textContent = getLikes(imdbID);
  });
}

// Initial render of favorites
document.addEventListener('DOMContentLoaded', renderFavorites);
