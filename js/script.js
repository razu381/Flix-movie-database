let global = {
    currentPage : window.location.pathname,

}

function highlightActive(){
    let links = document.querySelectorAll(".nav-link")
    links.forEach(link => {
        if(link.getAttribute('href') == global.currentPage){
            link.classList.add('active')
        }
    })
}

async function displayPopularMovies(){
    const {results} = await fetchUrl('movie/popular')
    

    results.forEach((movie) => {
        let div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
            <img
                movie.poster_path ? src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}":src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
                
            />
            </a>
            <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
            </div>`
        document.querySelector("#popular-movies").appendChild(div)
    })

    
 
}



async function displayPopularShows(){
    const {results} = await fetchUrl('tv/popular')
    console.log(results)

    results.forEach((show) => {
        let div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
            <a href="movie-details.html?id=${show.id}">
            <img
                src="${show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'images/no-image.jpg'}"
                class="card-img-top"
                alt="${show.name}"}
            />
            </a>
            <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
                <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
            </div>`
        document.querySelector("#popular-shows").appendChild(div)
    })

    
 
}

//Movie details page
async function showMovieDetails(){
    let movieID = window.location.search.split('=')[1]
    let details = await fetchUrl(`movie/${movieID}`)

    let div = document.querySelector("#movie-details")
    div.innerHTML = `<div class="details-top">
    <div>
      <img
      src="${details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : 'images/no-image.jpg'}"
      class="card-img-top"
      alt="${details.original_title}"}
      />
    </div>
    <div>
      <h2>${details.original_title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${details.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${details.release_date}</p>
      <p>
        ${details.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${details.genres.map((genre) => `<li> ${genre.name} </li>`).join('')}
      </ul>
      <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget: </span>  ${details.budget}</li>
      <li><span class="text-secondary">Revenue: </span>  ${details.revenue}</li>
      <li><span class="text-secondary">Runtime: </span> ${details.runtime}</li>
      <li><span class="text-secondary">Status: </span> ${details.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group "> 
        ${details.production_companies.map(company => company.name).join(", ")}
    </div>
  </div>`

  

}

function showSpiner(){
    document.querySelector(".spinner").classList.add(".show")
}
function hideSpiner(){
    document.querySelector(".spinner").classList.add(".hide")
}


async function fetchUrl(endpoint){
    const apiKey = "4f26c4c4adca3927d74ef4565c682cea"
    const apiUrl = "https://api.themoviedb.org/3"

    showSpiner()
    const response = await fetch(`${apiUrl}/${endpoint}?api_key=${apiKey}&language=en-US`)
    const data = await response.json()

    hideSpiner()
    

    return data 
}

function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies()
            break;
        case '/shows.html':
            displayPopularShows()
            break;
        case '/search.html':
            console.log("search")
            break;
        case '/movie-details.html':
            showMovieDetails()
            break;
        case '/tv-details.html':
            console.log("TV details")
            break;
            
    }

    highlightActive()
}

init()



