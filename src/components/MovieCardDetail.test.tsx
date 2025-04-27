
import { render, screen } from "@testing-library/react"
import MovieCardDetail from "./MovieCardDetail" // Update path if needed
import { describe, expect, it } from "vitest"
import { MovieDetail } from "../types"

const mockMovie: MovieDetail = {
  "Title":"Django",
  "Year":"1966",
  "Rated":"R",
  "Released":"01 Dec 1966",
  "Runtime":"91 min",
  "Genre":"Action, Drama, Western",
  "Director":"Sergio Corbucci",
  "Writer":"Sergio Corbucci, Bruno Corbucci, Franco Rossetti",
  "Actors":"Franco Nero, José Canalejas, José Bódalo",
  "Plot":"A coffin-dragging gunslinger and a prostitute become embroiled in a bitter feud between a Klan of Southern racists and a band of Mexican Revolutionaries.",
  "Language":"Italian",
  "Country":"Italy, Spain",
  "Awards":"N/A",
  "Poster":"https://m.media-amazon.com/images/M/MV5BZWVmN2NjOTMtMjZiNy00NDU2LTk3OTgtODFkYWQ2MDFiYzAwXkEyXkFqcGc@._V1_SX300.jpg",
  "Ratings":[
     {
        "Source":"Internet Movie Database",
        "Value":"7.2/10"
     },
     {
        "Source":"Rotten Tomatoes",
        "Value":"94%"
     },
     {
        "Source":"Metacritic",
        "Value":"75/100"
     }
  ],
  "Metascore":"75",
  "imdbRating":"7.2",
  "imdbVotes":"32,133",
  "imdbID":"tt0060315",
  "Type":"movie",
  "DVD":"N/A",
  "BoxOffice":"$25,916",
  "Production":"N/A",
  "Website":"N/A",
  "Response":"True"
}


describe('MovieCardDetail', () => {
  it('renders movie title', () => {
    render(<MovieCardDetail movie={mockMovie} onBack={() => {}}/>)
    expect(screen.getByText(/django/i)).toBeInTheDocument()
  })

  it('renders movie plot', () => {
    render(<MovieCardDetail movie={mockMovie} onBack={() => {}}/>)
    expect(screen.getByText(/coffin-dragging gunslinger/i)).toBeInTheDocument()
  })

  it('renders genre badges', () => {
    render(<MovieCardDetail movie={mockMovie} onBack={() => {}}/>)
    expect(screen.getByText(/Action/i)).toBeInTheDocument()
    expect(screen.getByText(/Drama/i)).toBeInTheDocument()
    expect(screen.getByText(/Western/i)).toBeInTheDocument()
  })

  it('renders director, writer, and actors', () => {
    render(<MovieCardDetail movie={mockMovie} onBack={() => {}}/>)
    expect(screen.getByText(/Director/i)).toBeInTheDocument()
    expect(screen.getByText(/Writer/i)).toBeInTheDocument()
    expect(screen.getByText(/Franco Nero/i)).toBeInTheDocument()
  })

  it('renders IMDb rating and votes', () => {
    render(<MovieCardDetail movie={mockMovie} onBack={() => {}}/>)
    expect(screen.getByText(/7.2\/10/i)).toBeInTheDocument()
    expect(screen.getByText(/\(32,133 votes\)/i)).toBeInTheDocument()
  })
})