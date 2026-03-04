"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  // Add scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-12");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".manga-reveal").forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-white text-black font-sans pb-20 halftone-bg">
      {/* Navigation - Comic style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black p-4 flex justify-between items-center shadow-[0_4px_0_0_black]">
        <div className="font-manga-title text-3xl font-black tracking-tighter uppercase">
          Tech<span className="text-[hsl(var(--manga-red))]">Blitz</span>
        </div>
        <div className="hidden md:flex gap-6 font-bold uppercase tracking-wider text-sm">
          <a href="#quest" className="hover:text-[hsl(var(--manga-red))] transition-colors">The Quest</a>
          <a href="#domains" className="hover:text-[hsl(var(--manga-red))] transition-colors">Domains</a>
          <a href="#prizes" className="hover:text-[hsl(var(--manga-red))] transition-colors">Glory</a>
          <a href="#rules" className="hover:text-[hsl(var(--manga-red))] transition-colors">Rules</a>
        </div>
        <button className="bg-black text-white px-6 py-2 font-bold uppercase tracking-wider hover:bg-[hsl(var(--manga-red))] transition-colors border-2 border-transparent hover:border-black transform hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black]">
          Register
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 flex flex-col gap-12">
        
        {/* HERO SECTION */}
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
            
            {/* Floating text bubbles */}
            {/* <div className="absolute top-10 left-10 manga-speech-bubble transform -rotate-6 hidden md:block">
              <span className="font-bold text-lg">Bigger challenges!</span>
            </div>
            
            <div className="absolute bottom-10 left-10 manga-speech-bubble transform rotate-3 hidden sm:block">
              <span className="font-bold text-lg">Smarter AI!</span>
            </div>
            
            <div className="absolute top-1/3 right-10 manga-speech-bubble manga-speech-bubble-right transform rotate-6 hidden md:block">
              <span className="font-bold text-lg">Higher competition!</span>
            </div> */}
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <span className="action-text text-8xl opacity-80">reveloution!</span>
            </div>
          </div>

          <div className="mt-4 p-6 border-4 border-black bg-black text-white text-center">
            <p className="font-manga-title text-3xl sm:text-4xl uppercase tracking-wider mb-6">
              &quot;Innovation is your weapon <span className="text-[hsl(var(--manga-red))]">—</span> Use it wisely.&quot;
            </p>
            <button className="bg-[hsl(var(--manga-red))] text-white text-2xl font-black uppercase px-10 py-4 border-4 border-white hover:bg-white hover:text-black hover:border-[hsl(var(--manga-red))] transition-all transform hover:scale-105">
              [ Registrations Opening Soon ]
            </button>
          </div>
        </section>

        {/* SECTION 1: THE QUEST */}
        <section id="quest" className="manga-reveal opacity-0 translate-y-12 transition-all duration-700 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4 border-4 border-black bg-black text-white p-6 transform -rotate-2 z-10 shadow-[8px_8px_0_0_hsl(var(--manga-red))]">
            <h2 className="font-manga-title text-6xl uppercase leading-none">The<br/>Quest</h2>
            <div className="mt-4 text-4xl action-text-red">START!</div>
          </div>
          
          <div className="md:col-span-8 border-4 border-black bg-white p-8 manga-panel relative">
            <div className="absolute top-4 right-4 manga-speech-bubble manga-speech-bubble-right">
              &quot;Will you enter the battlefield?&quot;
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 font-bold text-lg">
              <div className="border-2 border-black p-4 text-center">
                <div className="text-4xl mb-2">📅</div>
                <div className="border-b-2 border-black mb-2 uppercase">Date</div>
                <div className="font-manga-marker text-2xl text-[hsl(var(--manga-red))]">13th March</div>
              </div>
              <div className="border-2 border-black p-4 text-center">
                <div className="text-4xl mb-2">👥</div>
                <div className="border-b-2 border-black mb-2 uppercase">Team</div>
                <div className="font-manga-marker text-2xl">2-3 Members</div>
              </div>
              <div className="border-2 border-black p-4 text-center bg-black text-white">
                <div className="text-4xl mb-2">🏆</div>
                <div className="border-b-2 border-white mb-2 uppercase">Rewards</div>
                <div className="font-bold">Glory &amp; Prizes</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: COMPETITION DOMAINS */}
        <section id="domains" className="mt-12">
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

        {/* SECTION 3: PRIZES & GLORY + SECTION 4: THE ELDERS */}
        <section id="prizes" className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Prizes */}
          <div className="manga-reveal opacity-0 translate-y-12 transition-all duration-700 border-4 border-black bg-white p-3 manga-panel relative">
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

          {/* Judges */}
          <div className="manga-reveal opacity-0 translate-y-12 transition-all duration-700 delay-200 border-4 border-black bg-black p-3 text-white manga-panel relative shadow-[8px_8px_0_0_black]">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-black px-8 py-2 border-4 border-black font-manga-title text-3xl uppercase tracking-widest z-10 whitespace-nowrap">
              The Elders
            </div>
            
            <div className="mt-8 border-4 border-white relative aspect-[4/3] overflow-hidden group">
              <Image src="/images/judges.png" alt="Judges" fill className="object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 manga-speech-bubble text-black shadow-none border-2 border-white max-w-[200px]">
                &quot;The Elders await your creation.&quot;
              </div>
              <div className="absolute bottom-4 right-4 action-text text-5xl text-white opacity-80">GLARE...</div>
            </div>
          </div>
        </section>

        {/* SECTION 5: RULES & FAQ */}
        <section id="rules" className="mt-16 manga-reveal opacity-0 translate-y-12 transition-all duration-700">
          <div className="border-4 border-black bg-white p-2 manga-panel">
            <div className="border-2 border-black p-8 relative overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiAvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iI2VlZSIgc3Ryb2tlLXdpZHRoPSIxIiAvPgo8L3N2Zz4=')]">
              
              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <div className="md:w-1/3 flex flex-col justify-center items-center text-center p-6 border-4 border-black bg-black text-white transform -rotate-1 shadow-[8px_8px_0_0_hsl(var(--manga-red))]">
                  <h2 className="font-manga-title text-6xl uppercase tracking-tighter leading-none mb-4">Rules<br/>&amp; FAQ</h2>
                  <div className="text-8xl">📜</div>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 font-bold uppercase tracking-wider">
                  <div className="bg-white border-4 border-black p-6 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all">
                    <h3 className="text-2xl border-b-4 border-black pb-2 mb-4 font-black">Eligibility</h3>
                    <ul className="space-y-2 list-disc list-inside ml-4 text-sm">
                      <li>Open to all college students</li>
                      <li>Valid student ID required</li>
                      <li>Cross-college teams allowed</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white border-4 border-black p-6 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all">
                    <h3 className="text-2xl border-b-4 border-black pb-2 mb-4 font-black">Team Rules</h3>
                    <ul className="space-y-2 list-disc list-inside ml-4 text-sm">
                      <li>2 to 3 members per team</li>
                      <li>One team leader mandatory</li>
                      <li>Can only participate in one track</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white border-4 border-black p-6 sm:col-span-2 flex justify-between items-center hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all">
                    <div>
                      <h3 className="text-2xl font-black mb-1">More Questions?</h3>
                      <p className="text-sm">Read the full forbidden scroll of guidelines.</p>
                    </div>
                    <div className="text-5xl font-manga-marker text-[hsl(var(--manga-red))]">?</div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="mt-16 mb-24 manga-reveal opacity-0 translate-y-12 transition-all duration-700">
          <div className="border-8 border-black bg-black text-white p-2 text-center relative overflow-hidden group">
            <div className="absolute inset-0 speed-lines-vertical opacity-30 pointer-events-none"></div>
            
            <div className="border-4 border-white p-12 sm:p-20 relative z-10 flex flex-col items-center justify-center">
              <h2 className="font-manga-title text-6xl sm:text-8xl md:text-9xl font-black uppercase leading-none tracking-tighter mb-6 group-hover:scale-105 transition-transform duration-500">
                Form Your <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Team</span>
              </h2>
              <p className="font-manga-marker text-2xl sm:text-4xl mb-12 text-[hsl(var(--manga-red))]">ENTER TECHBLITZ 2026</p>
              
              <button className="relative overflow-hidden bg-[hsl(var(--manga-red))] text-white font-black text-3xl sm:text-5xl uppercase px-12 py-6 border-4 border-white hover:bg-white hover:text-black transition-colors transform hover:-translate-y-2 hover:shadow-[8px_8px_0_0_white]">
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-100 transition-opacity z-0"></div>
              </button>
            </div>
            
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 hidden lg:block">
              <div className="action-text text-6xl text-white transform -rotate-90">BOOM!</div>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 hidden lg:block">
              <div className="action-text text-6xl text-white transform rotate-90">BOOM!</div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t-4 border-black bg-white p-8 text-center font-bold uppercase tracking-widest text-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-black speed-lines"></div>
        <p>Vol 1: The Curse of the Algorithm © 2026 VCET NSDC</p>
        <p className="text-xs mt-2 text-gray-500">Read from top to bottom</p>
      </footer>
    </div>
  );
}
