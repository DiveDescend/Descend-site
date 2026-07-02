const u = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const LOCATIONS = [
  { id: "1",  name: "Havelock Island",     country: "Andaman & Nicobar", diveCount: 480, image: u("1586053226626-febc8817962f") },
  { id: "2",  name: "Pondicherry",          country: "Tamil Nadu",         diveCount: 310, image: "/locations/pondicherry.avif" },
  { id: "3",  name: "Lakshadweep Islands",  country: "Lakshadweep",        diveCount: 220, image: u("1572431447238-425af66a273b") },
  { id: "4",  name: "Goa",                  country: "Goa",                diveCount: 195, image: "/locations/goa.jpg" },
  { id: "5",  name: "Netrani Island",       country: "Karnataka",          diveCount: 95,  image: u("1691074428211-a0d783a37102") },
  { id: "6",  name: "Neil Island",          country: "Andaman & Nicobar",  diveCount: 240, image: u("1586359716568-3e1907e4cf9f") },
  { id: "7",  name: "Tarkarli",             country: "Maharashtra",        diveCount: 85,  image: u("1652820330085-82a0c2b88d78") },
  { id: "8",  name: "Bangaram Island",      country: "Lakshadweep",        diveCount: 160, image: u("1572025310208-2fd6b91764c1") },
  { id: "9",  name: "Murudeshwar",          country: "Karnataka",          diveCount: 120, image: u("1545762374-d18079617da8") },
  { id: "10", name: "Kovalam",              country: "Kerala",             diveCount: 70,  image: u("1646130322178-c9d8da261891") },
];

export const CREATURES = [
  { id: "1", name: "Whale Shark",      tagline: "The ocean's gentle giant — spotted off Lakshadweep & Pondicherry",  image: u("1540202404-b2979d19ed37") },
  { id: "2", name: "Sea Turtle",       tagline: "Five species call India's coastline home",                          image: u("1437622368342-7a3d73a34c8f") },
  { id: "3", name: "Manta Ray",        tagline: "Graceful giants of the Lakshadweep lagoons",                        image: u("1542443605-fcefd6550d4a") },
  { id: "4", name: "Clownfish",        tagline: "Reef residents hiding in the Andaman anemones",                     image: u("1657989602604-7087c5787ea9") },
  { id: "5", name: "Barracuda",        tagline: "Silver predators patrolling the Andaman walls",                     image: u("1701673505077-27def0fe8219") },
  { id: "6", name: "Eagle Ray",        tagline: "Effortless gliders spotted at Netrani and Havelock",                image: u("1544552866-fef1d68c69b5") },
  { id: "7", name: "Nudibranch",       tagline: "Tiny jewels scattered across Andaman's sea floor",                  image: u("1565128939010-4d26d6b7e6f5") },
  { id: "8", name: "Hammerhead Shark", tagline: "Rare but unmistakable — seen on deep Andaman drifts",               image: u("1491438590914-bc09024cb91d") },
];

