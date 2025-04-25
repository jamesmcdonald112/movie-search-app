
import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import type { Movie, MovieApiResponse } from './types'


const apiKey: string = import.meta.env.VITE_MOVIE_API_KEY ?? ''
const fullUrl: string = `https://www.omdbapi.com/?apikey=${apiKey}`

function App() {
  const [movieQuery, setMovieQuery] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [moviesList, setMoviesList] = useState<Movie[]>([])
  const [hasError, setHasError] = useState<boolean>(false)

  function handleSubmit() {
    if(movieQuery.trim() === '') return

    setHasSearched(true)
    setIsSearching(true)
    setHasError(false)

    fetchMoviesByTitle()

  }

  async function fetchMoviesByTitle() {
    try {
      const response: Response = await fetch(fullUrl.concat(`&s=${movieQuery}`))
      
      if(!response) {
        throw new Error('Something went wrong fetching movies by title')
      }

      const data: MovieApiResponse = await response.json()
      console.log('data from searching for movies:', data)

      if(data.Response === 'False') {
        if(data.Error === 'Movie not found!') {
          setMoviesList([])
          setHasError(false)
          return
        } else {
          setHasError(true)
          return
        }
      }

      setMoviesList(data.Search || [])
      

    } catch (error) {
      setHasError(true)
      console.log("Error fetching movies by title:", error)
    } finally {
      setIsSearching(false)
      setMovieQuery('')
    }
  }

  function displayMovies() {
    return (
      moviesList.map(({imdbID, Title}) => (
        <div key={imdbID}>
          <h2>{Title}</h2>
        </div>

      ))
    )
  }

  return (
    <>
      {/* Search Input */}
      <SearchBar onSubmit={handleSubmit} value={movieQuery} onChange={setMovieQuery}/>

      {/* Loading  */}
      {isSearching && <p role='status'>Searching...</p>}

      {/* Movie Results */}
      {!isSearching && moviesList.length > 0 && (
        <section aria-label='Movie Results'>
          {displayMovies()}
        </section>
      )}

      {/* Movie not found */}
      {!isSearching && !hasError && hasSearched && moviesList.length === 0 && (
        <p>Movie not found</p>
      )}

      {/* Error message */}
      {!isSearching && hasSearched && hasError && (
        <p>Something went wrong</p>
      )}
    </>
  )
}

export default App
