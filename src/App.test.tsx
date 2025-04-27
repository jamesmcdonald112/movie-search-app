import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach} from 'vitest'
import App from "./App";
import userEvent from "@testing-library/user-event";

describe('App', () => {
  
  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => {
        await new Promise((r) => setTimeout(r, 50)) // simulate delay
        return {
          Search: [
            { Title: 'Django Unchained', imdbID: '5u3485u3948u5349' }
          ]
        }
      }
    } as any)
  })

  function setup() {
    const user = userEvent.setup()
    render(<App />)
    const searchBar = screen.getByPlaceholderText(/search movie/i)

    return { user, searchBar }
  }

  function mockMovieNotFoundResponse() {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        Response: 'False',
        Error: 'Movie not found!'
      })
    } as any)
  }

  it('clears the search bars input after searching', async () => {
    const {user, searchBar} = setup()
    
    // Type and submit the search
    await user.type(searchBar, 'Django Unchained{enter}')

    await waitFor(() => {
      expect(searchBar).toHaveValue('')
    })

  })

  it('displays a loading indicator while the movie query is being fetched from the API', async () => {
    const {user, searchBar} = setup()
  
    // Type and submit the search
    await user.type(searchBar, 'Django Unchained{enter}')
  
    // The loading indicator should appear
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument()
    })
  
    // Wait up to 3s for it to disappear
    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('displays a list of movies matching the search query after the query is submitted', async () => {
    const {user, searchBar} = setup()

    // Type and submit the search
    await user.type(searchBar, 'Django Unchained{enter}')

    await waitFor(() => {
        expect(screen.getByText(/Django Unchained/i)).toBeInTheDocument()
    }, { timeout: 3000 })

  })

  it('displays "Movie not found" message is the search query does not match any movies', async () => {
    mockMovieNotFoundResponse()

    const {user, searchBar} = setup()

    await user.type(searchBar, 'kjadsnfldskjanflsaf{enter}')

    await waitFor(() => {
      expect(screen.getByText(/movie not found/i)).toBeInTheDocument()
    }, { timeout: 3000 })

  })

  it('displays an error when the API returns Response: "False"', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        Response: 'False',
        Error: 'Quota exceeded' // or 'Too many requests!'
      })
    } as any)

    const {user, searchBar} = setup()

    await user.type(searchBar, 'fail{enter}')

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    }, { timeout: 3000})

    expect(screen.queryByText(/movie not found/i)).not.toBeInTheDocument()
  })

    // API
  it('submitting a valid movie query returns results on the screen', async () => {
    const {user, searchBar} = setup()

    await user.type(searchBar, 'Django Unchained{enter}')

    await waitFor(() => {
      expect(screen.getByText(/django unchained/i)).toBeInTheDocument()
    })
  })

  it('displays a generic error message when fetch fails', async () => {
    vi.spyOn(window, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    const {user, searchBar} = setup()

    await user.type(searchBar, 'Django Unchained{enter}')

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })

  it('fetches and displays movie details when a card is clicked', async () => {
    const {user, searchBar} = setup()

    await user.type(searchBar, 'Django Unchained{enter}')

    await waitFor(() => {
      expect(screen.getByText(/django unchained/i)).toBeInTheDocument()
    })

    // Mock the second fetch (movie details) after clicking
    vi.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        Title: "Django Unchained",
        Plot: "A freed slave sets out to rescue his wife from a brutal plantation owner.",
        imdbID: "5u3485u3948u5349",
        Year: "2012",
        Type: "movie",
        Poster: "some-poster-url"
      })
    } as any)

    await user.click(screen.getByText(/django unchained/i))

    await waitFor(() => {
      expect(screen.getByText(/a freed slave sets out to rescue his wife/i)).toBeInTheDocument()
    })
  })


})