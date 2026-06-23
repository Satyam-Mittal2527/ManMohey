"use client"

import { Get_Home_page_Hero } from "@/lib/api"
import { useEffect, useState, useRef } from "react";

export default function Hero() {
    const [heroImageList, setheroImageList] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const autoRef = useRef<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const slideInterval = 4000; // ms

    useEffect(() => {
        const fetchHeroData = async () => {
            const data = await Get_Home_page_Hero();
            console.log(data.images)
            if (data && Array.isArray(data.images)) {
                const imgs = data.images.map((s: string) => (s || '').trim()).filter(Boolean);
                setheroImageList(imgs);
            }
        };
        fetchHeroData();
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        track.style.transition = 'transform 600ms ease';
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, [currentIndex]);

    useEffect(() => {
        function start() {
            stop();
            autoRef.current = window.setInterval(() => {
                setCurrentIndex((i) => (heroImageList.length ? (i + 1) % heroImageList.length : 0));
            }, slideInterval);
        }
        function stop() {
            if (autoRef.current) {
                window.clearInterval(autoRef.current);
                autoRef.current = null;
            }
        }

        if (!isPaused && heroImageList.length > 1) start();
        return () => stop();
    }, [isPaused, heroImageList]);
    return (
        <>
            <div
                className="slider-container relative overflow-hidden bg-cover text-white"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div ref={trackRef} className="slider-track flex w-full">
                    {heroImageList.length > 0 ? heroImageList.map((img, i) => (
                        <div
                            key={i}
                            className="slide min-w-full bg-[image:var(--bg)] bg-center bg-cover min-h-[680px]"
                            style={{ ['--bg' as any]: `url(${img})` }}
                        />
                    )) : (
                        <div className="slide min-w-full bg-gray-200 min-h-[680px]" />
                    )}
                </div>

                <button
                    className="prev absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 z-20"
                    onClick={() => {
                        setCurrentIndex((i) => (heroImageList.length ? (i - 1 + heroImageList.length) % heroImageList.length : 0));
                    }}
                    aria-label="Previous"
                >
                    ‹
                </button>
                <button
                    className="next absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 z-20"
                    onClick={() => {
                        setCurrentIndex((i) => (heroImageList.length ? (i + 1) % heroImageList.length : 0));
                    }}
                    aria-label="Next"
                >
                    ›
                </button>

                <div className="indicators absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {heroImageList.map((_, i) => (
                        <button
                            key={i}
                            className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/40'}`}
                            onClick={() => setCurrentIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </>
      
    )
}