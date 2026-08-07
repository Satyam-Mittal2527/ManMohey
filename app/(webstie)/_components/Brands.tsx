"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
const testimonials = [
  {
    name: "Priya Sharma",
    review:
      "The saree I ordered was exactly as shown in the pictures. The fabric quality exceeded my expectations, and the delivery was quick. I'll definitely be shopping from ManMohey again.",
  },
  {
    name: "Anjali Verma",
    review:
      "Beautiful collection and easy ordering experience. The kurti fit perfectly, and the stitching and fabric quality were excellent.",
  },
  {
    name: "Sneha Patel",
    review:
      "I purchased a lehenga for a family wedding and received so many compliments. The craftsmanship and attention to detail were amazing.",
  },
  {
    name: "Riya Gupta",
    review:
      "Customer support was very helpful in answering my sizing questions. My order arrived on time, and the outfit looked even better in person.",
  },
  {
    name: "Meera Nair",
    review:
      "The entire shopping experience was smooth from browsing to delivery. Great quality, affordable pricing, and beautiful ethnic wear.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">


          <h2 className="text-5xl font-bold text-slate-900">
            What Our <span className="text-violet-600">Customers Say</span>
          </h2>
        </div>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-14"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="group flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex flex-col items-center">
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {item.name}
                  </h3>
                  <div className="mt-6 flex-1 rounded-xl bg-slate-50 p-5 transition-all duration-300 group-hover:bg-cyan-500">
                    <p className="text-center text-sm leading-7 text-slate-600 group-hover:text-white">
                      "{item.review}"
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


      </div>
    </section>
  );
}