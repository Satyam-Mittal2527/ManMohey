"use client"

import { Get_Home_page_Hero } from "@/lib/api"
import { useEffect, useState, useRef } from "react";

export default function Hero() {
    const [heroImageList, setheroImageList] = useState<string[]>([]);
    const [ImageLink, setImageLink] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const autoRef = useRef<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const slideInterval = 4000; // ms

    useEffect(() => {
        const fetchHeroData = async () => {
            setIsLoading(true);
            setLoadError(null);
            try {
                const data = await Get_Home_page_Hero();
                if (!data) {
                    setLoadError("Unable to load hero banner.");
                    return;
                }

                const images = Array.isArray(data.images) ? data.images : [];
                const imgs = images.map((img: any) => img.image_url).filter(Boolean);
                const links = images.map((img: any) => img.button_link || "#");

                setheroImageList(imgs);
                setImageLink(links);
                if (imgs.length === 0) {
                    setLoadError("No hero images available.");
                }
            } catch (error) {
                console.error("Hero fetch failed", error);
                setLoadError("Failed to fetch hero banner.");
            } finally {
                setIsLoading(false);
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
        if (heroImageList.length === 0) {
            setCurrentIndex(0);
        } else if (currentIndex >= heroImageList.length) {
            setCurrentIndex(0);
        }
    }, [heroImageList, currentIndex]);

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

    console.log("ImageLink", ImageLink);
    return (
        <>
            <div
                className="slider-container relative w-full overflow-hidden bg-cover text-white"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {isLoading ? (
                    <div className="flex aspect-[16/7] w-full items-center justify-center bg-slate-200 text-slate-700">
                        <div className="flex flex-col items-center gap-3">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                            <p className="text-sm font-medium">Loading banner...</p>
                        </div>
                    </div>
                ) : loadError ? (
                    <div className="flex aspect-[16/7] w-full items-center justify-center bg-slate-200 text-slate-700">
                        <p className="text-sm font-medium">{loadError}</p>
                    </div>
                ) : (
                    <>
                        <div ref={trackRef} className="slider-track flex w-full">
                            {heroImageList.length > 0 ? (
                                heroImageList.map((img, i) => (
                                    <a
                                        href={ImageLink[i] ?? '#'}
                                        key={i}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block min-w-full"
                                    >
                                        <div
                                            className="
                                    slide
                                    aspect-[16/7]
                                    w-full
                                    bg-center
                                    bg-cover
                                    bg-no-repeat
                                "
                                            style={{
                                                backgroundImage: `url(${img})`,
                                            }}
                                        />
                                    </a>
                                ))
                            ) : (
                                <div className="slide aspect-[16/7] min-w-full bg-gray-200" />
                            )}
                        </div>

                        {/* arrows */}
                        ...
                    </>
                )}
            </div>
        </>
    )
}