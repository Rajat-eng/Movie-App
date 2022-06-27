var API_KEY='api_key=54d6939320a1ce69c597b8dcdb03d379';
const BASE_URL='https://api.themoviedb.org/3'
const API_URL=BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/w500';
const searchURL=BASE_URL+'/search/movie?'+ API_KEY;
let main=document.getElementById('main');


function saveToLocal(data){
    var movie_list=[];
    movie_list=JSON.parse(localStorage.getItem('session')) || [];
    for(let i=0;i<movie_list.length;i++){
        if(data==movie_list[i]){
            alert("already added");
            return;
        }
    }
    movie_list.push(data);
    localStorage.setItem('session', JSON.stringify(movie_list));
}

getMovies(API_URL);
// fetchinh pouplar movies
function getMovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        // console.log(data.results);
        showMovies(data.results);
    });
}

function showMovies(data){
    // finction for showing movies and attaching to mainDOM
    main.innerHTML='';
    data.forEach((movie) => {
        const{id,title,poster_path,vote_average,overview}=movie;
        const movieEl=document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML=`
        <img src="${IMG_URL + poster_path}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getcolor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>${overview}</p>
        </div>
        <div class="button">
            <button type="Submit" id="${id}" onClick="add(${id})">Save</button>
        </div>`
        main.appendChild(movieEl);
    });
}

// color of rating changes accoriding to its value
function getcolor(vote){
    if(vote>=8){
        return 'green';
    }else if(vote>=5){
        return 'orange';
    }else{
        return 'red';
    }
}

// accessing search term in header to get desired movies
const search=document.getElementById('search');
document.getElementById('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm=search.value;
    console.log(searchTerm);
        if(searchTerm){
            getMovies(searchURL+'&query='+searchTerm);
        }else{
            getMovies(API_URL);
        }
});

// Add fav movies to local storage
function add(id){
  
    saveToLocal(id);
    // movie_list=JSON.parse(localStorage.getItem('movie'));
    // movie_list.push(id);
    // alert("added");
    // localStorage.setItem('movies',JSON.stringify(movie_list));
}








