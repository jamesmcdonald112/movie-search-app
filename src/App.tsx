import { useState } from 'react'
import type { MovieSearchResult, MovieApiResponse, MovieDetail } from './types'
import HeroHeader from './components/HeroHeader'
import MovieCard from './components/MovieCard'
import Main from './components/Main'
import Spinner from './components/Spinner'
import MovieCardDetail from './components/MovieCardDetail'


const apiKey: string = import.meta.env.VITE_MOVIE_API_KEY ?? ''
const fullUrl: string = `https://www.omdbapi.com/?apikey=${apiKey}`

function App() {
  const [movieQuery, setMovieQuery] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [moviesList, setMoviesList] = useState<MovieSearchResult[]>([])
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null)
  const [hasError, setHasError] = useState<boolean>(false)

  function handleSubmit() {
    if(movieQuery.trim() === '') return

    setSelectedMovie(null)
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

  async function fetchMovieByImdbId(imdbID: string) {
    try {
      const response: Response = await fetch(fullUrl.concat(`&i=${imdbID}`));
  
      if (!response.ok) {
        throw new Error('Something went wrong fetching movie by IMDb ID');
      }
  
      const data: MovieDetail = await response.json();
      console.log('Data from fetching movie by IMDb ID:', data);
  
      setSelectedMovie(data);
  
    } catch (error) {
      setHasError(true);
      console.log("Error fetching movie by IMDb ID:", error);
    } finally {
      setIsSearching(false);
      setMovieQuery('');
    }
  }

  function displayMovies() {
    return (
      moviesList.map((movie: MovieSearchResult) => (
        <MovieCard movie={movie} onSelectMovie={(imdbID) => fetchMovieByImdbId(imdbID)} />
      ))
    )
  }

  return (
    <>
      {/* Hero and Search Input */}
      <HeroHeader onSubmit={handleSubmit} value={movieQuery} onChange={setMovieQuery}/>
      

      <Main>
        {/* Loading  */}
        {isSearching && <Spinner />}

        {/* Movie Results */}
        {selectedMovie ? (
            <MovieCardDetail movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
        ) : (
          !isSearching && moviesList.length > 0 && (
            <section aria-label='Movie Results' className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-5'>
              {displayMovies()}
            </section>
          )
        )}

        {/* Movie not found */}
        {!isSearching && !hasError && hasSearched && moviesList.length === 0 && (
          <div className='flex justify-center items-center min-h-[300px]'>
            <p className='text-[#97A3B6] text-lg font-bold'>Movie not found</p>
          </div>
        )}

        {/* Error message */}
        {!isSearching && hasSearched && hasError && (
          <div className='flex justify-center items-center min-h-[300px]'>
            <p className='text-[#97A3B6] text-lg font-bold'>Something went wrong</p>
          </div>
        )}
      </Main>

    </>
  )
}

export default App
