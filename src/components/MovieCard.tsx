import type { MovieSearchResult } from "../types"

type MovieCardProps = {
    movie: MovieSearchResult
}

export default function MovieCard({ movie }: MovieCardProps) {
    const {Poster, Title, Type, Year} = movie

    return (
        <div className="
            flex gap-6
            p-6
            h-[250px]
            bg-transparent 
            border border-[#20293A] border-[3px] 
            rounded-xl 
            cursor-pointer
            hover:bg-[#1A2238]
            hover:border-white  
            hover:shadow-lg
            hover:-translate-y-2 
            transition-all duration-500        
        ">
            <img 
                src={Poster} 
                alt={Title} 
                className="w-32 h-48 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between items-start text-white">
                <h2 className="text-xl font-bold">{Title}</h2>
                <h3 className="text-sm">{Year}</h3>
                <p className="bg-[#20293A] px-3 py-1 rounded-full text-center text-xs">{Type}</p>
            </div>  
        </div>
    )
}