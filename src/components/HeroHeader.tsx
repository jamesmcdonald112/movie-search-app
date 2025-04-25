import SearchBar from "./SearchBar"

type HeroHeaderProps = {
    value: string 
    onChange: (value: string) => void 
    onSubmit: () => void
}

export default function HeroHeader({ value, onChange, onSubmit}: HeroHeaderProps) {
    return (
        <section>
            {<SearchBar value={value} onChange={onChange} onSubmit={onSubmit} />}
        </section>
    )
}