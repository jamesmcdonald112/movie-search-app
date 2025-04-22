
import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'

function App() {
  const [movieQuery, setMovieQuery] = useState<string>('')

  function handleSubmit() {
    console.log('search for', movieQuery)
  }

  return (
    <>
      <SearchBar onSubmit={handleSubmit} value={movieQuery} onChange={setMovieQuery}/>
    </>
  )
}

export default App
