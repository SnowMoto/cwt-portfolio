const options = {method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8dceba02ffmshdd399241afae7aep1fe29djsn180124cf9706',
		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	}
};

document.getElementById("search").addEventListener("click", search);

const quotes = `https://movie-quotes-api.vercel.app/api/v1/quotes`

async function search() {
  let token = document.getElementById("myInput");
  const url = `https://movie-database-alternative.p.rapidapi.com/?s=${token.value}&r=json&page=1`;
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    let list = document.getElementById('list');
    list.innerHTML = ''; // Clear previous results
    result.Search.forEach(m => {
      if (m.Type === 'movie') { // Check if the type is 'movie'
        list.innerHTML += `<img onclick="myFunction ('${m.Title}','${m.Poster}')" src="${m.Poster}" alt="${m.Title} Poster">`;
      }
    });
  } catch (error) {
    console.error(error);
  }
}
function myFunction(Title, moviePoster){
  alert(moviePoster);
}
