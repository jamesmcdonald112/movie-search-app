
import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'

function App() {
  const [movieQuery, setMovieQuery] = useState<string>('')


  return (
    <>
      <SearchBar value={movieQuery} onChange={(newMovieQuery) => setMovieQuery(newMovieQuery)}/>
    </>
  )
}

export default App
