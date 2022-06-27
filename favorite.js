const API_KEY='api_key=54d6939320a1ce69c597b8dcdb03d379';
const BASE_URL='https://api.themoviedb.org/3'
const IMG_URL='https://image.tmdb.org/t/p/w500';
let main=document.getElementById('main');

var res=localStorage.getItem('session');
var favMovies=JSON.parse(res);
console.log(favMovies);


    for(let i=0;i<favMovies.length;i++){
        const id=favMovies[i];
        let url=`${BASE_URL}/movie/${id}?${API_KEY}`;
        // console.log(url);
        getMovies(url);
    }



function getMovies(url){

    fetch(url).then(res=>res.json()).then(data=>{
        // console.log(data);
        showMovies(data);
    });
}


    function showMovies(data){
        // main.innerHTML='';
        const movieEl=document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML=`
        <img src="${IMG_URL + data.poster_path}">
        <div class="movie-info">
            <h3>${data.title}</h3>
            <span class="${getcolor(data.vote_average)}">${data.vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>${data.overview}</p>
        </div>
        <div class="button">
            <button type="Submit" id="${data.id}" onClick="Delete(${data.id})">Delete</button>
        </div>`
        main.appendChild(movieEl);
    }

    function getcolor(vote){
        if(vote>=8){
            return 'green';
        }else if(vote>=5){
            return 'orange';
        }else{
            return 'red';
        }
    }

    function Delete(delid){
        favMovies=favMovies.filter(id=>id!=delid);
        alert("Deleted!")
        localStorage.setItem('session',JSON.stringify(favMovies));
        res=localStorage.getItem('session');
        favMovies=JSON.parse(res);
        for(let i=0;i<favMovies.length;i++){
            const id=favMovies[i];
            let url=`${BASE_URL}/movie/${id}?${API_KEY}`;
            main.innerHTML='';
            getMovies(url);
        }
    }


    


