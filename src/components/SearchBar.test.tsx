import { describe, it, expect, vi} from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'
import { useState } from 'react'


describe("SearchBar", () => {

    type MovieWrapperProps = {
        onSubmit: (movieQuery: string) => void
    }

    function MovieWrapper({ onSubmit }: MovieWrapperProps) {
        const [movieQuery, setMovieQuery] = useState<string>('')

        return (
            <SearchBar 
                value={movieQuery} 
                onChange={(newMovieQuery) => setMovieQuery(newMovieQuery)}
                onSubmit={() => onSubmit(movieQuery)}
            />
        )
    }
    

    it('renders an input with the correct placeholder text', () => {
        render(<SearchBar onSubmit={() => {}} value="" onChange={() => {}}/>)
        const searchBar = screen.getByPlaceholderText(/search movie/i)

        expect(searchBar).toBeInTheDocument()
    })

    it('updates the input value as the user types', async () => {
        const user = userEvent.setup()

        render(<MovieWrapper onSubmit={() => {}}/>)
        const searchBar = screen.getByPlaceholderText(/search movie/i)

        await user.type(searchBar, 'Django')

        expect(searchBar).toHaveValue('Django')

    })

    it('calls onSubmit with the input value when Enter is pressed', async () => {
       const user = userEvent.setup()
       const mockOnSubmit = vi.fn()
       
       render(<MovieWrapper onSubmit={mockOnSubmit}/>)
       const searchBar = screen.getByPlaceholderText(/search movie/i)

       await user.type(searchBar, 'Django{enter}')
       expect(mockOnSubmit).toHaveBeenCalled()
       expect(mockOnSubmit).toHaveBeenCalledWith('Django')

    })

    it('does not call onSubmit when input is empty and Enter is pressed', async () => {
        const user = userEvent.setup()
        const mockOnSubmit = vi.fn()

        render(<MovieWrapper onSubmit={mockOnSubmit} />)
        const searchBar = screen.getByPlaceholderText(/search movie/i)

        await user.type(searchBar, '{enter}')
        expect(mockOnSubmit).not.toHaveBeenCalled()
    })
})