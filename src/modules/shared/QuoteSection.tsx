export default function QuoteSection({ bgColor, quote = "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential."}: {quote: string | undefined, bgColor: "bg-danger" | "bg-secondary"}) {
    return (
        <section className={`relative px-4 py-20 ${bgColor}`}>
            <div className="container mx-auto relative flex justify-center items-center py-10 rounded-md">
                <h4 className="text-2xl md:text-3xl max-w-5xl text-background text-center font-semibold font-grotesk">&ldquo;{ quote }&rdquo;</h4>
            </div>
        </section>
    )
}
