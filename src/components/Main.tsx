export default function Main({ children }: {children : React.ReactNode}) {
    return (
        <main className="bg-[#111729] min-h-screen flex flex-col items-center pt-20 -mt-16">
            {children}
        </main>
    )
}