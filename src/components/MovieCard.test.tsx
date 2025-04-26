import { beforeEach, describe, expect, it } from "vitest";
import MovieCard from "./MovieCard";
import { render, screen } from "@testing-library/react";
import { MovieSearchResult } from "../types";

describe('MovieCard', () => {
    const mockMovie: MovieSearchResult = {
        Poster: 'image/dsfalsdfm.jpg',
        Title: 'Django Unchained',
        Type: "Western",
        Year: '2015',
        imdbID: 'sdfjbnasdkjfbay438'
    }
    
    beforeEach(() => {
        render(<MovieCard movie={mockMovie} />)
    })

    it('renders the movie title', () => {
        expect(screen.getByText(/django unchained/i)).toBeInTheDocument()
    })

    it('renders the movie poster with correct src and alt', () => {
        const img = screen.getByAltText(/django unchained/i)
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', 'image/dsfalsdfm.jpg')
    })

    it('renders the movie type', () => {
        expect(screen.getByText(/Western/i)).toBeInTheDocument()
    })

    it('renders the movie year', () => {
        expect(screen.getByText(/2015/i)).toBeInTheDocument()
    })

})