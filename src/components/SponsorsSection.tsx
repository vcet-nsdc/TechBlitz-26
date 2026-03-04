"use client";

export default function SponsorsSection() {
  const sponsors = [
    { name: "TechCorp", tier: "Platinum", emoji: "💎" },
    { name: "DevStudio", tier: "Platinum", emoji: "🚀" },
    { name: "CloudBase", tier: "Gold", emoji: "☁️" },
    { name: "CodeLab", tier: "Gold", emoji: "⚡" },
    { name: "DataFlow", tier: "Gold", emoji: "📊" },
    { name: "PixelForge", tier: "Silver", emoji: "🎨" },
    { name: "ByteWorks", tier: "Silver", emoji: "🔧" },
    { name: "NetSphere", tier: "Silver", emoji: "🌐" },
  ];

  return (
    <section id="sponsors" className="mt-16 manga-reveal opacity-0 translate-y-12 transition-all duration-700">
      <div className="inline-block border-4 border-black bg-white px-8 py-3 mb-8 transform -skew-x-12 shadow-[6px_6px_0_0_black]">
        <h2 className="font-manga-title text-4xl sm:text-5xl uppercase font-black transform skew-x-12">Our Allies</h2>
      </div>

      <div className="border-4 border-black bg-white p-6 sm:p-8 manga-panel">
        {/* Platinum */}
        <div className="mb-8">
          <div className="inline-block bg-black text-white px-6 py-2 font-manga-title text-xl uppercase tracking-widest mb-4 shadow-[4px_4px_0_0_hsl(var(--manga-red))]">
            Platinum Sponsors
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sponsors.filter(s => s.tier === "Platinum").map((sponsor) => (
              <div key={sponsor.name} className="border-4 border-black p-6 flex items-center gap-4 hover:-translate-y-2 hover:shadow-[6px_6px_0_0_hsl(var(--manga-red))] transition-all bg-gradient-to-r from-gray-50 to-white">
                <span className="text-5xl">{sponsor.emoji}</span>
                <div>
                  <div className="font-manga-title text-2xl uppercase">{sponsor.name}</div>
                  <div className="font-bold text-xs uppercase tracking-widest text-[hsl(var(--manga-red))]">{sponsor.tier} Partner</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gold */}
        <div className="mb-8">
          <div className="inline-block bg-black text-white px-6 py-2 font-manga-title text-xl uppercase tracking-widest mb-4 shadow-[4px_4px_0_0_black]">
            Gold Sponsors
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {sponsors.filter(s => s.tier === "Gold").map((sponsor) => (
              <div key={sponsor.name} className="border-2 border-black p-5 flex items-center gap-3 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all">
                <span className="text-4xl">{sponsor.emoji}</span>
                <div>
                  <div className="font-manga-title text-xl uppercase">{sponsor.name}</div>
                  <div className="font-bold text-xs uppercase tracking-widest text-gray-500">{sponsor.tier}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Silver */}
        <div>
          <div className="inline-block bg-black text-white px-6 py-2 font-manga-title text-xl uppercase tracking-widest mb-4">
            Silver Sponsors
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {sponsors.filter(s => s.tier === "Silver").map((sponsor) => (
              <div key={sponsor.name} className="border-2 border-dashed border-black p-4 flex items-center gap-3 hover:-translate-y-1 transition-all text-center">
                <span className="text-3xl">{sponsor.emoji}</span>
                <div className="font-manga-title text-lg uppercase">{sponsor.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t-4 border-black pt-6 text-center">
          <p className="font-manga-marker text-xl text-[hsl(var(--manga-red))]">Want to sponsor TechBlitz?</p>
          <p className="font-bold text-sm uppercase tracking-wider mt-2">Reach out at sponsors@techblitz.vcet.edu</p>
        </div>
      </div>
    </section>
  );
}
