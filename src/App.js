import React, { useState, useEffect, useCallback } from 'react'

import MoviesList from './components/MoviesList'
import AddMovie from './components/AddMovie'

import './App.css'

const errorsMap = new Map()
errorsMap.set(401, 'Un Authorized')
errorsMap.set(403, 'Forbidden ')
errorsMap.set(404, 'Service Not found')
errorsMap.set(405, 'Method not Allowed')

function App() {
  const [movies, setMovies] = useState([])
  const [isLoiading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const serviceURL = 'https://react-http-f6a65-default-rtdb.firebaseio.com/movies.json' //'https://swapi.dev/api/films
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(serviceURL)

      if (response.status !== 200) {
        throw new Error('An Error happened ' + errorsMap.get(response.status))
      }
      const data = await response.json()

      const loadedMovies = []
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          relaseDate: data[key].releaseDate
        })
      }

      setMovies(loadedMovies)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  async function addMovieHandler(movie) {
    console.log(movie)
    const response = await fetch(serviceURL, {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  }

  let content = <p>Found no movies.</p>
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }
  if (isLoiading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App
