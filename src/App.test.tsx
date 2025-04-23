import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi} from 'vitest'
import App from "./App";
import userEvent from "@testing-library/user-event";

describe('App', () => {
    it('does not call onSubmit when input is empty and Enter is pressed', async () => {
        const user = userEvent.setup()
        const logSpy = vi.spyOn(console, 'log')

        render(<App />)
        const searchBar = screen.getByPlaceholderText(/search movie/i)

       await user.type(searchBar, '{enter}')

       expect(logSpy).not.toHaveBeenCalled()
    })

    it('displays a loading indicator while the movie query is being fetched from the API', async () => {
        const user = userEvent.setup()
        render(<App />)
        const searchBar = screen.getByPlaceholderText(/search movie/i)
      
        // Type and submit the search
        await user.type(searchBar, 'Django{enter}')
      
        // The loading indicator should appear
        expect(screen.getByRole('status')).toBeInTheDocument()
      
        // Wait for the loading indicator to disappear
        await waitFor(() => {
          expect(screen.queryByRole('status')).not.toBeInTheDocument()
        })
      })
})