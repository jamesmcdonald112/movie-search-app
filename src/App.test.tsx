import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi} from 'vitest'
import App from "./App";
import userEvent from "@testing-library/user-event";

describe('App', () => {

    function setup() {
        const user = userEvent.setup()
        render(<App />)
        const searchBar = screen.getByPlaceholderText(/search movie/i)

        return { user, searchBar }
    }

    it('does not call onSubmit when input is empty and Enter is pressed', async () => {
        const logSpy = vi.spyOn(console, 'log')
        const {user, searchBar} = setup()

       await user.type(searchBar, '{enter}')

       expect(logSpy).not.toHaveBeenCalled()
    })

    it('displays a loading indicator while the movie query is being fetched from the API', async () => {
        const {user, searchBar} = setup()
      
        // Type and submit the search
        await user.type(searchBar, 'Django Unchained{enter}')
      
        // The loading indicator should appear
        expect(screen.getByRole("status")).toBeInTheDocument()
      
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
})