export default function HeaderLoader() {
    return (
        <div className="bg-black w-full">
            <div className="h-12 w-full hidden lg:flex justify-center items-center">
                <div className="skeleton h-2 w-96"></div>
            </div>
            <div className="flex justify-between items-center h-14 lg:h-24 w-full p-4 lg:px-12">
                <div></div>
                <div className="hidden lg:block">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-2 w-36 skeleton"></div>
                    ))}
                </div>
                <div>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-2 w-10 skeleton"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
