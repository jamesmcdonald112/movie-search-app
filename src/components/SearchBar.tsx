

type SearchBarProps = {
    value: string
    onChange: (newMovieQuery: string) => void
    onSubmit: () => void
}

export default function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if(value.trim() === '') return
        onSubmit()
    }
    return (
            <form  
                onSubmit={(e) => handleSubmit(e)}
                className="w-full mx-3"
            >
                <div className="relative w-full">
                    <img 
                        src="/images/search_alt.svg"
                        alt="" 
                        className="absolute transform translate-y-4.5 w-7 h-7 
                        left-2
                        pointer-events-none"
                    />
                    <input 
                        type="text" 
                        placeholder="Search Movie"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}  
                        className="
                            w-full
                            text-white bg-gray-800
                            rounded-2xl
                            px-7 pl-10
                            py-5
                            placeholder-white            
                        "                  
                    />
                </div>
                    
            </form>
    )
}