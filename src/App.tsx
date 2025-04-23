
import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'


const apiKey = import.meta.env.VITE_MOVIE_API_KEY

function App() {
  const [movieQuery, setMovieQuery] = useState<string>('')

  function handleSubmit() {
    if(movieQuery.trim() === '') return
    console.log('submitted')
  }

  return (
    <>
      <SearchBar onSubmit={handleSubmit} value={movieQuery} onChange={setMovieQuery}/>
    </>
  )
}

export default App
