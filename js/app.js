//initial value 
const API_key = '031112608a39b5e696044896a9a5bc50';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=031112608a39b5e696044896a9a5bc50';

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');

function movieSection(movies){
   return movies.map((movie) => {
        return `
        <img src=${movie.poster_path} data-movie-id=${movie.id}/>`;
    })
}

function createMovieContenair(movies){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movie');

    const movieTemplate = `
    <section class="section">
        ${movieSection(movies)}
    </section>
    <div class="content">
    <p id="content-close">X</p>
    </div>`;

    movieElement.innerHTML = movieTemplate;
    return movieElement;

}

buttonElement.onclick = function (event){
    event.preventDefault();
    const value = inputElement.value;

    const newUrl = url + '&query' + value;

        fetch(newUrl)
        .then((res) => res.json())
        .then((data) => {
            const movies = data.result;
            const movieBlock = createMovieContenair(movies);
            movieSearchable.appendChild(movieBlock);
            console.log('data: ' ,data);
        })
        .catch((error) => {
            console.log('error : ', error);
        });


    console.log('value : ',value);
   
}