export const problemStatements = {
  vibecoding: {
    title: "Doctor's Appointment & Scheduling System",
    statement: "Running a doctor's clinic is operationally exhausting for the receptionist. Every day they manage a flood of appointment requests over phone calls and walk-ins, manually check the doctor's availability, avoid double bookings by memory or a physical register, send reminders by calling each patient individually, handle cancellations and reschedule requests, and somehow keep the doctor's daily schedule clean and organised. When mistakes happen and they do, a patient shows up at the same time as another, the doctor is left waiting between gaps nobody filled, or a cancellation never gets communicated. There is no single system that a clinic of any size can open on a browser, use without training, and trust to keep everything organised automatically.",
    requirements: [
      "Build a fully deployed full-stack web application that acts as the single operating system for a doctor's clinic, handling everything from appointment booking to schedule management without any manual effort.",
      "Include proper authentication with different access levels for the receptionist and the doctor, plus a real database so all appointment data remains intact.",
      "Implement scheduling logic that automatically prevents appointment clashes and design complete booking, cancellation, rescheduling, and role-based user flows creatively."
    ],
    timeLimit: "24 hours"
  },
  agenticai: {
    title: "Sales and Outreach", 
    statement: "Small and mid-size businesses lose leads every day not because their product is wrong but because nobody responded in time, nobody followed up, and nobody had a system to make either of those things happen automatically. Leads arrive through website forms, Instagram ads, and WhatsApp messages while the rep is busy, and by the time someone gets back to them the prospect has already moved on. Even when first contact happens, follow-up is inconsistent and entirely dependent on the rep remembering to try again, which they rarely do beyond one attempt. CRMs go unmaintained, email sequences feel robotic, and the business owner has zero visibility into pipeline health without physically interrogating the team. The result is a leaking pipeline where money is being lost silently every single day.",
    requirements: [
      "Build an intelligent agent that captures leads from any source, automatically researches and scores them, and notifies the sales rep through WhatsApp or Telegram with a simple approve or reject decision.",
      "Once approved, the agent must handle outreach and follow-up across messaging, email, and voice calls without manual prompting, while updating the rep only at key decision points.",
      "Ensure communication feels personalized, pipeline activity is logged automatically, and the full system can be controlled from a phone without opening a laptop or dashboard."
    ],
    timeLimit: "24 hours"
  },
  uiux: {
    title: "Government Scheme Eligibility Discovery Portal",
    statement: "Many Indian citizens struggle to identify which government schemes they are eligible for because most Yojana portals require users to manually browse multiple pages and interpret complex eligibility criteria written in bureaucratic language. This makes the discovery process slow, confusing, and often discourages eligible beneficiaries from applying for schemes that could support them.",
    requirements: [
      "Design a guided eligibility discovery flow that asks simple questions based on occupation, income group, age, and location to generate personalized scheme matches.",
      "Present an organized results dashboard with matched schemes and clear eligibility indicators so users can quickly understand relevant options.",
      "Deliver a mobile-friendly interactive prototype that demonstrates a complete and easy-to-follow citizen journey from input to scheme discovery."
    ],
    timeLimit: "24 hours"
  }
} as const;

export type Domain = keyof typeof problemStatements;
export type ProblemStatement = typeof problemStatements[Domain];
