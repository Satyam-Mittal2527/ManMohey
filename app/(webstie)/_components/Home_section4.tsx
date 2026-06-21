
import Link from "next/link";

export default function Home_section4() {
    return (
        <section className="bg-gray-50 w-full py-12 md:py-20">
            <div className="w-full transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                <div className="w-full flex flex-col md:flex-row items-stretch md:gap-6 bg-white shadow-sm">
                   
                    <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-6">
                        <img src="/Test_saree.png" alt="Premium collection" className="w-full h-auto object-contain max-h-[420px] md:max-h-[560px]" />
                    </div>

                   
                    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white">
                        <p className="text-sm font-semibold text-indigo-600 mb-2">Premium Products</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Shop Handpicked, Premium Ethnic Wear</h2>
                        <p className="text-gray-600 mb-6">Explore our curated selection of sarees, lehengas and more — crafted with premium fabrics and exclusive designs for special occasions.</p>
                        <div className="flex items-center gap-4">
                            <Link href="/collections" className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-md shadow hover:bg-indigo-700">Shop Now</Link>
                            <Link href="/collections" className="text-sm text-gray-600 hover:underline">View Collection</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}