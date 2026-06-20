"use client"

import { Get_Home_page_Hero } from "@/lib/api"
import { useEffect, useState } from "react";

export default function Hero() {
    const [heroImageURL, setHeroImageURL] = useState(null);

    useEffect(() => {
        const fetchHeroData = async () => {
            const data = await Get_Home_page_Hero();
            console.log("Fetched hero data:", data.image_url);
            setHeroImageURL(data.image_url);
        };
        fetchHeroData();
    }, []);

    return (
        <section
            className="relative overflow-hidden bg-cover text-white"
            style={{
                backgroundImage: `url(${heroImageURL})`,
                backgroundPosition: '20% 20%',
                backgroundRepeat: 'no-repeat',
                minHeight: '680px'
            }}
        >
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row-reverse lg:items-center lg:justify-end lg:py-24 lg:px-8">
                <div className="lg:w-1/2 lg:pr-0 lg:absolute lg:top-24 lg:right-12 lg:max-w-lg">
                    <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/85">Saree Fabrics</p>
                    <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        That define grace
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
                        We bring authentic Indian fashion to your wardrobe with handcrafted sarees, bold prints, and premium fabrics made for every celebration.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                        <a href="/collections" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/30 transition hover:bg-slate-900">
                            Shop now
                        </a>
                        <a href="/bestSellers" className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-semibold text-white/90 transition hover:border-white/60 hover:bg-white/15">
                            Explore best sellers
                        </a>
                    </div>
                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-3xl bg-white/10 px-5 py-6 text-center backdrop-blur-sm">
                            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Quality</p>
                            <p className="mt-4 text-base font-semibold text-white">Handcrafted with care</p>
                        </div>
                        <div className="rounded-3xl bg-white/10 px-5 py-6 text-center backdrop-blur-sm">
                            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Selection</p>
                            <p className="mt-4 text-base font-semibold text-white">Wide range of styles</p>
                        </div>
                        <div className="rounded-3xl bg-white/10 px-5 py-6 text-center backdrop-blur-sm">
                            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Returns</p>
                            <p className="mt-4 text-base font-semibold text-white">Hassle-free exchanges</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}