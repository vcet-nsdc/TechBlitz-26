"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Who can participate in TechBlitz 2026?",
    a: "Any college student with a valid student ID can participate. Cross-college teams are welcome — assemble the strongest squad you can!",
  },
  {
    q: "How do I register my team?",
    a: 'Click the "Register" button on this page. One team member registers the team and adds the other members\' details. You\'ll receive a confirmation email with your team code.',
  },
  {
    q: "What should I bring to the event?",
    a: "Your laptop, charger, student ID, and any peripherals you need. We'll provide Wi-Fi, power strips, snacks, and meals throughout the day.",
  },
  {
    q: "Can I participate solo?",
    a: "Teams must have 2-3 members. If you don't have a team, join our Discord server — we have a team-finding channel where solo warriors can squad up!",
  },
  {
    q: "Is there an entry fee?",
    a: "Details about entry fees will be announced during registration. Stay tuned on our social channels for early-bird discounts!",
  },
  {
    q: "Can I switch tracks after registering?",
    a: "Track changes are allowed up to 48 hours before the event. After that, your domain is locked in — choose wisely, warrior!",
  },
  {
    q: "What are the judging criteria?",
    a: "Projects are judged on innovation & creativity (30%), technical implementation (30%), real-world impact (20%), and presentation quality (20%).",
  },
  {
    q: "Will there be food and refreshments?",
    a: "Absolutely! Lunch, snacks, and beverages will be provided throughout the event. Fuel up and keep coding!",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="mt-16 manga-reveal opacity-0 translate-y-12 transition-all duration-700">
      <div className="inline-block border-4 border-black bg-black text-white px-8 py-3 mb-8 transform -skew-x-12 shadow-[6px_6px_0_0_hsl(var(--manga-red))]">
        <h2 className="font-manga-title text-4xl sm:text-5xl uppercase font-black transform skew-x-12">Warrior&apos;s FAQ</h2>
      </div>

      <div className="border-4 border-black bg-white p-4 sm:p-6 manga-panel space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border-2 border-black overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-sm sm:text-base uppercase tracking-wider flex-1">{faq.q}</span>
              <span
                className={`font-manga-action text-3xl text-[hsl(var(--manga-red))] transition-transform duration-300 shrink-0 ${
                  openIndex === i ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === i ? "max-h-48 border-t-2 border-dashed border-black" : "max-h-0"
              }`}
            >
              <div className="p-4 sm:p-5 bg-gray-50">
                <p className="font-bold text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
