// src/lib/projects.ts
export type ProjectCategory = "game" | "non-game";

export interface MediaItem {
  type: "image" | "video" | "youtube";
  src: string;          // e.g. "/media/privacy-vr/shot1.jpg"
  alt?: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  tags?: string[];
  body?: string;        // simple rich text (markdown-ish is fine)
  media?: MediaItem[];  // images & videos
  github?: string;
  links?: ProjectLink[];
}
export interface ProjectLink {
  label: string;
  href: string;
}

export const projects: Project[] = [
  {
   
  slug: "campus_wars",
  title: "Campus Wars",
  summary: "Mobile serious game combining social interaction, quizzing, and campus exploration",
  tags: ["Android Studio", "Java", "MongoDB", "Flask", "Python", "Google Maps"],
  category: "game",
  body:
    "Campus Wars is a mobile serious game designed to promote social interaction and learning among university students. " +
    "Players form teams and compete to conquer lecture halls across campus by winning subject-specific quizzes tied to the lecture currently taking place in each hall. " +
    "The game encourages collaboration, academic engagement, and a sense of community through playful competition. " +
    "To enable real-time integration with campus activities, we analyzed and monitored the network traffic of the campus.tum.de platform " +
    "to understand how lecture schedules, locations, and student information were exchanged and used this data to dynamically power the gameplay.",
  media: [
    { type: "image", src: "/projectmedia/campuswars1.png" },
    { type: "image", src: "/projectmedia/campuswars2.png" },
    { type: "image", src: "/projectmedia/campuswars3.png" },
  ],
  github: "https://github.com/marina1745/campus_wars",


  },
  {
    slug: "sneaky_sneaky",
    title: "Sneaky Sneaky",
    summary: "Puzzle, Foley, 3D",
    tags: ["Unity", "C#", "Audio"],
    category: "game",
    body:
	"In sneaky sneaky, you play a tiny mouse trying to steal cheese from a restaurant kitchen. If a chef catches you, it is game over. "+
	"The different kitchen equipment makes noise. If the chef notices unusual sounds, they will check where it came from. Use this to your advantage!"
	+"\nThe entire audio in this game was created by ourselves."
      ,
    media: [
     
      { type: "image", src: "/projectmedia/sneaky1.png" },
	  { type: "video", src: "/projectmedia/SneakyTrailer.mp4" },
		  
    ],
  },
  {
    slug: "Tempora_Facta_Casa",
    title: "Tempora Facta Casa",
    summary: "Serious game, architecture, wood, 3D",
    tags: ["Unity", "C#", "Blender"],
    category: "game",
    body:
      "This project was a collaboration with students from the architecture department. " +
      "The goal was to showcase the beauty of wood and its natural decay. In architecture, wood is a renewable resource since it grows and it can easily be disposed. "
	  +"This makes it an attractive material. \n"+
	  "The gameplay is rather simple: Inspect the buildings, find hidden notes to learn more, and manipulate time to view how wood changes over the years depending on different weather conditions.",
    media: [
     { type: "image", src: "/projectmedia/tempora1.jpg" },
	 { type: "image", src: "/projectmedia/tempora2.png" },
	 { type: "image", src: "/projectmedia/tempora3.png" },
     { type: "video", src: "/projectmedia/temporaTrailer.mp4" },
    ],
  },
  {
  slug: "kingdom_of_colors",
  title: "Kingdom of Colors",
  summary: "Tile-matching puzzle game with computer vision and AR elements",
  tags: ["C++", "OpenCV", "Computer Vision", "Game Logic", "Augmented Reality"],
  category: "game",
  body:
    "Kingdom of Colors is a tile-matching puzzle game where players connect sides of matching colors to earn points. " +
    "The more sides matched correctly, the higher the score — with randomized missions adding extra layers of challenge and replayability. " +
    "The game was built entirely in C++ using OpenCV, implementing custom image processing and rendering logic without a traditional game engine. " +
    "An experimental augmented reality mode was also prototyped, allowing players to visualize tiles and interactions in a real-world environment.",
  media: [
    { type: "video", src: "/projectmedia/kingdom.mp4" },
  ],
  github: "https://github.com/starflowered/Kingdom_Of_Colors",
},

{
  slug: "react_debate_trainer",
  title: "React Debate Trainer",
  summary: "Interactive web app demonstrating OpenAI API integration for debate practice",
  tags: ["React", "TypeScript", "OpenAI API", "Node.js", "Express"],
  category: "non-game",
  body:
    "React Debate Trainer is a full-stack web application built as an exercise to integrate the OpenAI API into a custom React app. " +
    "It allows users to generate and structure debate topics, receive AI-generated counterarguments, and simulate interactive discussion rounds. " +
    "The frontend was developed with React and TypeScript, focusing on a clean and responsive user interface, while the backend was implemented using Node.js and Express to handle API communication and data flow. " +
    "This project served as a prototype for experimenting with large language model interaction patterns and prompt design within a web-based educational tool. "+
    "Also, the website is available in German, English and Mandarin Chinese.",
  media: [
    { type: "image", src: "/projectmedia/debate.png" },
    // add demo or screenshot if available, e.g. { type: "image", src: "/projectmedia/debatetrainer.png" },
  ],
  github: "https://github.com/marina1745/ReactDebateTrainer",
},

 {
  slug: "escape_ancient_china",
  title: "Escape Ancient China VR",
  summary: "Educational VR escape room teaching Chinese history",
  tags: ["Unity", "C#", "Varjo XR-3", "SteamVR", "OpenAI API", "D-ID API"],
  category: "game",
  body:
    "Escape Ancient China VR is a serious game developed in Unity for the Varjo XR-3 headset. The player, a university student who accidentally time-travels to ancient China, must escape three rooms representing different dynasties—the Qin, Han, and Tang periods—by solving historically themed puzzles.\n\n" +
    "Each room introduces key cultural and technological milestones, such as traditional weapons, papermaking, or the imperial government system. Puzzles are designed to teach history implicitly through gameplay, aligning with the serious games principle of 'learning through play.'\n\n" +
    "To assist players, the game features interactive AI-driven 'talking portraits' of historical emperors. Their dialogues are dynamically generated using the OpenAI API and lip-synced via the D-ID API, creating lifelike responses and deepening immersion.\n\n" +
    "I was responsible for the overall environment design, puzzle and gameplay implementation, interaction system, animation flow, API integration, and Varjo VR setup. The project was part of the Serious Games in Extended Reality course at the Technical University of Munich.",
  links: [
    { label: "📄 Report", href: "https://marinaweber.me/reportAncientChina.pdf" },
    { label: "🎥 Presentation", href: "https://marinaweber.me/presentationAncientChina.pdf" }
  ],
  media: [
    { type: "image", src: "/projectmedia/china (1).png" },
    { type: "image", src: "/projectmedia/china (4).png" },
    { type: "image", src: "/projectmedia/china (3).png" },
    { type: "image", src: "/projectmedia/china (2).png" },
    { type: "image", src: "/projectmedia/portal.png" }
  ]
},

{
  slug: "kaindorf_story",
  title: "Just Another Kaindorf Story",
  summary: "2D pixel-art puzzle adventure",
  tags: ["Unity", "C#", "Pixel Art", "Game Design"],
  category: "game",
  body:
    "\"Just Another Kaindorf Story\" is one of my first game projects — a 2D puzzle adventure entirely developed in Unity, featuring hand-drawn pixel art created by myself. " +
    "The game follows a mysterious storyline set in a seemingly ordinary school, where your friends suddenly vanish and unsettling noises echo from the basement. " +
    "As you search for them, you must avoid the principal, who randomly appears and keeps a watchful eye on disobedient students. " +
    "The project focused on level design and building atmosphere through minimalist visuals and sound.",
  media: [
    { type: "image", src: "/projectmedia/kaindorf.PNG" },
  ],
},
{
  slug: "game_physics_simulator",
  title: "Game Physics Simulation",
  summary: "Physics simulations for games: springs, collisions, and diffusion",
  tags: ["C++", "Physics Simulation", "DirectX", "Numerical Methods", "Collision Detection"],
  category: "non-game",
  body:
    "A collection of physics simulations implemented entirely in C++, focusing on realistic behavior for potential game integration. " +
    "The project includes a mass–spring system for cloth and elastic object simulation, a rigid-body system with 3D collision detection and impulse response, and a 2D diffusion solver using both explicit and implicit methods. " +
    "The mass–spring simulation features an interactive mouse-to-3D mapping system I implemented myself, allowing users to directly grab and manipulate points in 3D space. " +
    "All systems were built from scratch without external physics engines, demonstrating deep understanding of numerical integration, physical modeling, and real-time simulation design.",
  media: [
    { type: "video", src: "/projectmedia/cloth_physics.mp4" },
    { type: "video", src: "/projectmedia/mouse_physics.mp4" },
    { type: "video", src: "/projectmedia/collision.mp4" },
  ],
  github: "https://github.com/marina1745/GamePhysics_Clone",
},

{
  slug: "anthem_trailer_foley",
  title: "Anthem Trailer – Complete Foley Recreation",
  summary: "Sound design and foley recreation for a AAA game trailer",
  tags: ["Audio Design", "Foley", "Sound Editing", ],
  category: "non-game",
  body:
    "A full audio recreation of the official *Anthem* game trailer, with every sound effect and ambient cue recorded, performed, and edited by myself. " +
    "All foley elements — including footsteps, armor movement, environmental textures, and weapon sounds — were captured using everyday materials and digitally layered to achieve cinematic depth. " +
    "The project focused on synchronizing sound to visual motion, creative sound sourcing, and building an immersive audio atmosphere without using any of the original trailer’s audio. " +
    "This exercise strengthened my understanding of sound perception, timing, and production workflow for interactive media.",
  media: [
    { type: "video", src: "/projectmedia/foley.mp4" },
  ],
},


  
 {
  slug: "database_impl",
  title: "Simple Database Implementation",
  summary: "Fully functional relational database prototype with query optimizer and operator execution engine",
  tags: ["C++", "Query Optimization", "Database Systems", "Memory Management"],
  category: "non-game",
  body:
    "This project is a custom-built miniature relational database written entirely in C++, designed to deepen my understanding of database internals and query execution. " +
    "It implements core components of a real database system, including table management, query parsing, and an execution engine built around the **iterator model**. " +
    "Supported operations include table scans, selections, projections, joins (hash and cross product), and group-by aggregations. " +
    "The system also features a cost-based query optimizer using **Greedy Operator Ordering (GOO)** and a parser for simplified SQL SELECT-FROM-WHERE queries. " +
    "Additional aspects such as memory management, index handling, and basic query optimization strategies were implemented manually to simulate the behavior of real-world DBMS components. " +
    "Through this project, I gained hands-on experience in query planning, relational algebra, and low-level data representation.",
  media: [
    // e.g. { type: "image", src: "/projectmedia/database_impl.png" },
  ],
  github: "https://github.com/marina1745/tinydb_impl",
},

  {
  slug: "privacy_vr",
  title: "Privacy VR Project",
  summary: "VR experiment revealing how eye tracking data can expose personal information",
  tags: ["Unity", "Varjo XR-3", "SteamVR", "Ready Player Me", "OpenAI API", "AWS Polly", "Python", "Eye Tracking"],
  category: "non-game",
  body:
    "Privacy VR is a research-focused virtual reality experiment developed at the Technical University of Munich. " +
    "The goal was to investigate whether sensitive personal information—such as age, gender, ethnicity, or body weight—can be inferred from eye tracking data alone. " +
    "We built a Unity-based XR application featuring several interactive task rooms, each designed to elicit distinct gaze and behavioral patterns while participants performed simple tasks in VR.\n\n" +
    "Sixty-nine participants completed the study using the Varjo XR-3 headset with integrated 200 Hz eye tracking. " +
    "Each room targeted a specific attribute: a gender-based object ranking task, an age-based memory reconstruction task, an ethnicity-based NPC interaction scene, and a food preference task related to BMI. " +
    "Statistical analysis confirmed measurable correlations between gaze behavior and personal attributes, demonstrating the privacy risks of future XR systems.\n\n" +
    "The experiment also integrated AI-driven NPCs powered by the OpenAI API, Amazon Polly for speech synthesis, and Ready Player Me avatars for realistic diversity. " +
    "Python scripts were used for data analysis (Mann–Whitney U tests, regression models, and visualization). " +
    "This project highlights both the scientific potential and the privacy challenges of eye tracking in modern immersive environments.",
  links: [
    { label: "📄 Report", href: "https://marinaweber.me/privacyReport.pdf" }
  ],
  media: [
    { type: "image", src: "/projectmedia/ageroom (1).png" },
    { type: "image", src: "/projectmedia/ethnicityroom (1).png" },
    { type: "image", src: "/projectmedia/genderroom.png" },
    { type: "image", src: "/projectmedia/robot.png" },
    { type: "image", src: "/projectmedia/weightroom.png" },
    { type: "image", src: "/projectmedia/tutorialroom.png" }
  ]
},
{
  slug: "patient_information_system",
  title: "Patient Information System",
  summary: "Desktop application that helps patients estimate the severity of their health problems",
  tags: ["C#", "WPF", "SQL", "Google Maps API", "Azure DevOps", "Git", "BORA Framework"],
  category: "non-game",
  body:
    "The 'Patient Information System' was developed as part of my diploma thesis at the Higher Technical College of Kaindorf in collaboration with BOOM Software AG. " +
    "The project aimed to create a prototype that enables users to perform a self-assessment of their symptoms and receive recommendations for the most suitable type of doctor. " +
    "By answering a series of guided questions, patients receive a preliminary diagnosis and a list of nearby specialists capable of treating their condition.\n\n" +
    "The system was implemented using the BORA enterprise framework, C#, and WPF for the user interface, with Microsoft SQL Server for persistent data storage. " +
    "It integrates Google Maps for navigation, allowing patients to view the fastest route to the selected doctor. " +
    "The application also supports doctor-side functionality: doctors can be notified about incoming patients and access symptom data before their arrival, helping to reduce examination time.\n\n" +
    "My main responsibilities included project management, data collection on illnesses, and the development of the self-diagnosis algorithm. " +
    "This project strengthened my understanding of object-oriented design, database systems, and real-world software deployment within a medical context.",
  links: [
    { label: "📄 Full Thesis (PDF)", href: "/patienteninformationssystem.pdf" }
  ],
  
},


{
  slug: "bachelor_thesis_integrity_space",
  title: "A Functional Gamespace Model – Hierarchical Graphs and Spatial Partitioning Based on the Integrity of Space",
  summary: "Bachelor thesis exploring hierarchical graph structures for procedural world generation",
  tags: ["C++", "Unity", "Procedural Generation", "Graph Theory", "Spatial Partitioning"],
  category: "non-game",
  body:
    "My Bachelor's thesis focused on developing a formalized model for representing and partitioning game worlds through hierarchical graph structures. " +
    "The system introduces the concept of *spatial integrity*, ensuring logical coherence between procedurally generated regions such as forests, deserts, and mountains. " +
    "Terrain was segmented using Voronoi-based partitioning from designer-defined seed points, producing naturally connected biomes that preserve spatial hierarchy and continuity. " +
    "The project also included custom Unity Editor tooling for region definition, visualization, and rapid iteration of procedural world layouts. " +
    "The result is a foundational framework for adaptive level design and world-building tools in modern game engines.",
  media: [
    // e.g. { type: "image", src: "/projectmedia/bachelor_thesis.png" },
  ],
},



  {
    slug: "renderproject",
    title: "Terrain Rendering Project",
    summary: "Experiment that visualizes procedural terrain generation using DirectX 11",
    tags: ["C++", "DirectX 11", "DXUT", "Procedural Generation", "Shader Programming", "HLSL"],
    category: "non-game",
    body: "In this project, I implemented a terrain rendering framework from scratch using DirectX 11. The system procedurally generates realistic landscapes via a diamond-square algorithm and renders them with dynamic lighting and texturing. "+
	"The pipeline includes a custom shader for lighting and texture blending, vertex and index buffer generation for large terrains, and real-time camera navigation. "+
 "The project showcases the complete workflow from data generation (heightmap, colormap, and normal map creation) to GPU-accelerated rendering and shader management.",
   media: [
   { type: "image", src: "/projectmedia/rendergame.png" },
 
    ],
  },
  {
    slug: "brithday paradox",
    title: "Birthday Paradox Implementation",
    summary: "Low-level experiment exploring mathematical probability and assembly optimization",
    tags: ["C", "Assembly (x86-64)", "SSE", "GCC"],
    category: "non-game",
    body: "In this project, we implemented the formula to compute the probability that two people share the same birthday given a room of n people entirely in Assembly."+
"We did not use high-level library calls and instead implemented different approaches to compute the square root and logarithms, such as the Taylor expansion. "+
"Our implementation then was compared to a compiler-optimized C implementation in terms of runtime and precision.",
	media: [
   { type: "image", src: "/projectmedia/analysis.png" },
   { type: "image", src: "/projectmedia/analysis2.png" },
 
    ],
  },
];