export const DIVE_CENTERS = [
  {
    id: "1",
    name: "Temple Adventures",
    location: "Pondicherry, India",
    rating: 4.9,
    reviewCount: 312,
    certifications: ["PADI", "SSI"],
    padi5star: true,
    phone: "+91 413 222 1122",
    website: "https://templeadventures.com",
    coordinates: { lat: 11.9346, lng: 79.8486 },
    description: "India's pioneering PADI dive centre since 2001 — natural reefs, wrecks, and night dives on the Coromandel Coast.",
    image: "/dive-centers/temple-adventures.webp",
    amenities: ["Showers", "Lockers", "Equipment Rental", "Nitrox Fills", "Equipment Servicing", "Photo & Video", "Wi-Fi", "Cafeteria"],
    diveTypes: ["Reef Dive", "Night Dive", "Wreck Dive", "Deep Dive", "Photography Dive"],
    diveSites: [
      { id: "s1", name: "Temple Reef",       depth: "8–20m",  type: "Reef",  image: u("1682687982360-3fbab65f9d50") },
      { id: "s2", name: "Danny's Eel Garden", depth: "5–15m",  type: "Reef",  image: u("1544551763-46a013bb70d5") },
      { id: "s3", name: "S.S. Iris Wreck",   depth: "14–28m", type: "Wreck", image: u("1510637858650-c3be04731622") },
      { id: "s4", name: "Lighthouse Rock",   depth: "6–18m",  type: "Reef",  image: u("1524704654690-b56c05c78a00") },
    ],
    reviews: [
      { rating: 5, daysAgo: "3 days ago",   courseType: "Open Water Course",   title: "Unforgettable First Dive!", text: "Temple Adventures exceeded every expectation. The instructors were patient, knowledgeable and made me feel completely safe throughout the course. The natural reefs here are stunning and I can't wait to come back.", reviewerName: "Sandy R.", reviewerLocation: "Mumbai, India" },
      { rating: 5, daysAgo: "2 weeks ago",  courseType: "Night Dive",          title: "The Night Dive Was Magical", text: "Bioluminescent plankton everywhere you look. The guides here know every corner of the reef and the night dive briefing was thorough and reassuring. One of the best dive experiences of my life.", reviewerName: "Rajan M.", reviewerLocation: "Bangalore, India" },
      { rating: 4, daysAgo: "1 month ago",  courseType: "Advanced Open Water", title: "Solid Instruction, Great Safety Culture", text: "Really impressed by how seriously they take safety without making it feel stressful. Small group sizes mean you get proper attention. The wreck dive on the Advanced course was a highlight.", reviewerName: "Preethi S.", reviewerLocation: "Chennai, India" },
    ],
    instructors: [
      { id: "i1", name: "Arjun Mehta",        specialty: "Wreck & Night Dives",    certifications: ["PADI IDC Staff Instructor"], divesLed: 1842, image: u("1507003211169-0a1dd7228f2d", 400) },
      { id: "i2", name: "Priya Nair",          specialty: "Underwater Photography", certifications: ["PADI Open Water Instructor"], divesLed: 654, image: u("1494790108377-be9c29b29330", 400) },
      { id: "i3", name: "Kiran Thomas",        specialty: "Reef Ecology",           certifications: ["SSI Divemaster"],             divesLed: 428, image: u("1500648767791-00dcc994a43e", 400) },
      { id: "i4", name: "Deepa Krishnamurthy", specialty: "Beginner Courses",       certifications: ["PADI OWSI"],                  divesLed: 991, image: u("1472099645785-5658abf4ff4e", 400) },
    ],
  },
  {
    id: "2",
    name: "Seahawks SCUBA",
    location: "Port Blair, Andaman",
    rating: 4.8,
    reviewCount: 428,
    certifications: ["PADI"],
    padi5star: true,
    phone: "+91 98440 12345",
    website: "https://seahawksscuba.com",
    coordinates: { lat: 11.6234, lng: 92.7265 },
    description: "PADI 5-Star IDC centre with daily liveaboards to South Andaman's pristine reefs and wall dives.",
    image: u("1737128909237-e1087bc36352"),
    amenities: ["Showers", "Lockers", "Boat Dives", "Accommodation", "Nitrox Fills", "Equipment Rental", "Shuttle Service", "First Aid"],
    diveTypes: ["Reef Dive", "Wall Dive", "Deep Dive", "Wreck Dive", "Drift Dive", "Night Dive", "Liveaboard"],
    diveSites: [
      { id: "s1", name: "North Bay Reef",     depth: "5–22m",  type: "Reef", image: u("1682687981907-170c006e3744") },
      { id: "s2", name: "Cinque Island",       depth: "10–30m", type: "Wall", image: u("1505118380757-91f5f5632de0") },
      { id: "s3", name: "The Lighthouse Reef", depth: "6–20m",  type: "Reef", image: u("1559825481-12a05cc00344") },
      { id: "s4", name: "Rutland Island Wall", depth: "15–35m", type: "Wall", image: u("1439405326854-014607f694d7") },
    ],
    reviews: [
      { rating: 5, daysAgo: "5 days ago",   courseType: "Liveaboard",        title: "Andaman's Best Liveaboard Operator", text: "Three days on the liveaboard with Seahawks was the pinnacle of my diving career. The crew, the sites, the food — everything was exceptional. Cinque Island at sunrise is something I'll carry forever.", reviewerName: "David K.", reviewerLocation: "London, UK" },
      { rating: 5, daysAgo: "3 weeks ago",  courseType: "Divemaster Course",  title: "World-Class IDC Training", text: "I did my Divemaster course here over two weeks and the instruction quality is genuinely outstanding. The Course Director's eye for detail and commitment to quality is what sets Seahawks apart.", reviewerName: "Carlos R.", reviewerLocation: "Barcelona, Spain" },
      { rating: 5, daysAgo: "2 months ago", courseType: "Fun Dive",           title: "Wall Dives at Cinque Island", text: "I've dived in Thailand, the Maldives and the Philippines — the Andaman walls here rival any of them. Seahawks runs a tight ship: well-maintained equipment, small groups and guides who know every crack in the reef.", reviewerName: "Amy T.", reviewerLocation: "Singapore" },
    ],
    instructors: [
      { id: "i1", name: "Rahul Sharma",  specialty: "IDC & Liveaboards",  certifications: ["PADI Master Instructor"],    divesLed: 2890, image: u("1438761681033-6461ffad8d80", 400) },
      { id: "i2", name: "Sunita Rao",    specialty: "Night Dives",        certifications: ["PADI Open Water Instructor"], divesLed: 743,  image: u("1534528741775-53994a69daeb", 400) },
      { id: "i3", name: "Aditya Singh",  specialty: "Deep & Wall Dives",  certifications: ["NAUI Instructor"],           divesLed: 1156, image: u("1570295999919-56ceb5ecca61", 400) },
      { id: "i4", name: "Meera Pillai",  specialty: "Marine Biology",     certifications: ["SSI Instructor"],            divesLed: 892,  image: u("1544005313-94ddf0286df2", 400) },
    ],
  },
  {
    id: "3",
    name: "Ocean Tribe",
    location: "Murudeshwar, Karnataka",
    rating: 4.7,
    reviewCount: 189,
    certifications: ["PADI", "NAUI"],
    padi5star: false,
    phone: "+91 97312 44567",
    website: "https://oceantribediving.com",
    coordinates: { lat: 14.0945, lng: 74.4820 },
    description: "Gateway to Netrani Island — India's best mainland visibility, with sharks, rays, and dense schooling fish.",
    image: u("1767456992076-14c0cd1e53de"),
    amenities: ["Showers", "Equipment Rental", "First Aid", "Cafeteria", "Nitrox Fills", "Photo & Video"],
    diveTypes: ["Reef Dive", "Deep Dive", "Wall Dive", "Drift Dive", "Shark Dive"],
    diveSites: [
      { id: "s1", name: "Netrani Pinnacle", depth: "5–40m",  type: "Reef",  image: u("1540202404-b2979d19ed37") },
      { id: "s2", name: "The Cathedral",    depth: "12–30m", type: "Cave",  image: u("1437622368342-7a3d73a34c8f") },
      { id: "s3", name: "Shark Alley",      depth: "15–35m", type: "Drift", image: u("1542443605-fcefd6550d4a") },
      { id: "s4", name: "The Boulders",     depth: "8–22m",  type: "Reef",  image: u("1657989602604-7087c5787ea9") },
    ],
    reviews: [
      { rating: 5, daysAgo: "1 week ago",   courseType: "Fun Dive",           title: "Netrani Pinnacle is a Must-Dive", text: "I drove four hours from Goa specifically to dive Netrani with Ocean Tribe and it was worth every kilometre. The visibility was 25m and we saw bull sharks, eagle rays and a massive school of trevally all in one dive.", reviewerName: "Vikram N.", reviewerLocation: "Pune, India" },
      { rating: 4, daysAgo: "3 weeks ago",  courseType: "Open Water Course",  title: "Great Entry-Level Instruction", text: "Did my Open Water here as a complete beginner. The instructors were calm, thorough and kept the group small. The mainland reefs aren't as glamorous as the Andamans but the quality of teaching is excellent.", reviewerName: "Sobia K.", reviewerLocation: "Hyderabad, India" },
      { rating: 5, daysAgo: "2 months ago", courseType: "Fun Dive",           title: "Five Whale Sharks in One Dive", text: "I still cannot believe what I saw. Five whale sharks in a single dive at the Pinnacle. Ocean Tribe's guides positioned us perfectly — never crowding the animals. This is responsible, exceptional guiding.", reviewerName: "Marco F.", reviewerLocation: "Milan, Italy" },
    ],
    instructors: [
      { id: "i1", name: "Gaurav Bose",   specialty: "Shark & Pelagics",  certifications: ["PADI OWSI"],       divesLed: 1320, image: u("1580489944761-15a19d654956", 400) },
      { id: "i2", name: "Divya Menon",   specialty: "Reef Surveys",      certifications: ["PADI Instructor"], divesLed: 580,  image: u("1603415526960-f7e0328c63b1", 400) },
      { id: "i3", name: "Sanjay Patel",  specialty: "Deep Dives",        certifications: ["NAUI Instructor"], divesLed: 1074, image: u("1582750433449-648ed127bb54", 400) },
      { id: "i4", name: "Ananya Iyer",   specialty: "Beginner Courses",  certifications: ["SSI Divemaster"],  divesLed: 312,  image: u("1522529599102-193c0d76b5b6", 400) },
    ],
  },
  {
    id: "4",
    name: "Barracuda Diving",
    location: "Calangute, Goa",
    rating: 4.5,
    reviewCount: 274,
    certifications: ["PADI"],
    padi5star: false,
    phone: "+91 98230 55678",
    website: "https://barracudadiving.in",
    coordinates: { lat: 15.5449, lng: 73.7548 },
    description: "Goa's longest-running dive school — ideal for beginners with shallow reefs and sheltered bay dives year-round.",
    image: u("1638332907755-38ddf2ff6daf"),
    amenities: ["Showers", "Lockers", "Equipment Rental", "Photo & Video", "Wi-Fi", "Cafeteria", "First Aid"],
    diveTypes: ["Reef Dive", "Wreck Dive", "Night Dive", "Photography Dive", "Cave Dive"],
    diveSites: [
      { id: "s1", name: "Grande Island",   depth: "8–25m",  type: "Reef",  image: u("1701673505077-27def0fe8219") },
      { id: "s2", name: "S.S. Ria Wreck",  depth: "14–32m", type: "Wreck", image: u("1544552866-fef1d68c69b5") },
      { id: "s3", name: "Suzy's Wreck",    depth: "18–28m", type: "Wreck", image: u("1565128939010-4d26d6b7e6f5") },
      { id: "s4", name: "Bat Cave",         depth: "6–15m",  type: "Cave",  image: u("1491438590914-bc09024cb91d") },
    ],
    reviews: [
      { rating: 5, daysAgo: "4 days ago",  courseType: "Open Water Course",  title: "Perfect for First-Timers", text: "I was terrified of the ocean before my Open Water course with Barracuda. By day three I was diving to 18m and absolutely loving it. The team here build your confidence gradually and never rush you. Couldn't recommend them more.", reviewerName: "Natasha P.", reviewerLocation: "New Delhi, India" },
      { rating: 4, daysAgo: "1 month ago", courseType: "Wreck Dive",         title: "The S.S. Ria is Hauntingly Beautiful", text: "Visibility was excellent on our wreck dive — you can see the entire hull from the surface. The guide's knowledge of the history of the wreck made it feel like a real underwater adventure rather than just a dive.", reviewerName: "Tom B.", reviewerLocation: "Bristol, UK" },
      { rating: 5, daysAgo: "2 months ago", courseType: "Night Dive",        title: "Bioluminescence Night Dive", text: "They turned off the torches at 12m depth and the water lit up around us. One of the most otherworldly experiences of my life. Barracuda's night dive briefing is meticulous and the guides never leave your side.", reviewerName: "Akshay R.", reviewerLocation: "Mumbai, India" },
    ],
    instructors: [
      { id: "i1", name: "Vikram Nair",   specialty: "Wreck Diving",  certifications: ["PADI Master Instructor"], divesLed: 1650, image: u("1488508872907-592763824245", 400) },
      { id: "i2", name: "Lakshmi Reddy", specialty: "Photography",   certifications: ["PADI OWSI"],              divesLed: 820,  image: u("1507003211169-0a1dd7228f2d", 400) },
      { id: "i3", name: "Rohit Verma",   specialty: "Night Dives",   certifications: ["SSI Instructor"],         divesLed: 945,  image: u("1494790108377-be9c29b29330", 400) },
      { id: "i4", name: "Shreya Joshi",  specialty: "Cave Diving",   certifications: ["NAUI Instructor"],        divesLed: 677,  image: u("1500648767791-00dcc994a43e", 400) },
    ],
  },
  {
    id: "5",
    name: "Lacadives",
    location: "Agatti Island, Lakshadweep",
    rating: 4.9,
    reviewCount: 156,
    certifications: ["PADI", "SSI"],
    padi5star: true,
    phone: "+91 98454 32109",
    website: "https://lacadives.com",
    coordinates: { lat: 10.8493, lng: 72.1765 },
    description: "Liveaboard specialists with exclusive access to Lakshadweep's uninhabited atolls and manta ray cleaning stations.",
    image: u("1662300127797-e6ac718d6b14"),
    amenities: ["Accommodation", "Boat Dives", "Equipment Rental", "Nitrox Fills", "Photo & Video", "First Aid", "Shuttle Service"],
    diveTypes: ["Reef Dive", "Deep Dive", "Drift Dive", "Wall Dive", "Liveaboard", "Photography Dive"],
    diveSites: [
      { id: "s1", name: "Manta Ray Point", depth: "10–25m", type: "Reef", image: u("1682687982360-3fbab65f9d50") },
      { id: "s2", name: "Bangaram Lagoon", depth: "5–20m",  type: "Reef", image: u("1507525428034-b723cf961d3e") },
      { id: "s3", name: "Periyapani Reef", depth: "8–30m",  type: "Wall", image: u("1544551763-46a013bb70d5") },
    ],
    reviews: [
      { rating: 5, daysAgo: "6 days ago",   courseType: "Liveaboard",        title: "Lakshadweep on a Liveaboard", text: "There are no words for what Lacadives shows you out here. Uninhabited atolls, manta rays at the cleaning station, sharks on every dive. The liveaboard vessel is comfortable and the crew is phenomenal. Book a year in advance.", reviewerName: "Rachel C.", reviewerLocation: "San Francisco, USA" },
      { rating: 5, daysAgo: "1 month ago",  courseType: "Fun Dive",          title: "Manta Cleaning Station Was Surreal", text: "We spent 45 minutes hovering at the cleaning station watching six mantas glide in and out. Lacadives' guides kept us at a respectful distance which made the animals completely at ease. This is how wildlife diving should work.", reviewerName: "Hideki T.", reviewerLocation: "Tokyo, Japan" },
      { rating: 5, daysAgo: "3 months ago", courseType: "Photography Dive",  title: "Best Underwater Photos of My Life", text: "The visibility here is unlike anywhere I've dived in Asia. 30m+ on most sites. As an underwater photographer, Lakshadweep with Lacadives is a dream — guides who understand composition, natural light, and animal behaviour.", reviewerName: "Sofia M.", reviewerLocation: "Lyon, France" },
    ],
    instructors: [
      { id: "i1", name: "Abhijit Das",   specialty: "Pelagic Species",        certifications: ["PADI IDC Staff Instructor"], divesLed: 2100, image: u("1472099645785-5658abf4ff4e", 400) },
      { id: "i2", name: "Kavya Nambiar", specialty: "Manta Encounters",       certifications: ["PADI OWSI"],                divesLed: 1230, image: u("1438761681033-6461ffad8d80", 400) },
      { id: "i3", name: "Suresh Babu",   specialty: "Liveaboard Expeditions", certifications: ["SSI Master Instructor"],    divesLed: 1890, image: u("1534528741775-53994a69daeb", 400) },
      { id: "i4", name: "Riya Ghosh",    specialty: "Drift Dives",            certifications: ["NAUI Instructor"],          divesLed: 560,  image: u("1570295999919-56ceb5ecca61", 400) },
    ],
  },
  {
    id: "6",
    name: "Dive India",
    location: "Havelock Island, Andaman",
    rating: 4.8,
    reviewCount: 341,
    certifications: ["PADI", "NAUI"],
    padi5star: true,
    phone: "+91 99000 12234",
    website: "https://diveindia.com",
    coordinates: { lat: 12.0256, lng: 92.9883 },
    description: "Havelock-based centre offering wall dives, dugong encounters at Dugong Reef, and WWII wreck exploration.",
    image: u("1590393275627-0c48482c60e3"),
    amenities: ["Showers", "Lockers", "Equipment Rental", "Nitrox Fills", "Boat Dives", "Photo & Video", "Wi-Fi", "Cafeteria", "Equipment Servicing"],
    diveTypes: ["Reef Dive", "Wall Dive", "Wreck Dive", "Night Dive", "Deep Dive", "Shark Dive"],
    diveSites: [
      { id: "s1", name: "Elephant Beach Reef", depth: "5–18m",  type: "Reef",  image: u("1544551763-46a013bb70d5") },
      { id: "s2", name: "Lighthouse Wall",      depth: "10–30m", type: "Wall",  image: u("1524704654690-b56c05c78a00") },
      { id: "s3", name: "WWII Wreck",           depth: "18–35m", type: "Wreck", image: u("1758968611255-af2c6f31370a") },
      { id: "s4", name: "Dugong Reef",          depth: "8–20m",  type: "Reef",  image: u("1437622368342-7a3d73a34c8f") },
    ],
    reviews: [
      { rating: 5, daysAgo: "2 days ago",  courseType: "Fun Dive",    title: "The Dugong Encounter I'll Never Forget", text: "We spent 20 minutes with a dugong at Dugong Reef. He just went about his business completely unbothered by us. Dive India's guides know exactly when and where to find these animals — the timing was perfect.", reviewerName: "Suresh B.", reviewerLocation: "Chennai, India" },
      { rating: 5, daysAgo: "2 weeks ago", courseType: "Wreck Dive",  title: "WWII Wreck Is Incredibly Preserved", text: "The propeller, the hull plating, the anchors — all intact and covered in hard coral. Dive India's wreck guide gave us a full briefing on the ship's history before the dive which made it deeply moving, not just a dive.", reviewerName: "James W.", reviewerLocation: "Sydney, Australia" },
      { rating: 4, daysAgo: "1 month ago", courseType: "Night Dive",  title: "Organised, Safe, Absolutely Thrilling", text: "Night diving in the Andamans is special and Dive India runs it with military precision. Torches for everyone, a clear buddy system, and guides who check in constantly. The lion fish and octopus sightings were incredible.", reviewerName: "Anita G.", reviewerLocation: "New Delhi, India" },
    ],
    instructors: [
      { id: "i1", name: "Arun Pillai",        specialty: "Wreck & Deep Dives",  certifications: ["PADI Master Instructor"], divesLed: 3200, image: u("1544005313-94ddf0286df2", 400) },
      { id: "i2", name: "Swati Pandey",        specialty: "Dugong Encounters",   certifications: ["PADI OWSI"],              divesLed: 782,  image: u("1580489944761-15a19d654956", 400) },
      { id: "i3", name: "Manoj Tiwari",        specialty: "Shark Dives",         certifications: ["SSI Instructor"],         divesLed: 1450, image: u("1603415526960-f7e0328c63b1", 400) },
      { id: "i4", name: "Deepika Chatterjee",  specialty: "Night Dives",         certifications: ["NAUI Divemaster"],        divesLed: 418,  image: u("1582750433449-648ed127bb54", 400) },
    ],
  },
  {
    id: "7",
    name: "Barefoot Scuba",
    location: "Havelock Island, Andaman",
    rating: 4.9,
    reviewCount: 683,
    certifications: ["PADI"],
    padi5star: true,
    phone: "+91 95660 88560",
    website: "https://barefootscuba.in",
    coordinates: { lat: 12.0187, lng: 92.9892 },
    description: "India's first PADI 5 Star IDC Resort, established 2005 on Beach No. 3 — six dive boats, year-round courses from beginner to professional.",
    image: "/dive-centers/barefoot-scuba.jpg",
    amenities: ["Showers", "Lockers", "Accommodation", "Equipment Rental", "Nitrox Fills", "Equipment Servicing", "Boat Dives", "Photo & Video", "Cafeteria", "First Aid", "Wi-Fi", "Shuttle Service"],
    diveTypes: ["Reef Dive", "Wall Dive", "Deep Dive", "Drift Dive", "Night Dive", "Wreck Dive", "Photography Dive", "Shark Dive"],
    diveSites: [
      { id: "s1", name: "White House Rock", depth: "12–28m", type: "Reef", image: u("1540202404-b2979d19ed37") },
      { id: "s2", name: "Aquarium",         depth: "5–18m",  type: "Reef", image: u("1542443605-fcefd6550d4a") },
      { id: "s3", name: "Lighthouse Wall",  depth: "10–35m", type: "Wall", image: u("1559825481-12a05cc00344") },
      { id: "s4", name: "Turtle Bay",       depth: "8–20m",  type: "Reef", image: u("1682687982360-3fbab65f9d50") },
    ],
    reviews: [
      { rating: 5, daysAgo: "1 day ago",   courseType: "Open Water Course",  title: "Best Dive School in India, Full Stop", text: "I researched every dive school in the Andamans before booking Barefoot and they genuinely live up to the reputation. Six boats means you're never waiting around, the student ratio is tiny, and the instructors are world-class.", reviewerName: "Oliver H.", reviewerLocation: "Edinburgh, UK" },
      { rating: 5, daysAgo: "1 week ago",  courseType: "Divemaster Course",  title: "The IDC Changed My Career", text: "I came to Barefoot for the Divemaster course and left as a PADI Professional. The Course Director runs the tightest, most rigorous programme I could have hoped for. I now guide dives back home and I owe it entirely to this team.", reviewerName: "Arya M.", reviewerLocation: "Bangalore, India" },
      { rating: 5, daysAgo: "3 weeks ago", courseType: "Fun Dive",           title: "Six Boats, Small Groups, Impeccable Safety", text: "Even with six boats in the water, you never feel like a number here. My group had four divers and one guide who spent the whole dive pointing out nudibranchs and a moray family I'd have completely missed on my own.", reviewerName: "Lisa T.", reviewerLocation: "Toronto, Canada" },
    ],
    instructors: [
      { id: "i1", name: "Nikhil Kumar", specialty: "IDC & Instructor Training",  certifications: ["PADI Course Director"],      divesLed: 4200, image: u("1522529599102-193c0d76b5b6", 400) },
      { id: "i2", name: "Pooja Desai",  specialty: "Marine Conservation",        certifications: ["PADI IDC Staff Instructor"], divesLed: 1680, image: u("1488508872907-592763824245", 400) },
      { id: "i3", name: "Tanvi Shah",   specialty: "Underwater Photography",     certifications: ["SSI Instructor Trainer"],    divesLed: 1220, image: u("1507003211169-0a1dd7228f2d", 400) },
      { id: "i4", name: "Gaurav Mehta", specialty: "Technical Diving",           certifications: ["NAUI Master Instructor"],    divesLed: 2340, image: u("1494790108377-be9c29b29330", 400) },
    ],
  },
];

