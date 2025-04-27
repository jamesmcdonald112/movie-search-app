import { MovieDetail } from "../types"

type MovieCardDetailProps = {
    movie: MovieDetail
    onBack: () => void
}

export default function MovieCardDetail({ movie, onBack }: MovieCardDetailProps) {
    return (
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-8 text-white">
            <button 
              onClick={onBack}
              className="mb-6 px-4 py-2 bg-[#20293A] hover:bg-[#1A2238] rounded-lg text-sm"
            >
              ← Back to results
            </button>

            <div className="flex flex-col md:flex-row gap-6 bg-[#1A2238] p-6 rounded-xl">
                <img 
                  src={movie.Poster} 
                  alt={movie.Title} 
                  className="w-full md:w-[300px] h-auto rounded-lg object-cover"
                />

                <div className="flex flex-col justify-between mt-6 md:mt-0 gap-2">
                    <h2 className="text-2xl sm:text-3xl font-bold">{movie.Title}</h2>
                    <p className="mt-2 text-gray-400">{movie.Year} • {movie.Genre}</p>

                    <div className="mt-4 gap-2 flex flex-col">
                        <h3 className="text-lg sm:text-xl font-semibold mb-1">Plot</h3>
                        <p className="text-gray-300">{movie.Plot}</p>
                    </div>

                    <div className="mt-4 gap-2 flex flex-col">
                        <h3 className="text-lg sm:text-xl font-semibold mb-1">Director</h3>
                        <p className="text-gray-300">{movie.Director}</p>
                    </div>

                    <div className="mt-4 gap-2 flex flex-col">
                        <h3 className="text-lg sm:text-xl font-semibold mb-1">Writers</h3>
                        <p className="text-gray-300">{movie.Writer}</p>
                    </div>

                    <div className="mt-4 gap-2 flex flex-col">
                        <h3 className="text-lg sm:text-xl font-semibold mb-1">Stars</h3>
                        <p className="text-gray-300">{movie.Actors}</p>
                    </div>

                    <div className="mt-4 flex gap-4">
                        <div className="gap-2 flex flex-col">
                            <h3 className="text-lg sm:text-xl font-semibold mb-1">IMDb Rating</h3>
                            <p className="text-gray-300">{movie.imdbRating}/10</p>
                        </div>
                        <div className="gap-2 flex flex-col">
                            <h3 className="text-lg sm:text-xl font-semibold mb-1">Votes</h3>
                            <p className="text-gray-300">{movie.imdbVotes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}