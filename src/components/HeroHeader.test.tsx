import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HeroHeader from "./HeroHeader";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

describe('HeroHeader', () => {


    function setUp() {
        const mockSubmit = vi.fn()
        const Wrapper = () => {
            const [movieQuery, setMovieQuery] = useState<string>('')
            return <HeroHeader value={movieQuery} onChange={setMovieQuery} onSubmit={mockSubmit} />
        }
        const user = userEvent.setup()
        render(<Wrapper />)
        const searchBar = screen.getByPlaceholderText(/search movie/i)
        return { user, searchBar, mockSubmit}
    }
    

    it('render the SearchBar component to the screen', () => {
        setUp()

        expect(screen.getByPlaceholderText(/Search Movie/i)).toBeInTheDocument()
    })

    it('does not call onSubmit when input is empty and Enter is pressed', async () => {
        const {user, searchBar, mockSubmit} = setUp() 
    
        await user.type(searchBar, '{enter}')
    
        expect(mockSubmit).not.toHaveBeenCalled()
      })
})