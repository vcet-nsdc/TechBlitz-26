"use client";

export default function RegistrationCta() {
  return (
    <section id="register" className="mt-16 mb-24 manga-reveal opacity-0 translate-y-12 transition-all duration-700">
      <div className="border-8 border-black bg-black text-white p-2 text-center relative overflow-hidden group">
        <div className="absolute inset-0 speed-lines-vertical opacity-30 pointer-events-none"></div>

        <div className="border-4 border-white p-12 sm:p-20 relative z-10 flex flex-col items-center justify-center">
          <h2 className="font-manga-title text-6xl sm:text-8xl md:text-9xl font-black uppercase leading-none tracking-tighter mb-6 group-hover:scale-105 transition-transform duration-500">
            Form Your <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Team</span>
          </h2>
          <p className="font-manga-marker text-2xl sm:text-4xl mb-12 text-[hsl(var(--manga-red))]">ENTER TECHBLITZ 2026</p>

          <a href="http://vcet-nsdc.vercel.app/register" className="relative overflow-hidden bg-[hsl(var(--manga-red))] text-white font-black text-3xl sm:text-5xl uppercase px-12 py-6 border-4 border-white hover:bg-white hover:text-black transition-colors transform hover:-translate-y-2 hover:shadow-[8px_8px_0_0_white] inline-block">
            <span className="relative z-10">Register Now</span>
            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-100 transition-opacity z-0"></div>
          </a>
        </div>

        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 hidden lg:block">
          <div className="action-text text-6xl text-white transform -rotate-90">BOOM!</div>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 hidden lg:block">
          <div className="action-text text-6xl text-white transform rotate-90">BOOM!</div>
        </div>
      </div>
    </section>
  );
}
