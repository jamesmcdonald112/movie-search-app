type SearchBarProps = {
    value: string
    onChange: (newMovieQuery: string) => void

}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div>
            <input 
                type="text" 
                placeholder="Search Movie"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                />
                
        </div>
    )
}