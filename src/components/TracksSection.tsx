"use client";

import Image from "next/image";

export default function TracksSection() {
  return (
    <section id="tracks" className="mt-12">
      <div className="inline-block border-4 border-black bg-white px-8 py-3 mb-8 transform -skew-x-12 shadow-[6px_6px_0_0_black]">
        <h2 className="font-manga-title text-4xl sm:text-5xl uppercase font-black transform skew-x-12">Quests &amp; Domains</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Domain 1 */}
        <div className="manga-reveal opacity-0 translate-y-12 transition-all duration-700 delay-100 flex flex-col border-4 border-black bg-white p-2 manga-panel group">
          <div className="border-2 border-black bg-black text-white p-3 text-center mb-2">
            <h3 className="font-manga-title text-2xl uppercase tracking-widest">Agentic AI</h3>
          </div>
          <div className="relative aspect-square border-2 border-black overflow-hidden mb-4">
            <Image src="/images/ai-domain.png" alt="AI Domain" fill className="object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 speed-lines opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 action-text text-4xl text-white">BZZZT!</div>
          </div>
          <div className="p-4 border-t-2 border-dashed border-black flex-grow">
            <p className="font-bold text-lg leading-tight uppercase">Build intelligent AI agents that can plan, reason, and execute tasks autonomously.</p>
          </div>
        </div>

        {/* Domain 2 */}
        <div className="manga-reveal opacity-0 translate-y-12 transition-all duration-700 delay-200 flex flex-col border-4 border-black bg-white p-2 manga-panel group relative top-0 lg:top-8">
          <div className="border-2 border-black bg-black text-white p-3 text-center mb-2">
            <h3 className="font-manga-title text-2xl uppercase tracking-widest">Vibeathon</h3>
          </div>
          <div className="relative aspect-square border-2 border-black overflow-hidden mb-4">
            <Image src="/images/vibeathon.png" alt="Vibeathon Domain" fill className="object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-2 left-2 action-text text-5xl text-white">ZOOM!</div>
          </div>
          <div className="p-4 border-t-2 border-dashed border-black flex-grow">
            <p className="font-bold text-lg leading-tight uppercase">Innovate, experiment, and build creative tech solutions with speed and impact.</p>
          </div>
        </div>

        {/* Domain 3 */}
        <div className="manga-reveal opacity-0 translate-y-12 transition-all duration-700 delay-300 flex flex-col border-4 border-black bg-white p-2 manga-panel group relative top-0 lg:top-16">
          <div className="border-2 border-black bg-black text-white p-3 text-center mb-2">
            <h3 className="font-manga-title text-2xl uppercase tracking-widest">UI/UX Challenge</h3>
          </div>
          <div className="relative aspect-square border-2 border-black overflow-hidden mb-4">
            <Image src="/images/uiux.png" alt="UI/UX Domain" fill className="object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,black_49%,black_51%,transparent_52%)] bg-[length:10px_10px] opacity-10"></div>
            <div className="absolute bottom-4 left-4 action-text text-4xl text-white">SHING!</div>
          </div>
          <div className="p-4 border-t-2 border-dashed border-black flex-grow">
            <p className="font-bold text-lg leading-tight uppercase">Design intuitive, user-centered experiences with strong creativity and usability focus.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
