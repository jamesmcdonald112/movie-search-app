import SearchBar from "./SearchBar"

type HeroHeaderProps = {
    value: string 
    onChange: (value: string) => void 
    onSubmit: () => void
}

export default function HeroHeader({ value, onChange, onSubmit}: HeroHeaderProps) {
    return (
        <>
            <header className="
                flex flex-col items-center justify-center w-full 
                min-h-[220px] max-h-[334px] h-full
                text-white
                bg-[url(/images/hero-image-movie-search.jpg)] bg-cover bg-center
                relative
            ">
                <div className="flex flex-col justify-end items-center mx-auto h-full">
                    <img 
                        src="/images/OMDb-logo.png" 
                        alt="OMDb logo" 
                        className="w-70 mb-10"
                    />
                </div>
            </header>

            <div className="
                flex justify-center
                relative -translate-y-1/2 transform z-10
                px-3
                "
            >
                <div className="w-full max-w-[700px]">
                    <SearchBar value={value} onChange={onChange} onSubmit={onSubmit} />
                </div>
            </div>
        </>
    )
}