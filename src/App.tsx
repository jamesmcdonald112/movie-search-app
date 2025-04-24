
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

  function handleSubmit() {
    if(movieQuery.trim() === '') return
    
    setHasSearched(true)
    setIsSearching(true)
    
    // Simulate a fake API request with 2s delay
    setTimeout(() => {
      const results = moviesListExample.filter(movie => (
        movie.title.toLowerCase().includes(movieQuery.toLowerCase())
      ))

      setMoviesList(results)
      setIsSearching(false)
    }, 2000);
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

      {!isSearching && hasSearched && moviesList.length === 0 && (
        <p>Movie not found</p>
      )}
    </>
  )
}

export default App
