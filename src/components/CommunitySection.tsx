"use client";

export default function CommunitySection() {
  const socials = [
    { name: "Discord", emoji: "💬", link: "#", desc: "Join the warrior chat" },
    { name: "Instagram", emoji: "📸", link: "#", desc: "@techblitz.vcet" },
    { name: "Twitter / X", emoji: "🐦", link: "#", desc: "@TechBlitzVCET" },
    { name: "LinkedIn", emoji: "💼", link: "#", desc: "VCET NSDC" },
  ];

  return (
    <section id="contact" className="mt-16 manga-reveal opacity-0 translate-y-12 transition-all duration-700">
      <div className="inline-block border-4 border-black bg-black text-white px-8 py-3 mb-8 transform -skew-x-12 shadow-[6px_6px_0_0_hsl(var(--manga-red))]">
        <h2 className="font-manga-title text-4xl sm:text-5xl uppercase font-black transform skew-x-12">Join The Guild</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Social Links */}
        <div className="border-4 border-black bg-white p-6 manga-panel">
          <div className="border-2 border-black bg-black text-white p-3 text-center mb-4">
            <h3 className="font-manga-title text-2xl uppercase tracking-widest">Connect With Us</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.link}
                className="border-2 border-black p-4 text-center hover:-translate-y-2 hover:shadow-[4px_4px_0_0_hsl(var(--manga-red))] transition-all block"
              >
                <div className="text-4xl mb-2">{social.emoji}</div>
                <div className="font-manga-title text-lg uppercase">{social.name}</div>
                <div className="font-bold text-xs text-gray-500 uppercase tracking-wider mt-1">{social.desc}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-4 border-black bg-white p-6 manga-panel">
          <div className="border-2 border-black bg-black text-white p-3 text-center mb-4">
            <h3 className="font-manga-title text-2xl uppercase tracking-widest">Contact HQ</h3>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-black p-4 flex items-start gap-4">
              <span className="text-3xl shrink-0">📧</span>
              <div>
                <div className="font-manga-title text-lg uppercase">Email</div>
                <div className="font-bold text-sm">techblitz@vcet.edu</div>
              </div>
            </div>
            <div className="border-2 border-black p-4 flex items-start gap-4">
              <span className="text-3xl shrink-0">📍</span>
              <div>
                <div className="font-manga-title text-lg uppercase">Venue</div>
                <div className="font-bold text-sm">VCET Auditorium, Vasai (W), Mumbai</div>
              </div>
            </div>
            <div className="border-2 border-black p-4 flex items-start gap-4">
              <span className="text-3xl shrink-0">📞</span>
              <div>
                <div className="font-manga-title text-lg uppercase">Helpline</div>
                <div className="font-bold text-sm">+91 98765 43210</div>
              </div>
            </div>
          </div>

          <div className="mt-4 border-2 border-dashed border-black p-4 text-center bg-gray-50">
            <p className="font-manga-marker text-lg text-[hsl(var(--manga-red))]">Responses within 24 hours!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
