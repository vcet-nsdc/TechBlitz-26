"use client";

export default function RulesSection() {
  return (
    <section id="rules" className="mt-16 manga-reveal opacity-0 translate-y-12 transition-all duration-700">
      <div className="border-4 border-black bg-white p-2 manga-panel">
        <div className="border-2 border-black p-8 relative overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiAvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iI2VlZSIgc3Ryb2tlLXdpZHRoPSIxIiAvPgo8L3N2Zz4=')]">

          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <div className="md:w-1/3 flex flex-col justify-center items-center text-center p-6 border-4 border-black bg-black text-white transform -rotate-1 shadow-[8px_8px_0_0_hsl(var(--manga-red))]">
              <h2 className="font-manga-title text-6xl uppercase tracking-tighter leading-none mb-4">How It<br />Works</h2>
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

              <div className="bg-white border-4 border-black p-6 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all">
                <h3 className="text-2xl border-b-4 border-black pb-2 mb-4 font-black">Submission</h3>
                <ul className="space-y-2 list-disc list-inside ml-4 text-sm">
                  <li>Code pushed to GitHub</li>
                  <li>5-min pitch presentation</li>
                  <li>Working demo required</li>
                </ul>
              </div>

              <div className="bg-white border-4 border-black p-6 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all">
                <h3 className="text-2xl border-b-4 border-black pb-2 mb-4 font-black">Judging</h3>
                <ul className="space-y-2 list-disc list-inside ml-4 text-sm">
                  <li>Innovation &amp; creativity</li>
                  <li>Technical implementation</li>
                  <li>Impact &amp; presentation</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
