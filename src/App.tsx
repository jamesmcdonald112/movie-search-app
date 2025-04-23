
import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'


const apiKey = import.meta.env.VITE_MOVIE_API_KEY

function App() {
  const [movieQuery, setMovieQuery] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)

  function handleSubmit() {
    if(movieQuery.trim() === '') return
    
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
    }, 2000);
  }

  return (
    <>
      <SearchBar onSubmit={handleSubmit} value={movieQuery} onChange={setMovieQuery}/>
      {isSearching && <p role='status'>Searching...</p>}
    </>
  )
}

export default App
