"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TracksSection from "@/components/TracksSection";
import PrizesSection from "@/components/PrizesSection";
import TimelineSection from "@/components/TimelineSection";
import JudgesSection from "@/components/JudgesSection";
import SponsorsSection from "@/components/SponsorsSection";
import RulesSection from "@/components/RulesSection";
import FaqSection from "@/components/FaqSection";
import GallerySection from "@/components/GallerySection";
import CommunitySection from "@/components/CommunitySection";
import RegistrationCta from "@/components/RegistrationCta";
import Footer from "@/components/Footer";

export default function Home() {
  // Scroll reveal animation for .manga-reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-12");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".manga-reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-white text-black font-sans pb-20 halftone-bg">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 flex flex-col gap-12">
        <HeroSection />
        <AboutSection />
        <TracksSection />
        <TimelineSection />
        <PrizesSection />
        <JudgesSection />
        <SponsorsSection />
        <RulesSection />
        <FaqSection />
        <GallerySection />
        <CommunitySection />
        <RegistrationCta />
      </main>

      <Footer />
    </div>
  );
}
