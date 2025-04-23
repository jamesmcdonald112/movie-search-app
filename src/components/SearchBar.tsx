

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
        <section>
            <form  onSubmit={(e) => handleSubmit(e)}>
                <input 
                    type="text" 
                    placeholder="Search Movie"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}                    
                    />
            </form>
                
        </section>
    )
}