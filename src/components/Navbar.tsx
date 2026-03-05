"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black p-4 flex justify-between items-center shadow-[0_4px_0_0_black]">
      <div className="font-manga-title text-3xl font-black tracking-tighter uppercase">
        Tech<span className="text-[hsl(var(--manga-red))]">Blitz</span>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-6 font-bold uppercase tracking-wider text-sm">
        <a href="#about" className="hover:text-[hsl(var(--manga-red))] transition-colors">About</a>
        <a href="#tracks" className="hover:text-[hsl(var(--manga-red))] transition-colors">Tracks</a>
        <a href="#timeline" className="hover:text-[hsl(var(--manga-red))] transition-colors">Schedule</a>
        <a href="#prizes" className="hover:text-[hsl(var(--manga-red))] transition-colors">Prizes</a>
        <a href="#judges" className="hover:text-[hsl(var(--manga-red))] transition-colors">Judges</a>
        <a href="#faq" className="hover:text-[hsl(var(--manga-red))] transition-colors">FAQ</a>
        <a href="#contact" className="hover:text-[hsl(var(--manga-red))] transition-colors">Contact</a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-black transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-black transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-black transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      <a
        href="http://vcet-nsdc.vercel.app/register"
        className="hidden md:block bg-black text-white px-6 py-2 font-bold uppercase tracking-wider hover:bg-[hsl(var(--manga-red))] transition-colors border-2 border-transparent hover:border-black transform hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black]"
      >
        Register
      </a>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b-4 border-black flex flex-col items-center gap-4 py-6 font-bold uppercase tracking-wider text-sm md:hidden shadow-[0_4px_0_0_black]">
          <a href="#about" onClick={() => setMobileOpen(false)} className="hover:text-[hsl(var(--manga-red))] transition-colors">About</a>
          <a href="#tracks" onClick={() => setMobileOpen(false)} className="hover:text-[hsl(var(--manga-red))] transition-colors">Tracks</a>
          <a href="#timeline" onClick={() => setMobileOpen(false)} className="hover:text-[hsl(var(--manga-red))] transition-colors">Schedule</a>
          <a href="#prizes" onClick={() => setMobileOpen(false)} className="hover:text-[hsl(var(--manga-red))] transition-colors">Prizes</a>
          <a href="#judges" onClick={() => setMobileOpen(false)} className="hover:text-[hsl(var(--manga-red))] transition-colors">Judges</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="hover:text-[hsl(var(--manga-red))] transition-colors">FAQ</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="hover:text-[hsl(var(--manga-red))] transition-colors">Contact</a>
          <a
            href="http://vcet-nsdc.vercel.app/register"
            onClick={() => setMobileOpen(false)}
            className="bg-black text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-[hsl(var(--manga-red))] transition-colors mt-2"
          >
            Register
          </a>
        </div>
      )}
    </nav>
  );
}
