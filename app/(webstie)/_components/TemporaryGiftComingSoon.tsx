import Link from "next/link";
import { ArrowDown, Gift, Sparkles } from "lucide-react";

/** Temporary homepage announcement. Remove this component and its single page import/render when products are available. */
export default function TemporaryGiftComingSoon() {
  return (
    <section
      aria-labelledby="coming-soon-title"
      className="relative isolate overflow-hidden border-b border-[#ead9bd] bg-[radial-gradient(ellipse_at_top_left,_#fff8e9_0%,_#f8efe1_44%,_#f3e6d8_100%)] px-5 py-9 sm:px-8 sm:py-12 lg:py-14"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-24 h-64 w-64 rounded-full bg-[#e8c7a7]/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-[#d8b4bd]/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
        <div className="order-2 text-center md:order-1 md:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d7bd98] bg-white/65 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#76523e] shadow-sm shadow-[#76523e]/5">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-[#ad7b39]" />
            A little something is on its way
          </div>
          <h1 id="coming-soon-title" className="mx-auto max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight text-[#392a29] sm:text-4xl lg:text-5xl md:mx-0">
            Beautiful finds, <span className="italic text-[#8b4d5b]">coming soon.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#685753] sm:text-base sm:leading-7 md:mx-0">
            We’re carefully curating something special for you. ManMohey’s collection is being wrapped up now—our products will be here soon.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link
              href="#newsletter-email"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#713c49] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#713c49]/15 transition hover:-translate-y-0.5 hover:bg-[#5e303c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#713c49] focus-visible:ring-offset-2"
            >
              Stay in the loop
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </Link>
            <span className="text-xs font-medium tracking-wide text-[#806d64]">Subscribe for a note when we open</span>
          </div>
        </div>

        <div aria-hidden="true" className="order-1 mx-auto flex h-40 w-40 items-center justify-center md:order-2 md:h-52 md:w-52">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-[1.75rem] border border-white/80 bg-white/45 shadow-[0_18px_55px_-25px_rgba(91,50,46,0.42)] backdrop-blur-sm sm:h-36 sm:w-36 md:h-44 md:w-44">
            <Sparkles className="absolute -right-3 top-2 h-6 w-6 text-[#b3884f]" strokeWidth={1.4} />
            <Sparkles className="absolute -left-3 bottom-4 h-4 w-4 text-[#8b4d5b]" strokeWidth={1.5} />
            <div className="absolute bottom-5 h-[4.4rem] w-[5.4rem] rounded-b-lg bg-gradient-to-br from-[#9d5965] to-[#703d4b] shadow-md shadow-[#542a35]/20 md:bottom-6 md:h-20 md:w-24">
              <div className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-[#d5b276] shadow-sm md:w-4" />
              <div className="absolute -top-4 left-1/2 h-5 w-[6.3rem] -translate-x-1/2 rounded-sm bg-gradient-to-r from-[#a86570] via-[#bd7780] to-[#8b4b59] md:-top-5 md:h-6 md:w-28" />
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 text-[#d5b276] md:-top-11">
                <Gift className="h-9 w-9 drop-shadow-sm md:h-11 md:w-11" strokeWidth={1.55} />
              </div>
            </div>
            <span className="absolute bottom-2 rounded-full bg-[#fff9ee]/90 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[#76523e] md:bottom-3">
              Wrapped with love
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
