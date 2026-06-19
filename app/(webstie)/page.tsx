import Hero from "./_components/Hero"
import Home_section2 from "./_components/Home_section2"
import Home_section3 from "./_components/Home_section3"
import Home_usercontact from "./_components/Home_usercontact"
import Link from "next/link"
const categories = [
  {
    name: "Sarees",
    href: "/collections/Saree",
    image: "/saree_icon.png",
    description: "Timeless elegance in every drape",
  },
  {
    name: "Kurtis",
    href: "/collections/kurtis",
    image: "/kurti_icon.png",
    description: "Comfort meets style",
  },
  {
    name: "Lehengas",
    href: "/collections/lehengas",
    image: "/lehenga_icon.png",
    description: "Celebrate in grace and beauty",
  },
  {
    name: "Unstitch",
    href: "/collections/unstich",
    image: "/saree_icon.png",
    description: "Perfect everyday elegance",
  },
  {
    name: "Bridal",
    href: "/collections/bridal",
    image: "/bridal_icon.png",
    description: "Modern meets traditional",
  },
  {
    name: "Beauty",
    href: "/collections/beauty",
    image: "/beauty_icon.png",
    description: "Modern meets traditional",
  },
  {
    name: "Lingerie",
    href: "/collections/lingerie",
    image: "/lingerie_icon.png",
    description: "Modern meets traditional",
  },
];
export default function Home() {
    return (

        <main className="bg-slate-50">
            <nav className="md:hidden overflow-x-auto flex items-center gap-8 text-sm font-medium text-slate-700 border-2 border-b-black">
                <div className="flex flex-row gap-8 justify-center-safe">
                    {categories.map((category) => (
                        <div key={category.name} className="relative group">
                            <Link
                                href={category.href}
                                className="flex flex-col items-center transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:bg-slate-200"
                            >
                                {category.image && (
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-17 h-20 items-center"
                                    />
                                )}
                                <span className="text-lg font-medium text-slate-700 hover:text-slate-900">
                                    {category.name}
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </nav>
            <Hero />
            <Home_section2 />

            <section className="bg-slate-50 py-14">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Trusted by women across India and beyond</p>
                    </div>
                    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                    </div>
                </div>
            </section>
            <Home_section3 />
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">FAQs</h2>
                        <p className="mt-3 max-w-2xl text-sm text-slate-600">Find answers to questions about our collections, shipping, and returns.</p>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-3">
                        <div className="space-y-8 text-sm text-slate-700">
                            <div>
                                <h3 className="font-semibold text-slate-900">How long does shipping take?</h3>
                                <p className="mt-3 text-slate-600">We ship within five to seven business days. International orders typically arrive within two to three weeks depending on your location. You’ll receive tracking information once your order leaves our warehouse.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">How do I care for my saree?</h3>
                                <p className="mt-3 text-slate-600">Each piece comes with care instructions. Generally, hand wash or dry clean to preserve the fabric and embroidery. Store in a cool, dry place away from direct sunlight.</p>
                            </div>
                        </div>

                        <div className="space-y-8 text-sm text-slate-700">
                            <div>
                                <h3 className="font-semibold text-slate-900">What is your return policy?</h3>
                                <p className="mt-3 text-slate-600">We offer thirty days for returns or exchanges from the date of purchase. Items must be unworn and in original condition with all tags attached. Contact our support team to initiate the process.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Can I customize my order?</h3>
                                <p className="mt-3 text-slate-600">We offer limited customization options for select pieces. Contact our team to discuss your specific needs and we’ll work with you on possibilities.</p>
                            </div>
                        </div>

                        <div className="space-y-8 text-sm text-slate-700">
                            <div>
                                <h3 className="font-semibold text-slate-900">Do you ship internationally?</h3>
                                <p className="mt-3 text-slate-600">Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Check our shipping page for specific details about your destination.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">What payment methods do you accept?</h3>
                                <p className="mt-3 text-slate-600">We accept all major credit cards, digital wallets, and bank transfers. Your payment information is secure and encrypted during checkout.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Home_usercontact />
        </main>
    )
}
