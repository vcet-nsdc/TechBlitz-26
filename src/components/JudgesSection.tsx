"use client";

import Image from "next/image";

export default function JudgesSection() {
  return (
    <section id="judges" className="mt-16 manga-reveal opacity-0 translate-y-12 transition-all duration-700">
      <div className="inline-block border-4 border-black bg-white px-8 py-3 mb-8 transform -skew-x-12 shadow-[6px_6px_0_0_black]">
        <h2 className="font-manga-title text-4xl sm:text-5xl uppercase font-black transform skew-x-12">The Elders</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Judges Image Panel */}
        <div className="border-4 border-black bg-black p-3 text-white manga-panel relative shadow-[8px_8px_0_0_black]">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-black px-8 py-2 border-4 border-black font-manga-title text-3xl uppercase tracking-widest z-10 whitespace-nowrap">
            Judges
          </div>

          <div className="mt-8 border-4 border-white relative aspect-[4/3] overflow-hidden group">
            <Image src="/images/judges.png" alt="Judges" fill className="object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 manga-speech-bubble text-black shadow-none border-2 border-white max-w-[200px]">
              &quot;The Elders await your creation.&quot;
            </div>
            <div className="absolute bottom-4 right-4 action-text text-5xl text-white opacity-80">GLARE...</div>
          </div>
        </div>

        {/* Mentors Info */}
        <div className="border-4 border-black bg-white p-3 manga-panel">
          <div className="border-2 border-black bg-black text-white p-4 text-center mb-4">
            <h3 className="font-manga-title text-3xl uppercase tracking-widest">Mentors</h3>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-black p-5 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-black text-white flex items-center justify-center font-manga-title text-2xl border-2 border-black">🧙</div>
                <div>
                  <h4 className="font-manga-title text-xl uppercase">Industry Experts</h4>
                  <p className="text-sm font-bold text-gray-600 uppercase">From top tech companies</p>
                </div>
              </div>
              <p className="font-bold text-sm uppercase tracking-wider">Get guidance from seasoned professionals during mentor rounds.</p>
            </div>

            <div className="border-2 border-black p-5 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-[hsl(var(--manga-red))] text-white flex items-center justify-center font-manga-title text-2xl border-2 border-black">👨‍🏫</div>
                <div>
                  <h4 className="font-manga-title text-xl uppercase">Faculty Advisors</h4>
                  <p className="text-sm font-bold text-gray-600 uppercase">VCET Department Heads</p>
                </div>
              </div>
              <p className="font-bold text-sm uppercase tracking-wider">Academic mentors ensuring your solutions are technically sound.</p>
            </div>

            <div className="border-2 border-black p-5 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_hsl(var(--manga-red))] transition-all bg-black text-white">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-white text-black flex items-center justify-center font-manga-title text-2xl border-2 border-white">🎓</div>
                <div>
                  <h4 className="font-manga-title text-xl uppercase">Alumni Network</h4>
                  <p className="text-sm font-bold text-gray-400 uppercase">Successful past participants</p>
                </div>
              </div>
              <p className="font-bold text-sm uppercase tracking-wider">Past champions return to guide the next generation of warriors.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
