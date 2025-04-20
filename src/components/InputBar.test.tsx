import { describe, it, expect} from 'vitest'
import { render, screen } from '@testing-library/react'
import SearchBar from './SearchBar'


describe("SearchBar", () => {
    it('renders the input bar on the screen', () => {
        render(<SearchBar />)
        const searchBar = screen.getByPlaceholderText(/search movie/i)

        expect(searchBar).toBeInTheDocument()
    })
})