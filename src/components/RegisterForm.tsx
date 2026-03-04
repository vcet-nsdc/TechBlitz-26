"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="border-8 border-black bg-white p-8 sm:p-12 text-center manga-panel relative overflow-hidden">
        <div className="absolute inset-0 speed-lines opacity-10 pointer-events-none"></div>
        <div className="text-8xl mb-6 relative z-10">🎉</div>
        <h2 className="font-manga-title text-4xl sm:text-6xl uppercase font-black mb-4 relative z-10">
          Registration <span className="text-[hsl(var(--manga-red))]">Successful!</span>
        </h2>
        <p className="font-bold text-lg uppercase tracking-wider mb-8 relative z-10 max-w-lg mx-auto">
          Welcome to the battlefield. Your team details have been recorded. Check your email for further instructions.
        </p>
        <button
          onClick={() => router.push("/")}
          className="relative z-10 bg-black text-white font-black text-xl uppercase px-8 py-4 border-4 border-black hover:bg-[hsl(var(--manga-red))] transition-colors transform hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black]"
        >
          Return to HQ
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-4 sm:border-8 border-black bg-white p-4 sm:p-8 manga-panel relative">
      <div className="absolute top-4 right-4 manga-speech-bubble manga-speech-bubble-right hidden md:block">
        &quot;Fill this out carefully, warrior!&quot;
      </div>

      <div className="mb-10 text-center border-b-4 border-black pb-8">
        <h2 className="font-manga-title text-4xl sm:text-5xl uppercase font-black mb-2">
          Join the <span className="text-[hsl(var(--manga-red))]">Battle</span>
        </h2>
        <p className="font-bold uppercase tracking-wider text-sm sm:text-base text-gray-600">
          Assemble your squad of 2 to 3 members.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Team Details */}
        <div className="border-4 border-black p-4 sm:p-6 bg-gray-50 relative group">
          <div className="absolute -top-4 left-4 bg-black text-white px-4 py-1 font-manga-title text-xl uppercase tracking-widest border-2 border-black group-hover:-translate-y-1 transition-transform">
            1. Squad Details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <label className="font-manga-title text-xl uppercase block">Squad Name *</label>
              <input
                required
                type="text"
                placeholder="e.g. Byte Brawlers"
                className="w-full border-4 border-black p-3 font-bold uppercase tracking-wider outline-none focus:ring-4 focus:ring-[hsl(var(--manga-red))] transition-all bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="font-manga-title text-xl uppercase block">Domain *</label>
              <select
                required
                className="w-full border-4 border-black p-3 font-bold uppercase tracking-wider outline-none focus:ring-4 focus:ring-[hsl(var(--manga-red))] transition-all bg-white appearance-none cursor-pointer"
              >
                <option value="">-- Choose Your Path --</option>
                <option value="ai">Agentic AI</option>
                <option value="vibeathon">Vibeathon</option>
                <option value="uiux">UI/UX Challenge</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Team Leader */}
        <div className="border-4 border-neutral-900 p-4 sm:p-6 bg-white relative group">
          <div className="absolute -top-4 left-4 bg-[hsl(var(--manga-red))] text-white px-4 py-1 font-manga-title text-xl uppercase tracking-widest border-2 border-black group-hover:-translate-y-1 transition-transform">
            2. The Leader
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-sm block">Full Name *</label>
              <input required type="text" className="w-full border-2 border-black p-2 font-bold outline-none focus:border-[hsl(var(--manga-red))] focus:bg-gray-50 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-sm block">Email Address *</label>
              <input required type="email" className="w-full border-2 border-black p-2 font-bold outline-none focus:border-[hsl(var(--manga-red))] focus:bg-gray-50 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-sm block">Phone Number *</label>
              <input required type="tel" className="w-full border-2 border-black p-2 font-bold outline-none focus:border-[hsl(var(--manga-red))] focus:bg-gray-50 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-sm block">College / Institution *</label>
              <input required type="text" className="w-full border-2 border-black p-2 font-bold outline-none focus:border-[hsl(var(--manga-red))] focus:bg-gray-50 transition-colors" />
            </div>
          </div>
        </div>

        {/* Section 3: Member 2 */}
        <div className="border-4 border-neutral-900 p-4 sm:p-6 bg-white relative group">
          <div className="absolute -top-4 left-4 bg-black text-white px-4 py-1 font-manga-title text-xl uppercase tracking-widest border-2 border-black group-hover:-translate-y-1 transition-transform">
            3. Member Two
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-sm block">Full Name *</label>
              <input required type="text" className="w-full border-2 border-black p-2 font-bold outline-none focus:border-blue-500 focus:bg-gray-50 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-sm block">Email Address *</label>
              <input required type="email" className="w-full border-2 border-black p-2 font-bold outline-none focus:border-blue-500 focus:bg-gray-50 transition-colors" />
            </div>
          </div>
        </div>

        {/* Section 4: Member 3 (Optional) */}
        <div className="border-4 border-neutral-900 p-4 sm:p-6 bg-gray-50 relative group border-dashed">
          <div className="absolute -top-4 left-4 bg-gray-300 text-black px-4 py-1 font-manga-title text-xl uppercase tracking-widest border-2 border-black group-hover:-translate-y-1 transition-transform">
            4. Member Three (Optional)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-sm block text-gray-600">Full Name</label>
              <input type="text" className="w-full border-2 border-gray-400 p-2 font-bold outline-none focus:border-black focus:bg-white transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-sm block text-gray-600">Email Address</label>
              <input type="email" className="w-full border-2 border-gray-400 p-2 font-bold outline-none focus:border-black focus:bg-white transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t-4 border-black text-center relative">
        <button
          disabled={isSubmitting}
          type="submit"
          className="relative overflow-hidden bg-[hsl(var(--manga-red))] text-white font-black text-2xl sm:text-4xl uppercase px-10 py-4 border-4 border-black hover:bg-black transition-colors transform hover:-translate-y-2 hover:shadow-[6px_6px_0_0_black] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none w-full sm:w-auto"
        >
          {isSubmitting ? "PROCESSING..." : "SUBMIT REGISTRATION"}
        </button>
        {isSubmitting && (
           <div className="absolute top-1/2 -right-4 md:right-10 transform -translate-y-1/2">
             <span className="action-text text-4xl text-black animate-pulse">VROOOOM!</span>
           </div>
        )}
      </div>
    </form>
  );
}