export type InstructorCategory = "Instructor" | "Divemaster" | "Dive Buddy";

export interface Instructor {
  id: string;
  name: string;
  title: string;
  category: InstructorCategory;
  agency: "PADI" | "SSI" | "NAUI";
  location: string;
  image: string;
  courses: string[];
  skills: string[];
  dives: number;
  years: number;
  rating: number;
  reviews: number;
  topRated?: boolean;
  bio: string;
}

export const INSTRUCTOR_COURSES = ["Open Water", "Advanced Open Water", "Rescue Diver", "Divemaster", "Nitrox"];
export const INSTRUCTOR_AGENCIES = ["PADI", "SSI", "NAUI"] as const;

export const INSTRUCTORS: Instructor[] = [
  { id: "1",  name: "Arjun Nambiar",   title: "PADI Course Director",            category: "Instructor", agency: "PADI", location: "Havelock Island, Andaman",  image: u("1507003211169-0a1dd7228f2d", 600), courses: ["Open Water", "Advanced Open Water", "Rescue Diver", "Divemaster", "Nitrox"], skills: ["Instructor Development", "Deep Dives", "Wreck Diving"],          dives: 4000, years: 18, rating: 5.0, reviews: 320, topRated: true,  bio: "18 years teaching in the Andamans — trained over 200 dive professionals. Runs IDC programmes and loves a good wreck penetration dive on his days off." },
  { id: "2",  name: "Meera Krishnan",  title: "Master Scuba Diver Trainer",      category: "Instructor", agency: "PADI", location: "Pondicherry, Tamil Nadu",   image: u("1494790108377-be9c29b29330", 600), courses: ["Open Water", "Advanced Open Water", "Rescue Diver", "Nitrox"],               skills: ["Night Dives", "Reef Ecology", "Underwater Photography"],         dives: 2500, years: 12, rating: 4.9, reviews: 210, topRated: true,  bio: "Former marine biologist who swapped the lab for the Coromandel Coast. Known for calm, patient teaching and encyclopaedic reef knowledge." },
  { id: "3",  name: "Nikhil Bhandari", title: "SSI Instructor Trainer",          category: "Instructor", agency: "SSI",  location: "Calangute, Goa",            image: u("1500648767791-00dcc994a43e", 600), courses: ["Open Water", "Advanced Open Water", "Rescue Diver", "Divemaster"],           skills: ["Technical Diving", "Sidemount", "Deep Dives"],                   dives: 3000, years: 14, rating: 4.8, reviews: 180,                  bio: "Goa's go-to technical diving instructor. Pioneered several deep routes off Grande Island and teaches everything from first bubbles to sidemount." },
  { id: "4",  name: "Ishita Sen",      title: "Open Water Scuba Instructor",     category: "Instructor", agency: "PADI", location: "Neil Island, Andaman",      image: u("1534528741775-53994a69daeb", 600), courses: ["Open Water", "Advanced Open Water", "Nitrox"],                               skills: ["Beginner Courses", "Underwater Photography", "Reef Ecology"],    dives: 1200, years: 6,  rating: 4.9, reviews: 140, topRated: true,  bio: "Specialises in first-time divers and nervous swimmers. Half her students arrive terrified and leave planning their Advanced course." },
  { id: "5",  name: "Farhan Ali",      title: "NAUI Instructor",                 category: "Instructor", agency: "NAUI", location: "Murudeshwar, Karnataka",    image: u("1570295999919-56ceb5ecca61", 600), courses: ["Open Water", "Advanced Open Water", "Rescue Diver"],                         skills: ["Shark Dives", "Drift Dives", "Deep Dives"],                      dives: 1800, years: 9,  rating: 4.7, reviews: 110,                  bio: "Knows Netrani Pinnacle better than anyone. If there are whale sharks in the water, Farhan will find them." },
  { id: "6",  name: "Zoya Fernandes",  title: "Open Water Scuba Instructor",     category: "Instructor", agency: "PADI", location: "Netrani Island, Karnataka", image: u("1603415526960-f7e0328c63b1", 600), courses: ["Open Water", "Nitrox"],                                                      skills: ["Beginner Courses", "Confined Water Training", "Reef Ecology"],   dives: 800,  years: 4,  rating: 4.8, reviews: 70,                   bio: "Started as a Murudeshwar dive guide, now teaches entry-level courses with an emphasis on buoyancy fundamentals done properly." },
  { id: "7",  name: "Tara D'Souza",    title: "PADI Divemaster",                 category: "Divemaster", agency: "PADI", location: "Havelock Island, Andaman",  image: u("1544005313-94ddf0286df2", 600),    courses: [],                                                                            skills: ["Dive Guiding", "Night Dives", "Marine Life Spotting"],           dives: 900,  years: 5,  rating: 4.8, reviews: 90,  topRated: true,  bio: "Freelance divemaster guiding across Havelock's best sites. Famous for spotting the tiniest nudibranchs and the shyest octopus." },
  { id: "8",  name: "Vivaan Kapoor",   title: "SSI Divemaster",                  category: "Divemaster", agency: "SSI",  location: "Grande Island, Goa",        image: u("1472099645785-5658abf4ff4e", 600), courses: [],                                                                            skills: ["Wreck Guiding", "Buoyancy Coaching", "Underwater Photography"],  dives: 700,  years: 4,  rating: 4.6, reviews: 60,                   bio: "Guides the S.S. Ria and Suzy's Wreck several times a week. Happy to shoot photos of your dive on request." },
  { id: "9",  name: "Karthik Iyer",    title: "NAUI Divemaster",                 category: "Divemaster", agency: "NAUI", location: "Havelock Island, Andaman",  image: u("1582750433449-648ed127bb54", 600), courses: [],                                                                            skills: ["Wall Dives", "Night Dives", "Navigation"],                       dives: 1000, years: 6,  rating: 4.7, reviews: 80,                   bio: "Ex-merchant navy, now a full-time dive guide. Runs early-morning wall dives before the boats crowd in." },
  { id: "10", name: "Ananya Bhat",     title: "Master Scuba Diver",              category: "Dive Buddy", agency: "PADI", location: "Agatti Island, Lakshadweep", image: u("1580489944761-15a19d654956", 600), courses: [],                                                                           skills: ["Manta Encounters", "Drift Dives", "Freediving"],                 dives: 600,  years: 7,  rating: 4.9, reviews: 50,  topRated: true,  bio: "Lakshadweep local and experienced buddy for divers exploring the atolls. Knows every manta cleaning station in the archipelago." },
  { id: "11", name: "Dev Malhotra",    title: "Master Scuba Diver",              category: "Dive Buddy", agency: "SSI",  location: "Pondicherry, Tamil Nadu",   image: u("1488508872907-592763824245", 600), courses: [],                                                                            skills: ["Wreck Dives", "Deep Dives", "GoPro Filming"],                    dives: 400,  years: 6,  rating: 4.7, reviews: 30,                   bio: "Weekend warrior with 400+ dives on the Coromandel Coast. Looking for buddies for regular deep and wreck dives out of Pondicherry." },
  { id: "12", name: "Lena Thomas",     title: "Master Scuba Diver",              category: "Dive Buddy", agency: "NAUI", location: "Port Blair, Andaman",       image: u("1438761681033-6461ffad8d80", 600), courses: [],                                                                            skills: ["Wreck Dives", "Underwater Photography", "Liveaboard Trips"],     dives: 500,  years: 8,  rating: 4.8, reviews: 40,                   bio: "Photographer and liveaboard regular based in Port Blair. Always keen to buddy up for Cinque Island and Rutland trips." },
];

