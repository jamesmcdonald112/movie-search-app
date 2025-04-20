import { describe, it, expect} from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'
import { useState } from 'react'


describe("SearchBar", () => {
    it('renders the input bar on the screen', () => {
        render(<SearchBar value="" onChange={() => {}}/>)
        const searchBar = screen.getByPlaceholderText(/search movie/i)

        expect(searchBar).toBeInTheDocument()
    })

    it('updates the input field to reflect the users input', async () => {
        const user = userEvent.setup()

        const Wrapper = () => {
            const [movieQuery, setMovieQuery] = useState('')
            return <SearchBar value={movieQuery} onChange={setMovieQuery} />
        }

        render(<Wrapper />)
        const searchBar = screen.getByPlaceholderText(/search movie/i)

        await user.type(searchBar, 'Django')

        expect(searchBar).toHaveValue('Django')

    })
})