//initial value 
const API_key = '031112608a39b5e696044896a9a5bc50';
const IMGAGE_URL = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=031112608a39b5e696044896a9a5bc50';


const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');
const imgElement = document.querySelector('img');

function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=031112608a39b5e696044896a9a5bc50`;
    return url;
}



function movieSection(movies){
   return movies.map((movie) => {
       if (movie.poster_path){
         return `
         <img 
         src=${IMGAGE_URL + movie.poster_path}
         data-movie-id=${movie.id}
         />`;}
     }) 
}

function createMovieContenainer(movies){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movie');

    const movieTemplate = `
    <section class="section">
     ${movieSection(movies)}
    </section>
    <div class="content">
    <p id="content-close">X</p>
    </div>
    `;

    movieElement.innerHTML =  movieTemplate;
    return movieElement;

}

function renderSearchMovies(data){

            movieSearchable.innerHTML = '';
            const movies = data.results;
            const movieBlock = createMovieContenainer(movies);
            movieSearchable.appendChild(movieBlock);
            console.log('data: ' ,data);
}


buttonElement.onclick = function (event){
    event.preventDefault();
    const value = inputElement.value;
    const path = '/search/movie';
    const newUrl = generateUrl(path) + '&query=' + value;

        fetch(newUrl)
        .then((res) => res.json())
        .then( renderSearchMovies)
        .catch((error) => {
            console.log('error : ', error);
        });

        inputElement.value = '';
    console.log('value : ',value);
   
}

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https:/www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}

// event delegation 
document.onclick = function (event){
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
        
        const movieId = target.dataset.movieId;
        console.log('Movie ID: ', movieId);
        const section = event.target.parentElement ; //section
        const content = section.nextElementSibling; //content 
        content.classList.add('content-display');

        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);
        fetch(url)
        .then((res) => res.json())
            .then((data) => {
            //TODO
                //display movies
                console.log('Videos : ', data);
                const videos = data.results;
                const lenght = videos.lenght > 4 ? 4 : videos.lenght;
                const iframeContainer = document.createElement('div');

                for (let i = 0; i < lenght;i++){
                    const video = videos[i]; // video
                    const iframe = createIframe(video);
                    iframeContainer.appendChild(iframe);
                    content.appendChild(iframeContainer);
                }
                
                
        })
        .catch((error) => {
            console.log('error : ', error);
        });


}
   if(target.id === 'content-close'){
        const content = target.parentElement;
        content.classList.remove('content-display');  

   } 
}

