import React, { useEffect, useState } from 'react'
import './app.css'

import { getMovieList, searchMovie } from './api'

const App = () => {

  const getImg = import.meta.env.VITE_APP_BASEIMGURL

  const [popularMovies, setPopularMovies] = useState([]);

  const search = async(q) => {
    if (q.length > 3){
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }

  }
  
  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    })
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
      <div className="movie-wrapper" key={i}>
        <div className="movie-title">{movie.title}</div>
        <img src={`${getImg}/${movie.poster_path}`} alt="" />
        <div className="movie-date">Release: {movie.release_date}</div>
        <div className="movie-rate">{movie.vote_average}</div>
      </div>
      )
    })
  }


  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Pahe.li</h1>
        <input type="text" placeholder='Cari Film...' className='movie-search' onChange={({target}) => search(target.value)}/>
        <div className="movie-container">
          <PopularMovieList/>
        </div>
      </header>
    </div>
  )
}

export default App