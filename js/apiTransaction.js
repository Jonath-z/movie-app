// Initial values
const API_key = '031112608a39b5e696044896a9a5bc50';
const IMGAGE_URL = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=031112608a39b5e696044896a9a5bc50';

function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=031112608a39b5e696044896a9a5bc50`;
    return url;
}

function requestMovies(url,onComplite,onError){
    
    fetch(url)
        .then((res) => res.json())
        .then(onComplite)
        .catch(onError);

}


function searchMovie(value) {
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;
    requestMovies(url, renderSearchMovies, hundleError);
}


function getUpComingMovies() {
    const path = '/movie/upcoming';
    const url = generateUrl(path);

    const render = renderMovies.bind({ title : 'Upcoming Movies'});
    requestMovies(url,render, hundleError);
}


function getTopRatedMovies() {
    const path = '/movie/top_rated';
    const url = generateUrl(path);

    const render = renderMovies.bind({ title : 'Top Rated Movies'});
    requestMovies(url,render, hundleError);
}


function getPopularMovies() {
    const path = '/movie/popular';
    const url = generateUrl(path);
    
    const render = renderMovies.bind({ title : 'Popular Movies'});
    requestMovies(url,render, hundleError);
}