export const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced", "Specialty", "Professional"];

export const COURSES = [
  { id: "1",  name: "Open Water Diver",     agency: "PADI", level: "Beginner",     days: 4,  price: 450,  description: "Your first step into the underwater world.",               image: u("1742461399600-3ded0fe5bb0e") },
  { id: "2",  name: "Advanced Open Water",  agency: "PADI", level: "Intermediate", days: 3,  price: 380,  description: "Deepen your skills with 5 adventure dives.",               image: u("1510637858650-c3be04731622") },
  { id: "3",  name: "Rescue Diver",         agency: "PADI", level: "Advanced",     days: 4,  price: 520,  description: "Learn to prevent and manage dive emergencies.",             image: u("1559825481-12a05cc00344") },
  { id: "4",  name: "Divemaster",           agency: "PADI", level: "Professional", days: 30, price: 1200, description: "Your first professional-level certification.",              image: u("1559827260-dc66d52bef19") },
  { id: "5",  name: "Nitrox Specialty",     agency: "PADI", level: "Specialty",    days: 2,  price: 220,  description: "Dive longer with enriched-air nitrox.",                    image: u("1524704654690-b56c05c78a00") },
  { id: "6",  name: "Deep Diver Specialty", agency: "PADI", level: "Specialty",    days: 2,  price: 280,  description: "Train for dives down to 40 metres.",                       image: u("1682687981907-170c006e3744") },
  { id: "7",  name: "Open Water Diver",     agency: "SSI",  level: "Beginner",     days: 4,  price: 420,  description: "SSI's entry-level certification, recognised worldwide.",   image: u("1544551763-46a013bb70d5") },
  { id: "8",  name: "Advanced Adventurer",  agency: "SSI",  level: "Intermediate", days: 2,  price: 350,  description: "Try five adventure dives and extend your depth to 30m.",   image: u("1542443605-fcefd6550d4a") },
  { id: "9",  name: "Diver Stress & Rescue", agency: "SSI", level: "Advanced",     days: 3,  price: 480,  description: "Recognise stress and manage emergencies with confidence.", image: u("1439405326854-014607f694d7") },
  { id: "10", name: "Enriched Air Nitrox",  agency: "SSI",  level: "Specialty",    days: 1,  price: 180,  description: "Extend your bottom time with enriched air.",               image: u("1657989602604-7087c5787ea9") },
  { id: "11", name: "Scuba Diver",          agency: "NAUI", level: "Beginner",     days: 5,  price: 430,  description: "NAUI's thorough first certification course.",              image: u("1682687982360-3fbab65f9d50") },
  { id: "12", name: "Advanced Scuba Diver", agency: "NAUI", level: "Intermediate", days: 3,  price: 360,  description: "Build experience across six different dive activities.",   image: u("1544552866-fef1d68c69b5") },
  { id: "13", name: "Master Scuba Diver",   agency: "NAUI", level: "Advanced",     days: 5,  price: 550,  description: "NAUI's highest recreational rating — theory and skills.",  image: u("1540202404-b2979d19ed37") },
];

export const FUN_DIVES = [
  { id: "1", name: "Blue Corner Wall",  depth: "15–40m", duration: "2 dives", price: 120, minCert: "Advanced Open Water", image: u("1682687981907-170c006e3744") },
  { id: "2", name: "Manta Ray Point",   depth: "8–25m",  duration: "2 dives", price: 110, minCert: "Open Water",          image: u("1542443605-fcefd6550d4a") },
  { id: "3", name: "WWII Wreck Dive",   depth: "18–35m", duration: "1 dive",  price: 95,  minCert: "Advanced Open Water", image: u("1758968611255-af2c6f31370a") },
  { id: "4", name: "Night Reef Dive",   depth: "5–18m",  duration: "1 dive",  price: 85,  minCert: "Open Water",          image: u("1742461399600-3ded0fe5bb0e") },
  { id: "5", name: "Shark Drift Dive",  depth: "20–40m", duration: "2 dives", price: 130, minCert: "Advanced Open Water", image: u("1491438590914-bc09024cb91d") },
];
