"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-black font-sans pb-20 halftone-bg">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6pt-32 pt-32">
        <div className="relative mb-8">
          <div className="absolute top-1/2 left-0 transform -translate-x-12 -translate-y-1/2 hidden lg:block pointer-events-none">
            <span className="action-text text-8xl text-black opacity-30">SWOOSH!</span>
          </div>
          
          <div className="inline-block border-4 border-black bg-black text-white px-8 py-3 transform -skew-x-12 shadow-[6px_6px_0_0_hsl(var(--manga-red))]">
            <h1 className="font-manga-title text-5xl sm:text-7xl uppercase font-black transform skew-x-12">
              Enroll <span className="text-[hsl(var(--manga-red))]">Now</span>
            </h1>
          </div>
        </div>

        <RegisterForm />
      </main>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
