export type Movie = {
    Poster: string
    Title: string
    Type: string
    Year: string
    imdbID: string
}

export type MovieApiResponse = 
    | { Response: 'True', Search: Movie[]}
    | { Response: 'False', Error: string}