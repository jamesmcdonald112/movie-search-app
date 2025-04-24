
import { use, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import type { Movie } from './types'


const apiKey = import.meta.env.VITE_MOVIE_API_KEY

const moviesListExample = [
  {
    id: '1',
    title:'Django Unchained'
  },
  {
    id: '2',
    title:'More Django'
  }
]

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

    // Simulate API failure if query === 'fail'
    if(movieQuery === 'fail') {
      setTimeout(() => {
        setHasError(true)
        setIsSearching(false)
      }, 2000)
    } else {

      // Simulate a successful API cal
      setTimeout(() => {
        const results = moviesListExample.filter(movie => (
          movie.title.toLowerCase().includes(movieQuery.toLowerCase())
        ))

        setMoviesList(results)
        setIsSearching(false)
      }, 2000);
    }
    setMovieQuery('')
  }

  function displayMovies() {
    return (
      moviesList.map(({id, title}) => (
        <div key={id}>
          <h2>{title}</h2>
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
