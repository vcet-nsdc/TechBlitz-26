"use client";

export default function TimelineSection() {
  const events = [
    { time: "9:00 AM", title: "Gates Open", desc: "Registration & check-in. Proceed to the Adventurers' Desk on the Ground Floor!", icon: "🚪" },
    { time: "10:00 AM", title: "Opening Ceremony", desc: "The battle officially begins! Attend the mandatory inauguration where the true depth of your quests (Problem Statements) will be discussed.", icon: "⚔️" },
    { time: "11:00 AM", title: "Hackathon Begins (The Sprint)", desc: "Squads deploy to their designated training grounds. Time to code, design, and innovate at full power!", icon: "💻" },
    { time: "1:00 PM", title: "Pitching Begins (Mentor Rounds)", desc: "The Elders (Mentors) will visit your base for guidance. Show them the jutsu you've been working on!", icon: "🍱" },
    { time: "2:30 PM", title: "Break", desc: "Refuel your mana and power levels. Grab some food and network with fellow guilds.", icon: "🧙" },
    { time: "3:30 PM", title: "Finalist Presentation", desc: "The ultimate tournament showdown! Pitch your fully forged creations to the high judges.", icon: "⏰" },
    { time: "5:00 PM", title: "Awards & Closing", desc: "Victory! The dust settles, and the new TechBlitz Champions are crowned.", icon: "🎤" },
  ];

  return (
    <section id="timeline" className="mt-16 manga-reveal opacity-0 translate-y-12 transition-all duration-700">
      <div className="inline-block border-4 border-black bg-black text-white px-8 py-3 mb-8 transform -skew-x-12 shadow-[6px_6px_0_0_hsl(var(--manga-red))]">
        <h2 className="font-manga-title text-4xl sm:text-5xl uppercase font-black transform skew-x-12">Official Mission Timeline</h2>
      </div>

      <div className="relative border-4 border-black bg-white p-6 sm:p-8 manga-panel">
        {/* Vertical line */}
        <div className="absolute left-8 sm:left-12 top-6 bottom-6 w-1 bg-black"></div>

        <div className="space-y-0">
          {events.map((event, i) => (
            <div key={i} className="relative flex items-start gap-6 sm:gap-8 pl-8 sm:pl-12 group">
              {/* Node */}
              <div className="absolute left-5 sm:left-9 top-4 w-7 h-7 bg-white border-4 border-black rounded-full z-10 flex items-center justify-center group-hover:bg-[hsl(var(--manga-red))] group-hover:border-[hsl(var(--manga-red))] transition-colors">
                <div className="w-2 h-2 bg-black rounded-full group-hover:bg-white transition-colors"></div>
              </div>

              {/* Content */}
              <div className="flex-1 border-2 border-black p-4 sm:p-5 mb-4 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <span className="text-3xl">{event.icon}</span>
                  <span className="font-manga-marker text-lg text-[hsl(var(--manga-red))]">{event.time}</span>
                </div>
                <h3 className="font-manga-title text-2xl uppercase font-black mb-1">{event.title}</h3>
                <p className="font-bold text-sm uppercase tracking-wider text-gray-600">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
