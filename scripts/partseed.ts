/**
 * Seed participant certificates for all teams with names and team names in UPPERCASE.
 * Run: npm run partseed
 * Loads MONGODB_URI from .env or .env.local
 */
import dotenv from 'dotenv';
// Load .env and .env.local (Next.js convention)
dotenv.config();
dotenv.config({ path: '.env.local' });

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI env var is required');
  process.exit(1);
}

// Team data from the main seed.ts file
const TEAMS = [
  // AI - Lab 1
  {
    name: 'Dynamic Duo (Plus One)',
    domain: 'vibecoding' as const,
    labId: 'lab-1',
    labName: 'AI 114A',
    members: ['Saivamshi Jilla', 'Shubham Barge', 'Anshuman Jena'],
  },
  {
    name: 'BreakPoint',
    domain: 'vibecoding' as const,
    labId: 'lab-1',
    labName: 'AI 114A',
    members: ['Yash Kadam', 'Dishant Sasane', 'Yash Rane'],
  },
  {
    name: 'BitWin Init',
    domain: 'vibecoding' as const,
    labId: 'lab-1',
    labName: 'AI 114A',
    members: ['Nikhil Yadav', 'Rohit Ravindra Khaire', 'Aryan Bandekar'],
  },
  {
    name: 'Vishpala Sena',
    domain: 'vibecoding' as const,
    labId: 'lab-1',
    labName: 'AI 114A',
    members: ['Chaudhari Omkar Santosh', 'Sawant Nikita Kiran', 'Patil Tanishka Ashish'],
  },
  {
    name: 'MetaMinds',
    domain: 'vibecoding' as const,
    labId: 'lab-1',
    labName: 'AI 114A',
    members: ['Akhila Bijja', 'Saikrishna Pasikanti', 'Hrishita Vinherkar'],
  },
  {
    name: 'Infinite Pointers',
    domain: 'vibecoding' as const,
    labId: 'lab-1',
    labName: 'AI 114A',
    members: ['Tirth Rana', 'Prajwal Kanade', 'Ahmed Khan'],
  },
  {
    name: 'Nexus',
    domain: 'vibecoding' as const,
    labId: 'lab-1',
    labName: 'AI 114A',
    members: ['Tanishq Kiran Kuchekar', 'Rutuja Renukadas Joshi', 'Priyanka Vishnu Joshi'],
  },
  {
    name: 'Coding Cuties',
    domain: 'vibecoding' as const,
    labId: 'lab-1',
    labName: 'AI 114A',
    members: ['Sanskar Thakur', 'Gayatri Sabat', 'Nishit Tare'],
  },
  // AI - Lab 2
  {
    name: 'Kadix',
    domain: 'vibecoding' as const,
    labId: 'lab-2',
    labName: 'AI 114B',
    members: ['Devanshi Solanki', 'Aditi Mishra', 'Kajal Tiwari'],
  },
  {
    name: 'Teen Titans Go',
    domain: 'vibecoding' as const,
    labId: 'lab-2',
    labName: 'AI 114B',
    members: ['Sahil Rajesh Dhavale', 'Shubham Jagannath Parande', 'Vedaant Dinesh Ambolkar'],
  },
  {
    name: "Yadav's",
    domain: 'vibecoding' as const,
    labId: 'lab-2',
    labName: 'AI 114B',
    members: ['Rishiraj Kamal Yadav', 'Aniruddha Ravindra Yadav', 'Visha Yadav'],
  },
  {
    name: 'Kasukabe Defense Force',
    domain: 'vibecoding' as const,
    labId: 'lab-2',
    labName: 'AI 114B',
    members: ['Arnav Gupta', 'Yasmeen Ahmadabadwala'],
  },
  {
    name: 'Sentinels',
    domain: 'vibecoding' as const,
    labId: 'lab-2',
    labName: 'AI 114B',
    members: ['Madhusudan Chanda', 'Rashmit Gaikwad', 'Ravi Jethwa'],
  },
  {
    name: 'M-Power',
    domain: 'vibecoding' as const,
    labId: 'lab-2',
    labName: 'AI 114B',
    members: ['Meet Ninad Naik', 'Misty Manushree', 'Manthan Mesta'],
  },
  {
    name: 'Agent-X',
    domain: 'vibecoding' as const,
    labId: 'lab-2',
    labName: 'AI 114B',
    members: ['Sujal Vaishnav', 'Vedant Dhawan'],
  },
  {
    name: 'Code Smashers',
    domain: 'vibecoding' as const,
    labId: 'lab-2',
    labName: 'AI 114B',
    members: ['Vedant Dhavan', 'Suyash Dhulap'],
  },
  {
    name: 'In Code We Trust',
    domain: 'vibecoding' as const,
    labId: 'lab-2',
    labName: 'AI 114B',
    members: ['Swayam Raut', 'Pranavakumar Murali', 'Ruturaj Patil'],
  },
  // Vibeathon - Lab 3
  {
    name: 'Aventre',
    domain: 'agenticai' as const,
    labId: 'lab-3',
    labName: 'VibeCoding Seminar Hall',
    members: ['Aarchi Dobriya', 'Arambh Ranawat'],
  },
  {
    name: 'TRIO',
    domain: 'agenticai' as const,
    labId: 'lab-3',
    labName: 'VibeCoding Seminar Hall',
    members: ['Ankush Pal', 'Rahul Dashrath Pal', 'Avnishkumar Upendra Pandey', 'Himanshu Pandey'],
  },
  {
    name: 'Terminators',
    domain: 'agenticai' as const,
    labId: 'lab-3',
    labName: 'VibeCoding Seminar Hall',
    members: ['Divakar Navik', 'AdityaKumar Pandey'],
  },
  {
    name: 'Vibechefs',
    domain: 'agenticai' as const,
    labId: 'lab-3',
    labName: 'VibeCoding Seminar Hall',
    members: ['Parth Ganesh Shelar', 'Shagun Mithilesh Vishwakarma', 'Prashant Mishra'],
  },
  {
    name: 'Karatsuba',
    domain: 'agenticai' as const,
    labId: 'lab-3',
    labName: 'VibeCoding Seminar Hall',
    members: ['Rishabh Jhaveri', 'Omkar Patil'],
  },
  {
    name: 'Trident Ai',
    domain: 'agenticai' as const,
    labId: 'lab-3',
    labName: 'VibeCoding Seminar Hall',
    members: ['Aastha Upadhyay', 'Aryan Gajana Ubale', 'Sujal Verma'],
  },
  {
    name: 'CodeZero',
    domain: 'agenticai' as const,
    labId: 'lab-3',
    labName: 'VibeCoding Seminar Hall',
    members: ['Yash Nilesh Kasare', 'Gaurav Nevarekar', 'Aman Mehtar'],
  },
  {
    name: 'Accidental Programmers',
    domain: 'agenticai' as const,
    labId: 'lab-3',
    labName: 'VibeCoding Seminar Hall',
    members: ['Nitesh Rai', 'Vinayak Shukla', 'Ujjwal Tiwari'],
  },
  // Vibeathon - Lab 4
  {
    name: 'team menuvr',
    domain: 'agenticai' as const,
    labId: 'lab-4',
    labName: 'Vibeathon 220',
    members: ['Shayaan Shaikh', 'Anshu Gupta', 'Ankit Vishwakarma'],
  },
  {
    name: 'SouL',
    domain: 'agenticai' as const,
    labId: 'lab-4',
    labName: 'Vibeathon 220',
    members: ['Tanuj Sumant Rane', 'Shivam Tashvant Teli', 'Om Pujari'],
  },
  {
    name: 'Team Encoders',
    domain: 'agenticai' as const,
    labId: 'lab-4',
    labName: 'Vibeathon 220',
    members: ['Parth Sadanand Gawad', 'Shifa Javed Shaikh', 'Sukanya Sanjay Jadhav'],
  },
  {
    name: 'Try Catch',
    domain: 'agenticai' as const,
    labId: 'lab-4',
    labName: 'Vibeathon 220',
    members: ['Yash Vilas Karande', 'Aditya Manoj Patil', 'Siddhesh Namdev Devre'],
  },
  {
    name: '404 Not Found',
    domain: 'agenticai' as const,
    labId: 'lab-4',
    labName: 'Vibeathon 220',
    members: ['Kuldeep Kishan Kolage', 'Ninad Patil', 'Sahil Lakade'],
  },
  {
    name: 'StackOfError',
    domain: 'agenticai' as const,
    labId: 'lab-4',
    labName: 'Vibeathon 220',
    members: ['Aman Mandal', 'Yash Dhekale', 'Priyanka Jain'],
  },
  {
    name: 'Code Warriors',
    domain: 'agenticai' as const,
    labId: 'lab-4',
    labName: 'Vibeathon 220',
    members: ['Krutika Khamkar', 'Nivrutti Chavan', 'Vedant Ghadi'],
  },
  {
    name: 'Team Hustlers',
    domain: 'agenticai' as const,
    labId: 'lab-4',
    labName: 'Vibeathon 220',
    members: ['Aryan Sawant', 'Mitesh Ghadigaonkar', 'Aman Kushwaha'],
  },
  {
    name: 'NeuroNexus',
    domain: 'agenticai' as const,
    labId: 'lab-4',
    labName: 'Vibeathon 220',
    members: ['Nirja Navinkumar Chorghe', 'Jeet Dipesh Gawad', 'Sahil Sandeep Patil'],
  },
  {
    name: '404 Brain Not Found',
    domain: 'agenticai' as const,
    labId: 'lab-4',
    labName: 'Vibeathon 220',
    members: ['Manmeet Singh', 'Pratham Mewada', 'Advet Gavli'],
  },
  {
    name: 'Debug_Squad',
    domain: 'agenticai' as const,
    labId: 'lab-4',
    labName: 'Vibeathon 220',
    members: ['Diah Bangera', 'Mihika Chaudhari'],
  },
  {
    name: 'CYBERPSYCHO',
    domain: 'agenticai' as const,
    labId: 'lab-4',
    labName: 'Vibeathon 220',
    members: ['Prasad Dagdu Dalvi', 'Avishkar Choudhari', 'Akash Prakash Chavan'],
  },
  // Vibeathon - Lab 5
  {
    name: 'BlackFlag',
    domain: 'agenticai' as const,
    labId: 'lab-5',
    labName: 'Vibeathon 221',
    members: ['Omkar Ugalmugale', 'Piyush Vishwakarma', 'Bharat Solanki'],
  },
  {
    name: 'The Defenders',
    domain: 'agenticai' as const,
    labId: 'lab-5',
    labName: 'Vibeathon 221',
    members: ['Sauhard Jadhav', 'Pranav Shinde', 'Aryan Singh'],
  },
  {
    name: 'PKG',
    domain: 'agenticai' as const,
    labId: 'lab-5',
    labName: 'Vibeathon 221',
    members: ['Ayush Choudhar', 'Prashant Dhuri', 'Ritesh Gharat'],
  },
  {
    name: 'Sun Slappers',
    domain: 'agenticai' as const,
    labId: 'lab-5',
    labName: 'Vibeathon 221',
    members: ['Samyak Ahire', 'Saumit Bhojne', 'Siddanth Chavan'],
  },
  {
    name: 'Edge Runner',
    domain: 'agenticai' as const,
    labId: 'lab-5',
    labName: 'Vibeathon 221',
    members: ['Pranjal Badgujar', 'Kshitij Atalkar', 'Om P. Pethkar'],
  },
  {
    name: 'Golden Pear',
    domain: 'agenticai' as const,
    labId: 'lab-5',
    labName: 'Vibeathon 221',
    members: ['Ashish Yadav', 'Deepak Joshi', 'Krishna Mishra'],
  },
  {
    name: 'Syntax Squad',
    domain: 'agenticai' as const,
    labId: 'lab-5',
    labName: 'Vibeathon 221',
    members: ['Taanya Nigam', 'Lavanya Kini', 'Archita Gupta'],
  },
  {
    name: "Full Stack Alchemist's",
    domain: 'agenticai' as const,
    labId: 'lab-5',
    labName: 'Vibeathon 221',
    members: ['Aryan Nair', 'Ved Vasaikar'],
  },
  {
    name: 'Bug Slayers',
    domain: 'agenticai' as const,
    labId: 'lab-5',
    labName: 'Vibeathon 221',
    members: ['Sumeet Kadam', 'Dhruv Choudhary', 'Bhavya Damani'],
  },
  // Vibeathon - Lab 6
  {
    name: 'DSE',
    domain: 'agenticai' as const,
    labId: 'lab-6',
    labName: 'Vibeathon 222',
    members: ['Swayam Dashrath Gode', 'Vedant Kishor Mhatre'],
  },
  {
    name: 'PARALLAX',
    domain: 'agenticai' as const,
    labId: 'lab-6',
    labName: 'Vibeathon 222',
    members: ['Pranay Patkar', 'Varun Poojary', 'Vihar Makwana'],
  },
  {
    name: 'FromZero',
    domain: 'agenticai' as const,
    labId: 'lab-6',
    labName: 'Vibeathon 222',
    members: ['Sagar Rambade', 'Deep Patil'],
  },
  {
    name: 'Code Commanders',
    domain: 'agenticai' as const,
    labId: 'lab-6',
    labName: 'Vibeathon 222',
    members: ['Akash Holsambre', 'Ajay Maurya', 'Vaibhav Singh'],
  },
  {
    name: 'Forget to Code',
    domain: 'agenticai' as const,
    labId: 'lab-6',
    labName: 'Vibeathon 222',
    members: ['Pradhyumna Bait', 'Harsh Jethwa', 'Parth Redij'],
  },
  {
    name: 'Byte Blitz',
    domain: 'agenticai' as const,
    labId: 'lab-6',
    labName: 'Vibeathon 222',
    members: ['Krishna Pankaj Panchal', 'Khan Huzaifa Khatoon', 'Manyata Prashant Deshpande'],
  },
  {
    name: 'Snack Overflow',
    domain: 'agenticai' as const,
    labId: 'lab-6',
    labName: 'Vibeathon 222',
    members: ['Mandar Prabhu', 'Aryan Sadvilkar', 'Niharika Mantri'],
  },
  {
    name: 'Terminal Crew',
    domain: 'agenticai' as const,
    labId: 'lab-6',
    labName: 'Vibeathon 222',
    members: ['Aryan Kate', 'Dipesh Mahesh Karalkar', 'Aditya Anand Fandate'],
  },
  // UI/UX - Lab 7
  {
    name: 'Grimoire Coders',
    domain: 'uiux' as const,
    labId: 'lab-7',
    labName: 'UI/UX 308A',
    members: ['Gound Prince K.', 'Prashant Hotkar B.', 'Chatterjee Anik Tarun'],
  },
  {
    name: 'Anything Works',
    domain: 'uiux' as const,
    labId: 'lab-7',
    labName: 'UI/UX 308A',
    members: ["Seon D'silva", 'Niharika Raut', 'Rishi Vartak'],
  },
  {
    name: 'AIRNOVA',
    domain: 'uiux' as const,
    labId: 'lab-7',
    labName: 'UI/UX 308A',
    members: ['Saiesh Sutar', 'Om Kanojiya', 'Vikash Pandey'],
  },
  {
    name: 'Pixel3',
    domain: 'uiux' as const,
    labId: 'lab-7',
    labName: 'UI/UX 308A',
    members: ['Madhuri Manohar Billa', 'Varsha Anand Dasari', 'Mayuri Sachin Gurav'],
  },
  {
    name: 'The Fourth Vector',
    domain: 'uiux' as const,
    labId: 'lab-7',
    labName: 'UI/UX 308A',
    members: ['Kartikey Patil', 'Akshay Kokate', 'Vinanti Mhatre'],
  },
  {
    name: 'UX Dominators',
    domain: 'uiux' as const,
    labId: 'lab-7',
    labName: 'UI/UX 308A',
    members: ['Vignesh Ashok Yemul', 'Rohit Ganesh Mali', 'Nishant Srinivas Usakoyala'],
  },
  {
    name: 'UI NINJAS',
    domain: 'uiux' as const,
    labId: 'lab-7',
    labName: 'UI/UX 308A',
    members: ['Chintan Chavnekar', 'Karm Gujrati', 'Harsh Bharati'],
  },
  {
    name: 'Hustlers',
    domain: 'uiux' as const,
    labId: 'lab-7',
    labName: 'UI/UX 308A',
    members: ['Om Anil Udeg', 'Aayush Munnalal Yadav', 'Shivam Ravindra Joshi'],
  },
  {
    name: 'Technexis',
    domain: 'uiux' as const,
    labId: 'lab-7',
    labName: 'UI/UX 308A',
    members: ['Sunny Dinesh Gupta', 'Shreya Agnihotri', 'Aquib Ahmad'],
  },
  // UI/UX - Lab 8
  {
    name: 'DesignOrbit',
    domain: 'uiux' as const,
    labId: 'lab-8',
    labName: 'UI/UX 308B',
    members: ['Samiksha Subhash Desai', 'Pankaj Murlidhar Chaudhari', 'Shruti Ganesh Dhodi'],
  },
  {
    name: 'MadhavX Coders',
    domain: 'uiux' as const,
    labId: 'lab-8',
    labName: 'UI/UX 308B',
    members: ['Vinayak Prashant Kokkul', 'Madhav Mittapelli', 'Tanmay Patil'],
  },
  {
    name: 'UX Wizards',
    domain: 'uiux' as const,
    labId: 'lab-8',
    labName: 'UI/UX 308B',
    members: ['Deep Godhani', 'Prajwala Bhandary', 'Kartika Chavan'],
  },
  {
    name: 'Creative Coders',
    domain: 'uiux' as const,
    labId: 'lab-8',
    labName: 'UI/UX 308B',
    members: ['Konisha Jayesh Thakare', 'Lavanya Nitin Murudkar'],
  },
  {
    name: 'FlowCraft',
    domain: 'uiux' as const,
    labId: 'lab-8',
    labName: 'UI/UX 308B',
    members: ['Pranjal Keshav Patil', 'Shravani Sandeep Raut', 'Aayush Hemant Patil'],
  },
  {
    name: 'DSA',
    domain: 'uiux' as const,
    labId: 'lab-8',
    labName: 'UI/UX 308B',
    members: ['Aditi Nandivikar', 'Darsana Nair', 'Simran Pawar'],
  },
  {
    name: 'Prototype',
    domain: 'uiux' as const,
    labId: 'lab-8',
    labName: 'UI/UX 308B',
    members: ['Bhavik Jain', 'Soham Patil'],
  },
  {
    name: 'Thinktank',
    domain: 'uiux' as const,
    labId: 'lab-8',
    labName: 'UI/UX 308B',
    members: ['Adeena Deshmukh', 'Vaidehi Haryan', 'Sohan Ambhire'],
  },
  {
    name: 'Shadow Coders',
    domain: 'uiux' as const,
    labId: 'lab-8',
    labName: 'UI/UX 308B',
    members: ['Pratik Ghanwat', 'Chetan Bhuyal', 'Galaiya Vrusti'],
  },
  {
    name: 'Monk Designers',
    domain: 'uiux' as const,
    labId: 'lab-8',
    labName: 'UI/UX 308B',
    members: ['Lokesh Rathod', 'Aditya Rajak'],
  },
];

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function run() {
  await mongoose.connect(MONGODB_URI!);
  
  // Clear existing team data and certificates
  console.log('Clearing existing team data...');
  const Team = mongoose.connection.collection('teams');
  await Team.deleteMany({});
  console.log('Cleared all existing team data');

  const usedIds = new Set<string>();
  const teams = TEAMS.map((t) => {
    let id = slug(t.name);
    let suffix = 0;
    while (usedIds.has(id)) {
      suffix++;
      id = `${slug(t.name)}-${suffix}`;
    }
    usedIds.add(id);
    
    // Create certificates for all team members with names and team names in UPPERCASE
    const certificates = t.members.map((member) => ({
      participantName: member.toUpperCase(), // Participant name in UPPERCASE
      certificateDataUrl: `data:image/png;base64,certificate-placeholder-${member.toLowerCase().replace(/\s+/g, '-')}`, // Placeholder URL
      generatedAt: new Date(),
    }));

    return {
      teamName: t.name.toUpperCase(), // Team name in UPPERCASE
      leaderName: t.members[0].toUpperCase(), // Leader name in UPPERCASE
      member2: t.members[1]?.toUpperCase() || '', // Member 2 name in UPPERCASE
      member3: t.members[2]?.toUpperCase() || undefined, // Member 3 name in UPPERCASE (if exists)
      domain: t.domain,
      submissionUrl: `https://github.com/${id}/techblitz26-submission`, // Placeholder submission URL
      certificates, // Certificates with uppercase names
      createdAt: new Date(),
    };
  });

  await Team.insertMany(teams);

  const byDomain = teams.reduce<Record<string, number>>((acc, t) => {
    acc[t.domain] = (acc[t.domain] ?? 0) + 1;
    return acc;
  }, {});

  const totalCertificates = teams.reduce((total, team) => total + team.certificates.length, 0);

  console.log('✅ Seeded', teams.length, 'teams with participant certificates');
  console.log('📊 By domain:', byDomain);
  console.log('🏆 Total certificates generated:', totalCertificates);
  console.log('📝 All names and team names are in UPPERCASE');
  
  // Show sample of seeded data
  console.log('\n📋 Sample seeded teams:');
  teams.slice(0, 3).forEach((team) => {
    console.log(`🔹 ${team.teamName}`);
    console.log(`   Leader: ${team.leaderName}`);
    console.log(`   Members: ${team.member2}${team.member3 ? `, ${team.member3}` : ''}`);
    console.log(`   Certificates: ${team.certificates.length}`);
    console.log(`   Domain: ${team.domain}`);
    console.log('');
  });
  
  process.exit(0);
}

run().catch((err) => {
  console.error('❌ Error seeding participant certificates:', err);
  process.exit(1);
});
