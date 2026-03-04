"use client";

export default function GallerySection() {
  const pastHighlights = [
    { title: "TechBlitz 2025", desc: "200+ participants, 60 teams, 3 tracks", icon: "🏅" },
    { title: "TechBlitz 2024", desc: "First edition — 120 participants", icon: "⭐" },
    { title: "Hackathon Highlights", desc: "Late-night coding, epic pitches, roaring crowds", icon: "🔥" },
    { title: "Community Impact", desc: "5 projects got startup funding post-event", icon: "💡" },
  ];

  return (
    <section id="gallery" className="mt-16 manga-reveal opacity-0 translate-y-12 transition-all duration-700">
      <div className="inline-block border-4 border-black bg-white px-8 py-3 mb-8 transform -skew-x-12 shadow-[6px_6px_0_0_black]">
        <h2 className="font-manga-title text-4xl sm:text-5xl uppercase font-black transform skew-x-12">Past Sagas</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pastHighlights.map((item, i) => (
          <div
            key={i}
            className="border-4 border-black p-6 manga-panel group relative overflow-hidden"
          >
            <div className="absolute inset-0 speed-lines opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="text-5xl shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-manga-title text-2xl uppercase font-black mb-2">{item.title}</h3>
                <p className="font-bold text-sm uppercase tracking-wider text-gray-600">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-4 border-black bg-black text-white p-6 text-center manga-panel">
        <p className="font-manga-marker text-xl sm:text-2xl">
          &quot;Each edition bigger than the last — will you be part of the legend?&quot;
        </p>
      </div>
    </section>
  );
}
