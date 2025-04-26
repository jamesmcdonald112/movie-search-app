
import { useState } from 'react'
import type { MovieSearchResult, MovieApiResponse } from './types'
import HeroHeader from './components/HeroHeader'
import MovieCard from './components/MovieCard'
import Main from './components/Main'



// Delete this
// const mockMovie = {
//   "Title":"Django",
//   "Year":"1966",
//   "Rated":"R",
//   "Released":"01 Dec 1966",
//   "Runtime":"91 min",
//   "Genre":"Action, Drama, Western",
//   "Director":"Sergio Corbucci",
//   "Writer":"Sergio Corbucci, Bruno Corbucci, Franco Rossetti",
//   "Actors":"Franco Nero, José Canalejas, José Bódalo",
//   "Plot":"A coffin-dragging gunslinger and a prostitute become embroiled in a bitter feud between a Klan of Southern racists and a band of Mexican Revolutionaries.",
//   "Language":"Italian",
//   "Country":"Italy, Spain",
//   "Awards":"N/A",
//   "Poster":"https://m.media-amazon.com/images/M/MV5BZWVmN2NjOTMtMjZiNy00NDU2LTk3OTgtODFkYWQ2MDFiYzAwXkEyXkFqcGc@._V1_SX300.jpg",
//   "Ratings":[
//      {
//         "Source":"Internet Movie Database",
//         "Value":"7.2/10"
//      },
//      {
//         "Source":"Rotten Tomatoes",
//         "Value":"94%"
//      },
//      {
//         "Source":"Metacritic",
//         "Value":"75/100"
//      }
//   ],
//   "Metascore":"75",
//   "imdbRating":"7.2",
//   "imdbVotes":"32,133",
//   "imdbID":"tt0060315",
//   "Type":"movie",
//   "DVD":"N/A",
//   "BoxOffice":"$25,916",
//   "Production":"N/A",
//   "Website":"N/A",
//   "Response":"True"
// }

const apiKey: string = import.meta.env.VITE_MOVIE_API_KEY ?? ''
const fullUrl: string = `https://www.omdbapi.com/?apikey=${apiKey}`

function App() {
  const [movieQuery, setMovieQuery] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [moviesList, setMoviesList] = useState<MovieSearchResult[]>([])
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
      moviesList.map((movie: MovieSearchResult) => (
        <MovieCard movie={movie} />
      ))
    )
  }

  return (
    <>
      {/* Hero and Search Input */}
      <HeroHeader onSubmit={handleSubmit} value={movieQuery} onChange={setMovieQuery}/>
      

      <Main>
        {/* Loading  */}
        {isSearching && <p role='status'>Searching...</p>}

        {/* Movie Results */}
        {!isSearching && moviesList.length > 0 && (
          <section aria-label='Movie Results' className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-5'>
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
      </Main>

    </>
  )
}

export default App
