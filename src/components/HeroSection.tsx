"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full border-8 border-black manga-panel overflow-hidden bg-white p-2 sm:p-4 mb-10">
      <div className="absolute inset-0 speed-lines opacity-20 pointer-events-none"></div>

      {/* Header Panel */}
      <div className="border-4 border-black bg-white p-4 mb-4 text-center relative z-10">
        <h2 className="font-bold text-xl uppercase tracking-widest mb-2">VCET NSDC Presents</h2>
        <h1 className="font-manga-title text-6xl sm:text-8xl md:text-9xl font-black uppercase leading-none tracking-tighter mb-2">
          Tech<span className="text-[hsl(var(--manga-red))] drop-shadow-[4px_4px_0_black]">Blitz</span> 2026
        </h1>
        <p className="font-manga-marker text-2xl sm:text-3xl mt-4 border-t-4 border-black pt-4">CODE. DESIGN. TRANSFORM.</p>
      </div>

      <div className="relative w-full aspect-video border-4 border-black bg-black overflow-hidden group">
        <Image
          src="/images/hero.png"
          alt="TechBlitz Battlefield"
          fill
          className="object-cover grayscale contrast-125 brightness-110 group-hover:scale-105 transition-transform duration-700"
          priority
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <span className="action-text text-8xl opacity-80">revolution!</span>
        </div>
      </div>

      <div className="mt-4 p-6 border-4 border-black bg-black text-white text-center">
        <p className="font-manga-title text-3xl sm:text-4xl uppercase tracking-wider mb-6">
          &quot;Innovation is your weapon <span className="text-[hsl(var(--manga-red))]">—</span> Use it wisely.&quot;
        </p>
        <a
          href="http://vcet-nsdc.vercel.app/register"
          className="inline-block bg-[hsl(var(--manga-red))] text-white text-2xl font-black uppercase px-10 py-4 border-4 border-white hover:bg-white hover:text-black hover:border-[hsl(var(--manga-red))] transition-all transform hover:scale-105"
        >
          [ Registrations Opening Soon ]
        </a>
      </div>
    </section>
  );
}
