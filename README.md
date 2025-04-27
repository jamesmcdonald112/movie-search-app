# Movie Search App

A responsive movie search application using the OMDb API.
Users can search for movies, view a results list, and click a movie to view detailed information.

## Live Demo
- [Click here for the live demo](https://musical-fox-1da108.netlify.app/)

## Features
- Search movies by title
- View detailed information (Plot, Director, Writer, Stars, Ratings)
- Fully responsive (Mobile, Tablet, Desktop)
- Loading spinner while fetching
- Error handling (“Movie not found” / “Something went wrong”)
- Smooth UI hover and transition effects

## Tech Stack
- React + TypeScript
- Tailwind CSS
- OMDb API (https://www.omdbapi.com/)
- Vitest + React Testing Library (for tests)

## Setup
1. Clone the repo
2. Install dependencies

```bash
npm install
```

3. Add your .env file:

```bash
VITE_MOVIE_API_KEY=your_omdb_api_key
```

5. Run the project:

```bash
npm run dev
```
