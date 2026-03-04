"use client";

import Image from "next/image";

export default function PrizesSection() {
  return (
    <section id="prizes" className="mt-24 manga-reveal opacity-0 translate-y-12 transition-all duration-700">
      <div className="inline-block border-4 border-black bg-white px-8 py-3 mb-8 transform -skew-x-12 shadow-[6px_6px_0_0_black]">
        <h2 className="font-manga-title text-4xl sm:text-5xl uppercase font-black transform skew-x-12">Glory &amp; Rewards</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Prize Pool */}
        <div className="border-4 border-black bg-white p-3 manga-panel relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-8 py-2 border-4 border-white font-manga-title text-3xl uppercase tracking-widest z-10 whitespace-nowrap shadow-[4px_4px_0_0_hsl(var(--manga-red))]">
            Claim Your Glory
          </div>

          <div className="mt-8 border-4 border-black relative aspect-[4/3] overflow-hidden group">
            <Image src="/images/prizes.png" alt="Prizes" fill className="object-cover grayscale contrast-125 brightness-110 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] mix-blend-multiply"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
              <div className="action-text-red text-6xl opacity-90 drop-shadow-[0_0_10px_white]">SHINE!</div>
            </div>
          </div>
        </div>

        {/* Prize Breakdown */}
        <div className="border-4 border-black bg-white p-3 manga-panel">
          <div className="border-2 border-black bg-black text-white p-4 text-center mb-4">
            <h3 className="font-manga-title text-3xl uppercase tracking-widest">Prize Breakdown</h3>
          </div>

          <div className="space-y-4">
            <div className="border-4 border-black p-4 flex items-center gap-4 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_hsl(var(--manga-red))] transition-all bg-gradient-to-r from-yellow-50 to-white">
              <div className="text-5xl">🥇</div>
              <div>
                <div className="font-manga-title text-2xl uppercase">1st Place</div>
                <div className="font-manga-marker text-xl text-[hsl(var(--manga-red))]">₹10,000 + Swag Kit</div>
              </div>
            </div>
            <div className="border-4 border-black p-4 flex items-center gap-4 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all bg-gradient-to-r from-gray-50 to-white">
              <div className="text-5xl">🥈</div>
              <div>
                <div className="font-manga-title text-2xl uppercase">2nd Place</div>
                <div className="font-manga-marker text-xl">₹5,000 + Swag Kit</div>
              </div>
            </div>
            <div className="border-4 border-black p-4 flex items-center gap-4 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all bg-gradient-to-r from-amber-50 to-white">
              <div className="text-5xl">🥉</div>
              <div>
                <div className="font-manga-title text-2xl uppercase">3rd Place</div>
                <div className="font-manga-marker text-xl">₹3,000 + Swag Kit</div>
              </div>
            </div>
            <div className="border-2 border-dashed border-black p-4 text-center">
              <p className="font-bold uppercase tracking-wider">+ Special Category Awards for each Track</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
