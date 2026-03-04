"use client";

export default function AboutSection() {
  return (
    <section id="about" className="manga-reveal opacity-0 translate-y-12 transition-all duration-700">
      <div className="inline-block border-4 border-black bg-black text-white px-8 py-3 mb-8 transform -skew-x-12 shadow-[6px_6px_0_0_hsl(var(--manga-red))]">
        <h2 className="font-manga-title text-4xl sm:text-5xl uppercase font-black transform skew-x-12">The Quest</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4 border-4 border-black bg-black text-white p-6 transform -rotate-2 z-10 shadow-[8px_8px_0_0_hsl(var(--manga-red))]">
          <h3 className="font-manga-title text-5xl uppercase leading-none mb-4">About<br />TechBlitz</h3>
          <div className="text-4xl action-text-red">START!</div>
        </div>

        <div className="md:col-span-8 border-4 border-black bg-white p-8 manga-panel relative">
          <div className="absolute top-4 right-4 manga-speech-bubble manga-speech-bubble-right hidden sm:block">
            &quot;Will you enter the battlefield?&quot;
          </div>

          <p className="text-lg font-bold leading-relaxed mb-6 mt-12 sm:mt-16">
            TechBlitz 2026 is a high-voltage, manga-themed tech competition organized by VCET NSDC.
            Assemble your squad, pick your domain, and battle it out with the brightest minds across campuses.
            Whether you code, design, or innovate — this is your arena.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-bold text-lg">
            <div className="border-2 border-black p-4 text-center hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all">
              <div className="text-4xl mb-2">📅</div>
              <div className="border-b-2 border-black mb-2 uppercase">Date</div>
              <div className="font-manga-marker text-2xl text-[hsl(var(--manga-red))]">13th March</div>
            </div>
            <div className="border-2 border-black p-4 text-center hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all">
              <div className="text-4xl mb-2">👥</div>
              <div className="border-b-2 border-black mb-2 uppercase">Team</div>
              <div className="font-manga-marker text-2xl">2-3 Members</div>
            </div>
            <div className="border-2 border-black p-4 text-center bg-black text-white hover:-translate-y-1 hover:shadow-[4px_4px_0_0_hsl(var(--manga-red))] transition-all">
              <div className="text-4xl mb-2">🏆</div>
              <div className="border-b-2 border-white mb-2 uppercase">Rewards</div>
              <div className="font-bold">Glory &amp; Prizes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
