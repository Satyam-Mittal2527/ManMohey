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
        <section className="overflow-hidden bg-gradient-to-r from-rose-400 via-fuchsia-500 to-orange-400 text-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-24 lg:px-8">
                <div className="lg:w-1/2">
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-slate-950/15 sm:p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_35%)]" />
                        <div className="relative h-[420px] overflow-hidden rounded-[1.75rem] bg-slate-950">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-95"
                                style={{
                                    backgroundImage: `url(${heroImageURL})`
                                }}
                            />
                            <div className="absolute inset-0 bg-slate-950/35" />
                            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                                <p className="text-xs uppercase tracking-[0.35em] text-white/80">Saree Fabrics</p>
                                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Elegance tailored for every occasion</h2>
                                <p className="mt-3 max-w-xs text-sm leading-6 text-white/75">
                                    Discover luxurious sarees designed to bring grace, color, and comfort to your wardrobe.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 lg:pl-12">
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