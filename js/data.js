/**
 * BOLD — Black Outreach Leadership Directive
 * Central Data Store and Content Configuration
 * 
 * Non-technical administrators can safely edit this file to update
 * content, metrics, verified links, events, and leadership profiles.
 */

const BOLD_DATA = {
  meta: {
    name: "BOLD — Black Outreach Leadership Directive",
    shortName: "BOLD",
    acronym: "BOLD",
    fullName: "Black Outreach Leadership Directive",
    tagline: "Empowering Black Students. Opening Doors. Building Futures.",
    mission: "BOLD is a student-led community initiative committed to increasing and enabling Black student success at the post-secondary level.",
    vision: "A future where Black students are empowered to pursue post-secondary education, access meaningful opportunities, and thrive academically, professionally, and within their communities.",
    heroDescription: "A student-led community initiative dedicated to increasing and enabling Black student success at the post-secondary level through mentorship, educational outreach, leadership, and community connection.",
    contact: {
      email: "bold.cos@gmail.com",
      generalEmail: "bold.cos@gmail.com",
      outreachEmail: "bold.cos@gmail.com",
      volunteerEmail: "bold.cos@gmail.com",
      partnershipsEmail: "bold.cos@gmail.com",
      instagramHandle: "@BOLD.Ontario",
      instagramUrl: "https://instagram.com/BOLD.Ontario",
      address: "Ontario, Canada",
      socials: {
        instagram: "https://instagram.com/BOLD.Ontario"
      }
    },
    qrCodes: {
      studentSignUp: {
        title: "Student Sign-Up",
        description: "Join BOLD as a high school or post-secondary member to access mentorship, workshop announcements, and student opportunities.",
        image: "assets/images/qr-student-signup.png",
        targetUrl: "#"
      },
      executiveSignUp: {
        title: "Executive Sign-Up",
        description: "Apply to join the BOLD executive team and lead student outreach, event logistics, communications, finance, and regional operations.",
        image: "assets/images/qr-executive-signup.png",
        targetUrl: "#"
      }
    },
    foundingStory: "BOLD was created by Black undergraduate leaders and professionals who recognized that authentic peer mentorship, early campus exposure, and community support transform how students envision their futures. Rather than waiting for systemic gaps to close, our student leaders took initiative to build the digital and physical spaces they wished had existed when they were in high school."
  },

  values: [
    {
      id: "empowerment",
      title: "Empowerment",
      description: "Equip students with the knowledge, confidence, and resources to pursue their goals and navigate post-secondary pathways with self-assurance.",
      icon: "zap"
    },
    {
      id: "representation",
      title: "Representation",
      description: "Create opportunities for Black students to see themselves reflected in academic disciplines, campus leadership, and professional pathways.",
      icon: "users"
    },
    {
      id: "community",
      title: "Community",
      description: "Build meaningful, lasting relationships among students, mentors, educators, and community organizations rooted in mutual respect.",
      icon: "heart"
    },
    {
      id: "access",
      title: "Access",
      description: "Help students discover educational opportunities, admissions knowledge, financial aid, and practical pathways to post-secondary success.",
      icon: "key"
    },
    {
      id: "leadership",
      title: "Leadership",
      description: "Encourage students to cultivate essential leadership skills, launch grassroots initiatives, and mentor the next generation.",
      icon: "compass"
    },
    {
      id: "collaboration",
      title: "Collaboration",
      description: "Work hand-in-hand with high schools, universities, colleges, Black student associations, and community stakeholders to multiply impact.",
      icon: "share-2"
    }
  ],

  // Verified BOLD Organizational Statistics
  impactMetrics: [
    {
      id: "students",
      value: "400+",
      label: "Students Reached",
      description: "Empowered through high school visits, campus tours, and pathway presentations across Ontario.",
      isVerified: true
    },
    {
      id: "events",
      value: "20+",
      label: "Outreach Events Delivered",
      description: "Classroom workshops, transition seminars, and university campus immersion sessions.",
      isVerified: true
    },
    {
      id: "executives",
      value: "40+",
      label: "BOLD Executives & Leaders",
      description: "Dedicated university students and professionals leading regional initiatives province-wide.",
      isVerified: true
    },
    {
      id: "partners",
      value: "10+",
      label: "Community & School Partners",
      description: "Secondary schools, collegiate associations, and community organizations collaborating with BOLD.",
      isVerified: true
    }
  ],

  // Real event highlights from BOLD activities
  impactStories: [
    {
      id: "story-1",
      title: "The Truth About University: High School Outreach Tour",
      category: "School Outreach",
      date: "Secondary School Tour",
      location: "Mother Teresa Catholic Secondary School & Ontario Schools",
      image: "assets/images/event-school-visit.jpg",
      needAddressed: "Black high school students frequently lack accessible advice on post-secondary application processes, program choices, and campus realities.",
      outcomes: "Interactive classroom and assembly presentations sharing firsthand insights into undergraduate programs, admissions cutoffs, and campus life."
    },
    {
      id: "story-2",
      title: "Academic Pathways & University Preparation Workshop",
      category: "Academic Guidance",
      date: "Classroom Presentation",
      location: "Ontario High Schools",
      image: "assets/images/event-presentation.jpg",
      needAddressed: "Demystifying post-secondary requirements, scholarship opportunities, and prerequisites early in high school.",
      outcomes: "Direct student Q&A covering admissions, student life balance, and overcoming systemic hurdles."
    },
    {
      id: "story-3",
      title: "Collegiate Student Coalition & Campus Network",
      category: "Campus Experience",
      date: "Campus Partnership",
      location: "Western University & Partner Institutions",
      image: "assets/images/event-student-coalition.jpg",
      needAddressed: "Building institutional connections and safe spaces with established campus student associations and equity offices.",
      outcomes: "Collaborative initiatives bringing together Black student leaders across STEM, medicine, business, and humanities."
    },
    {
      id: "story-4",
      title: "Join BOLD: Student & Executive Onboarding Assemblies",
      category: "Community Engagement",
      date: "University Lecture Halls",
      location: "Campus Lecture Halls & Hybrid Sessions",
      image: "assets/images/event-lecture-hall.jpg",
      needAddressed: "Recruiting and empowering Black students as organizers, mentors, and ambassadors to lead educational access initiatives.",
      outcomes: "Over 40 student executives and ambassadors onboarded across Ontario branches, coordinating local workshops and visits."
    }
  ],

  programs: [
    {
      id: "educational-outreach",
      title: "Educational Outreach",
      subtitle: "School Presentations & Academic Pathways",
      description: "Interactive secondary school presentations, post-secondary information sessions, and panel discussions designed to help Black students explore degree, diploma, and apprenticeship pathways.",
      features: [
        "Interactive high school classroom & assembly presentations",
        "Demystifying admissions requirements, prerequisites, and timelines",
        "Panel discussions with diverse Black university & college students",
        "Guidance on navigating financial aid and post-secondary applications"
      ],
      badge: "Flagship Program",
      actionText: "Request School Outreach",
      actionTarget: "partnerships.html"
    },
    {
      id: "mentorship-guidance",
      title: "Mentorship & Guidance",
      subtitle: "One-on-One & Cohort Peer Connections",
      description: "Meaningful pairings between post-secondary students and high school or early-year undergraduates to share lived experiences, study habits, and career aspirations.",
      features: [
        "Structured peer mentor pairings matched by academic interest",
        "Monthly thematic workshops on resume building, networking, and wellness",
        "Safe spaces to discuss identity, belonging, and academic resilience",
        "Alumni and young professional career spotlight sessions"
      ],
      badge: "Community Core",
      actionText: "Join as Member or Mentor",
      actionTarget: "become-a-member.html"
    },
    {
      id: "campus-exposure",
      title: "Campus Exposure & Experiential Learning",
      subtitle: "Tours, Faculty Spotlights & Immersions",
      description: "Demystifying post-secondary spaces through curated campus visits, student panels, departmental spotlights, and firsthand exposure to lecture halls and campus life.",
      features: [
        "Guided university and college campus walking tours",
        "Faculty and academic department interactive demonstrations",
        "Direct connections with student campus leaders and clubs",
        "Transit and meal support assistance for participating students"
      ],
      badge: "Hands-On",
      actionText: "Explore Campus Visits",
      actionTarget: "events.html"
    },
    {
      id: "leadership-development",
      title: "Leadership & Student Development",
      subtitle: "Skills for Campus & Community Advocacy",
      description: "Equipping Black students with transferable leadership, project management, public speaking, and community organizing skills to lead initiatives of their own.",
      features: [
        "Student executive training and governance workshops",
        "Public speaking, advocacy, and presentation coaching",
        "Regional branch development and event coordination experience",
        "Networking opportunities with student leaders across institutions"
      ],
      badge: "Youth-Led",
      actionText: "Join Student Leadership",
      actionTarget: "become-a-member.html"
    }
  ],

  // Streamlined, verified resources
  resources: [
    {
      id: "res-1",
      category: "choosing-institution",
      title: "Ontario Universities' Application Centre (OUAC)",
      description: "Official centralized application portal for all Ontario undergraduate degree programs with deadlines, fees, and requirements.",
      url: "https://www.ouac.on.ca",
      type: "Official Portal",
      audience: "High School Students",
      isExternal: true
    },
    {
      id: "res-2",
      category: "choosing-institution",
      title: "ontariocolleges.ca Application Portal",
      description: "Comprehensive guide to college diplomas, certificate programs, degrees, and apprenticeships across 24 Ontario public colleges.",
      url: "https://www.ontariocolleges.ca",
      type: "Official Portal",
      audience: "High School & Mature Students",
      isExternal: true
    },
    {
      id: "res-3",
      category: "programs-careers",
      title: "Government of Canada Job Bank & Career Planning",
      description: "Explore career outlooks, educational requirements, average Canadian salaries, and projected provincial employment trends.",
      url: "https://www.jobbank.gc.ca/career-planning",
      type: "Government Portal",
      audience: "All Students",
      isExternal: true
    },
    {
      id: "res-4",
      category: "applications",
      title: "Ontario Universities Info (OUInfo)",
      description: "Searchable directory of degree programs, grade cutoffs, campus profiles, and admission requirements across Ontario universities.",
      url: "https://www.ontariouniversitiesinfo.ca",
      type: "Reference Database",
      audience: "High School Applicants",
      isExternal: true
    },
    {
      id: "res-5",
      category: "scholarships",
      title: "Black Foundation of Community Networks (BFCN) Scholarship Directory",
      description: "Curated national scholarship directory created specifically to assist Canadian Black secondary and post-secondary students.",
      url: "https://bfcn.ca",
      type: "Scholarship Directory",
      audience: "High School & Undergrad",
      isExternal: true
    },
    {
      id: "res-6",
      category: "scholarships",
      title: "OSAP (Ontario Student Assistance Program)",
      description: "Official government grants and student loans portal with funding estimator and application guidelines for Ontario residents.",
      url: "https://www.ontario.ca/page/osap-ontario-student-assistance-program",
      type: "Government Portal",
      audience: "All Post-Secondary Students",
      isExternal: true
    },
    {
      id: "res-7",
      category: "scholarships",
      title: "Loran Scholars Foundation National Awards",
      description: "Prestigious multi-year Canadian undergraduate awards valuing character, community service, and leadership potential.",
      url: "https://loranscholar.ca",
      type: "National Scholarship",
      audience: "Graduating High School Seniors",
      isExternal: true
    },
    {
      id: "res-8",
      category: "campus-life",
      title: "Black Youth Helpline (Toll-Free National Support)",
      description: "Youth-focused assessment, educational staying power, and culturally responsive mental health support available Canada-wide.",
      url: "https://blackyouth.ca",
      type: "Health & Wellbeing",
      audience: "Youth & Families",
      isExternal: true
    }
  ],

  events: [
    {
      id: "evt-1",
      title: "Post-Secondary Pathways & Application Demystification Workshop",
      status: "upcoming",
      category: "Workshops & Panels",
      date: "Upcoming Workshop",
      time: "6:00 PM – 8:00 PM EST",
      location: "Hybrid: Virtual (Zoom) & Ontario Partner Campus",
      audience: "Grade 11 & 12 Black Students, Parents, and Guardians",
      image: "assets/images/event-presentation.jpg",
      description: "Join BOLD student leaders for a step-by-step breakdown of university and college applications, program selection, scholarship strategy, and personal statement tips.",
      accessibility: "Live closed-captioning provided for virtual stream; accessible venue.",
      contact: "bold.cos@gmail.com"
    },
    {
      id: "evt-2",
      title: "Campus Immersion & Black Student Experience Tour",
      status: "upcoming",
      category: "Campus Tours",
      date: "Upcoming Tour",
      time: "10:00 AM – 3:30 PM EST",
      location: "University Campus Tour & Student Centre",
      audience: "High School Students (Grades 10–12)",
      image: "assets/images/event-school-visit.jpg",
      description: "Experience a day in the life of a post-secondary student! Tour lecture halls, state-of-the-art study spaces, and connect over lunch with current Black undergraduate leaders.",
      accessibility: "Accessible transit assistance available upon request; dietary accommodations provided.",
      contact: "bold.cos@gmail.com"
    },
    {
      id: "evt-3",
      title: "Empowerment & Leadership Roundtable: Student Summit",
      status: "upcoming",
      category: "Student Networking",
      date: "Upcoming Summit",
      time: "1:00 PM – 5:00 PM EST",
      location: "Campus Lecture Hall & Live Webcast",
      audience: "Post-Secondary Undergraduates & Prospective Student Leaders",
      image: "assets/images/event-lecture-hall.jpg",
      description: "An interactive summit bringing together Black student leaders, campus club executives, and community advocates to exchange organizing strategies and expand BOLD regional branches.",
      accessibility: "Full physical and digital accessibility accommodations.",
      contact: "bold.cos@gmail.com"
    },
    {
      id: "evt-4",
      title: "High School Outreach Tour: The Truth About University",
      status: "past",
      category: "School Outreach",
      date: "Delivered Outreach",
      location: "Ontario Secondary Schools",
      audience: "Secondary School Cohort (Grades 10–12)",
      image: "assets/images/event-school-visit.jpg",
      description: "Over 400 high school attendees engaged with undergraduate panels, bursary information sessions, and small-group mentorship circles.",
      accessibility: "Delivered on-site at Ontario secondary schools.",
      contact: "bold.cos@gmail.com"
    },
    {
      id: "evt-5",
      title: "Collegiate Student Coalition & Networking Evening",
      status: "past",
      category: "Student Networking",
      date: "Delivered Networking",
      location: "University Campus Centre",
      audience: "Undergraduate Students & Student Groups",
      image: "assets/images/event-student-coalition.jpg",
      description: "Connecting student associations across STEM, health sciences, business, and equity offices to coordinate outreach initiatives.",
      accessibility: "Held on accessible university campus premises.",
      contact: "bold.cos@gmail.com"
    }
  ],

  // Official BOLD Executive Roles with Brief Descriptions
  executiveRoles: [
    {
      id: "role-regional-lead",
      title: "Regional Lead",
      category: "Regional Operations",
      status: "Recruiting",
      duties: [
        "Oversee BOLD’s operations in a specific region",
        "Coordinate with the outreach team to form partnerships with local schools and organizations in your region",
        "Carry out in-person events at local high schools in a region",
        "Assist in the recruitment of new BOLD members in a specific region",
        "Expand BOLD’s presence and initiatives in the region"
      ]
    },
    {
      id: "role-secretary",
      title: "Secretary",
      category: "Internal Administration",
      status: "Recruiting",
      duties: [
        "Maintain records and documentation of meetings",
        "Schedule and organize meetings for the team",
        "Ensure the organization of the Google Drive",
        "Upkeep a BOLD Calendar to keep track of all events and organizational tasks",
        "Keep track of current high school members",
        "Periodic updating of the BOLD website"
      ]
    },
    {
      id: "role-events-logistics",
      title: "Event Planner / Logistics",
      category: "Programming & Events",
      status: "Recruiting",
      duties: [
        "Lead brainstorming of workshops and events with input from BOLD executive members",
        "Create a catalog of events for in-person vs online workshops",
        "Plan and execute events that align with BOLD’s mission",
        "Coordinate and assign executive members for online workshop schedules, and manage logistics",
        "Work with Communications and Outreach teams for the promotion of events",
        "Ensure all aspects of event execution run smoothly",
        "Collects feedback from events"
      ]
    },
    {
      id: "role-outreach-external",
      title: "Outreach and External Affairs",
      category: "Partnerships & Outreach",
      status: "Recruiting",
      duties: [
        "Build relationships with external organizations and community partners",
        "Develop partnerships with educational institutions and businesses",
        "Engage in advocacy efforts to support BOLD’s mission",
        "Seek opportunities to expand BOLD’s visibility and influence",
        "Represent BOLD at community and networking events"
      ]
    },
    {
      id: "role-finance",
      title: "Finance",
      category: "Financial Management",
      status: "Recruiting",
      duties: [
        "Oversee fundraising efforts and grant applications",
        "Manage BOLD’s budget and financial records",
        "Allocate funds efficiently for scholarships, events, and track expenses"
      ]
    },
    {
      id: "role-high-school-advisory",
      title: "High School Advisory Member",
      category: "Youth Representation",
      status: "Recruiting",
      duties: [
        "Represent high school students within BOLD",
        "Provide insights on student needs and interests",
        "Engage peers and promote BOLD’s opportunities",
        "Assist in developing programs tailored to high school students"
      ]
    },
    {
      id: "role-communications",
      title: "Communications and Social Media",
      category: "Digital Media & Brand",
      status: "Recruiting",
      duties: [
        "Manage BOLD’s online presence and branding",
        "Create content for social media, newsletters, and marketing materials",
        "Develop strategies to engage with BOLD’s audience",
        "Promote events, initiatives, and organizational achievements",
        "Monitor social media trends and respond to community engagement",
        "Monitor BOLD Gmail and update the Google Classroom",
        "Responds to DMs and general inquiries"
      ]
    }
  ],

  // BOLD Organizational Structure & Team
  team: [
    {
      id: "chase-moore",
      name: "Chase Moore",
      role: "Director of Outreach",
      status: "Active Director",
      bio: "Chase Moore is a first-year medical student at Western University’s Schulich School of Medicine & Dentistry. As Director of Outreach for BOLD, Chase leads secondary school engagement, campus workshops, and provincial partnerships to empower Black youth across Ontario to envision and achieve their post-secondary ambitions.",
      image: "assets/images/chase-moore.jpg",
      institution: "Western University — Schulich School of Medicine",
      isPrimary: true
    },
    {
      id: "placeholder-exec-1",
      name: "Open Position",
      role: "Regional Lead",
      status: "Accepting Applications",
      bio: "Leads regional operations, establishes local high school partnerships, and expands BOLD's footprint across key Ontario school boards.",
      image: null,
      isPlaceholder: true
    },
    {
      id: "placeholder-exec-2",
      name: "Open Position",
      role: "Event Planner / Logistics",
      status: "Accepting Applications",
      bio: "Coordinates in-person and digital workshops, designs workshop catalogs, and oversees smooth logistics and attendee experience.",
      image: null,
      isPlaceholder: true
    },
    {
      id: "placeholder-exec-3",
      name: "Open Position",
      role: "Communications & Social Media",
      status: "Accepting Applications",
      bio: "Manages BOLD's digital presence, @BOLD.Ontario channels, newsletter outreach, and community engagement initiatives.",
      image: null,
      isPlaceholder: true
    },
    {
      id: "placeholder-exec-4",
      name: "Open Position",
      role: "Finance Lead",
      status: "Accepting Applications",
      bio: "Oversees fundraising campaigns, grant applications, and responsible student-led budget allocations.",
      image: null,
      isPlaceholder: true
    },
    {
      id: "placeholder-exec-5",
      name: "Open Position",
      role: "High School Advisory Member",
      status: "Accepting Applications",
      bio: "Represents secondary student perspectives to ensure BOLD programs directly reflect current student priorities and ambitions.",
      image: null,
      isPlaceholder: true
    }
  ],

  // Tailored Frequently Asked Questions
  faqs: [
    {
      q: "What is BOLD?",
      a: "BOLD (Black Outreach Leadership Directive) is a student-led community initiative committed to increasing and enabling Black student success at the post-secondary level."
    },
    {
      q: "Who does BOLD serve?",
      a: "BOLD supports Black students exploring or navigating post-secondary education, and works with the families, educators, and organizations around them."
    },
    {
      q: "How can I volunteer or become a student leader?",
      a: "Complete the interest form on our Become a Member page or scan our Student / Executive QR codes. Current student and executive roles are actively recruiting across Ontario."
    },
    {
      q: "How can my school request an outreach presentation?",
      a: "Send us a request through the Partnerships page or the contact form and choose “School outreach request”. You can also reach our Outreach team directly at bold.cos@gmail.com."
    },
    {
      q: "Does BOLD offer mentorship?",
      a: "Connecting students with mentors is a core part of BOLD's work. Current mentorship availability and cohort details are posted on the Programs & Resources page."
    },
    {
      q: "How can an organization partner with BOLD?",
      a: "Use the partnership inquiry form on the Partnerships page and tell us what you'd like to explore together, or email bold.cos@gmail.com."
    },
    {
      q: "How can I support BOLD financially?",
      a: "Visit the Donate page to register your interest as a donor or sponsor. Contributions directly support student workshops, campus visit transport, and educational resources."
    },
    {
      q: "Where does BOLD operate?",
      a: "BOLD is active across Ontario, including high school outreach in London and Southwestern Ontario, the Greater Toronto Area, and expanding regional communities."
    },
    {
      q: "How can I stay informed about upcoming events?",
      a: "Subscribe to our newsletter in the footer, check the Events page, or follow @BOLD.Ontario on Instagram."
    }
  ]
};

if (typeof window !== "undefined") {
  window.BOLD_DATA = BOLD_DATA;
}
