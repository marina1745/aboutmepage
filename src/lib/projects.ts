// src/lib/projects.ts
// ===================================================================================
// Types
// ===================================================================================
export type ProjectCategory = "game" | "non-game";

// Support all three shapes for images: plain string, imagetools meta, imagetools picture
export type ImgString  = string;
export type ImgMeta    = { src: string; srcset?: string; width?: number; height?: number };
export type ImgPicture = { img: { src: string; srcset?: string }, sources: { avif?: string; webp?: string; jpeg?: string } };
export type ImgAny     = ImgString | ImgMeta | ImgPicture;

export interface MediaItemCommon {
  alt?: string;
  caption?: string;
}

export interface MediaItemImage extends MediaItemCommon {
  type: "image";
  src: ImgAny;            // imagetools picture bundle (recommended) or string
}
export interface MediaItemVideo extends MediaItemCommon {
  type: "video";
  src: string;            // local file in assets/projectmedia or /public (string ok)
  poster?: string;
}
export interface MediaItemYouTube extends MediaItemCommon {
  type: "youtube";
  src: string;            // full YouTube URL or id (your renderer decides)
}
export interface MediaItemAudio extends MediaItemCommon {
  type: "audio";
  src: string;            // local audio file
}
export type MediaItem = MediaItemImage | MediaItemVideo | MediaItemYouTube | MediaItemAudio;

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  tags?: string[];
  body?: string;
  media?: MediaItem[];
  github?: string;
  links?: ProjectLink[];
}

// ===================================================================================
// Globs (eager) — all under src/assets/projectmedia with your existing filenames
// ===================================================================================

// Images -> imagetools <picture> bundles (keep ?imagetools FIRST)
const pictureMods = import.meta.glob<ImgPicture>(
  "../assets/projectmedia/*.{png,jpg,jpeg,webp}?imagetools&w=720;1200;1600&format=avif;webp;jpg&as=picture",
  { eager: true }
);

// Raw images as strings (fallback option if needed)
const rawImageMods = import.meta.glob<string>(
  "../assets/projectmedia/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

// Videos & audio -> plain strings
const videoMods = import.meta.glob<string>(
  "../assets/projectmedia/*.{mp4,webm,mov}",
  { eager: true, import: "default" }
);
const audioMods = import.meta.glob<string>(
  "../assets/projectmedia/*.{mp3,wav,ogg}",
  { eager: true, import: "default" }
);

// Small helper to build the glob key from filename
const K = (name: string) => `../assets/projectmedia/${name}`;

// Resolve a filename to an imagetools picture bundle; fall back to raw URL if needed.
function pic(name: string): ImgAny {
  const keyWithQuery = `${K(name)}?imagetools&w=720;1200;1600&format=avif;webp;jpg&as=picture`;
  if (pictureMods[keyWithQuery]) return pictureMods[keyWithQuery] as ImgPicture;
  if (rawImageMods[K(name)]) return rawImageMods[K(name)] as string;
  // As a last resort, return a string path so nothing crashes
  return `/projectmedia/${name}`;
}

// Resolve to video/audio URLs
function vid(name: string): string {
  return (videoMods[K(name)] as unknown as string) ?? `/projectmedia/${name}`;
}
function aud(name: string): string {
  return (audioMods[K(name)] as unknown as string) ?? `/projectmedia/${name}`;
}

// Shorthand builders
const I = (name: string, alt?: string): MediaItemImage => ({ type: "image", src: pic(name), alt });
const V = (name: string, caption?: string): MediaItemVideo => ({ type: "video", src: vid(name), caption });
const A = (name: string, caption?: string): MediaItemAudio => ({ type: "audio", src: aud(name), caption });
const YT = (url: string, caption?: string): MediaItemYouTube => ({ type: "youtube", src: url, caption });

// ===================================================================================
// Projects (all media now resolved from src/assets/projectmedia/* with SAME filenames)
// ===================================================================================

export const projects: Project[] = [
  // -------------------------------------------------------------------------------
  // Campus Wars
  // -------------------------------------------------------------------------------
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
      I("campuswars1.png", "Campus Wars – Screen 1"),
      I("campuswars2.png", "Campus Wars – Screen 2"),
      I("campuswars3.png", "Campus Wars – Screen 3"),
    ],
    github: "https://github.com/marina1745/campus_wars",
    links: [
      { label: "▶️ Youtube", href: "https://www.youtube.com/watch?v=V3tVxyCp6qk&t=1s" },
    ],
  },

  // -------------------------------------------------------------------------------
  // Sneaky Sneaky
  // -------------------------------------------------------------------------------
  {
    slug: "sneaky_sneaky",
    title: "Sneaky Sneaky",
    summary: "3D stealth puzzle game where sound is your greatest weapon",
    tags: ["Unity", "C#", "Audio Design"],
    category: "game",
    body:
      "In *Sneaky Sneaky*, you’re a mischievous little mouse on a daring mission: steal the cheese without getting caught! " +
      "The restaurant kitchen is bustling with noisy pots, sizzling pans, and grumpy chefs who won’t hesitate to chase you down if they hear something suspicious.\n\n" +
      "Use sound to your advantage: knock over utensils, make a little noise, and lure the chefs away from your path while you sneak closer to the prize. " +
      "But be careful! Too much noise and you’ll end up as tomorrow’s menu!\n\n" +
      "Part of the foley sounds were recorded and edited by ourselves.",
    media: [
      I("sneaky1.png", "Sneaky Sneaky – Screenshot"),
      V("SneakyTrailer.mp4", "Sneaky Sneaky – Trailer"),
      V("sneakyGameplay.mp4", "Sneaky Sneaky – Gameplay 1"),
      V("sneakyGameplay2.mp4", "Sneaky Sneaky – Gameplay 2"),
    ],
    github: "https://github.com/marina1745/SneakySneaky",
  },

  // -------------------------------------------------------------------------------
  // Tempora Facta Casa
  // -------------------------------------------------------------------------------
  {
    slug: "tempora_facta_casa",
    title: "Tempora Facta Casa",
    summary: "Serious 3D exploration game about architecture and the beauty of wood’s decay",
    tags: ["Unity", "C#", "Blender"],
    category: "game",
    body:
      "*Tempora Facta Casa* is a collaborative project with architecture students, created to explore the poetic side of architecture — and the quiet beauty of wood as it changes over time.\n\n" +
      "In the game, you wander through wooden structures, uncover hidden notes, and manipulate time to observe how weather and decay gradually transform the material. " +
      "It’s a contemplative experience that blurs the line between game and exhibition piece, highlighting wood as both a renewable and ephemeral building material.\n\n" +
      "All house models, textures, and shaders were custom-made to authentically capture the look and feel of wood aging across the years.",
    media: [
      I("tempora1.jpg", "Tempora Facta Casa – Shot 1"),
      I("tempora2.png", "Tempora Facta Casa – Shot 2"),
      I("tempora3.png", "Tempora Facta Casa – Shot 3"),
      V("temporaTrailer.mp4", "Tempora Facta Casa – Trailer"),
    ],
  },

  // -------------------------------------------------------------------------------
  // Kingdom of Colors
  // -------------------------------------------------------------------------------
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
      V("kingdom.mp4", "Kingdom of Colors – Demo"),
    ],
    github: "https://github.com/starflowered/Kingdom_Of_Colors",
  },

  // -------------------------------------------------------------------------------
  // Escape Ancient China VR
  // -------------------------------------------------------------------------------
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
      { label: "🎥 Presentation", href: "https://marinaweber.me/presentationAncientChina.pdf" },
    ],
    media: [
      I("china (1).png", "Escape Ancient China – Room 1"),
      I("china (4).png", "Escape Ancient China – Room 2"),
      I("china (3).png", "Escape Ancient China – Room 3"),
      I("china (2).png", "Escape Ancient China – Room 4"),
      I("portal.png", "Escape Ancient China – Portal"),
    ],
  },

  // -------------------------------------------------------------------------------
  // Just Another Kaindorf Story
  // -------------------------------------------------------------------------------
  {
    slug: "kaindorf_story",
    title: "Just Another Kaindorf Story",
    summary: "2D pixel-art puzzle adventure",
    tags: ["Unity", "C#", "Pixel Art", "Game Design"],
    category: "game",
    body:
      "\"Just Another Kaindorf Story\" is one of my first game projects — a 2D puzzle adventure entirely developed in Unity, featuring hand-drawn pixel art created by myself. " +
      "The game follows a mysterious storyline set in the HTBLA Kaindorf, where your friends suddenly vanish and unsettling noises echo from the basement. " +
      "As you search for them, you must avoid the principal, who randomly appears and keeps a watchful eye on disobedient students. " +
      "The project focused on level design and building atmosphere through minimalist visuals and sound.",
    media: [
      I("kaindorf.png", "Kaindorf Story – Screenshot"),
    ],
  },

  // -------------------------------------------------------------------------------
  // Game Physics Simulation
  // -------------------------------------------------------------------------------
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
      V("cloth_physics.mp4", "Cloth physics"),
      V("mouse_physics.mp4", "Mouse-to-3D interaction"),
      V("collision.mp4", "Rigid body collisions"),
    ],
    github: "https://github.com/marina1745/GamePhysics_Clone",
  },

  // -------------------------------------------------------------------------------
  // Anthem Trailer – Foley
  // -------------------------------------------------------------------------------
  {
    slug: "anthem_trailer_foley",
    title: "Anthem Trailer – Complete Foley Recreation",
    summary: "Sound design and foley recreation for a AAA game trailer",
    tags: ["Audio Design", "Foley", "Sound Editing"],
    category: "non-game",
    body:
      "A full audio recreation of the official *Anthem* game trailer, with every sound effect and ambient cue recorded, performed, and edited by myself. " +
      "All foley elements — including footsteps, armor movement, environmental textures, and weapon sounds — were captured using everyday materials and digitally layered to achieve cinematic depth. " +
      "The project focused on synchronizing sound to visual motion, creative sound sourcing, and building an immersive audio atmosphere without using any of the original trailer’s audio. " +
      "This exercise strengthened my understanding of sound perception, timing, and production workflow for interactive media.",
    media: [ V("foley.mp4", "Anthem Trailer – Foley recreation") ],
  },

  // -------------------------------------------------------------------------------
  // Database Implementation
  // -------------------------------------------------------------------------------
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
      // If you later add an image: I("database_impl.png", "DB Impl – Diagram"),
    ],
    github: "https://github.com/marina1745/tinydb_impl",
  },

  // -------------------------------------------------------------------------------
  // Game Music Composition
  // -------------------------------------------------------------------------------
  {
    slug: "game_music_composition",
    title: "Game Music Composition",
    summary: "Original background music composed as an experiment in creating immersive in-game atmosphere",
    tags: ["Audio Design", "Music Composition", "Digital Audio Workstation", "Sound Design"],
    category: "non-game",
    body:
      "This piece represents my first attempt at creating original background music for games. " +
      "I wanted to explore how melody, harmony, and rhythm can shape the emotional tone of a gameplay scene.",
    media: [ A("Composing_final.mp3", "Game BGM") ],
  },

  // -------------------------------------------------------------------------------
  // Privacy VR
  // -------------------------------------------------------------------------------
  {
    slug: "privacy_vr",
    title: "Exploring the Impact of LLM-Powered Virtual Spaces on Privacy",
    summary: "VR experiment revealing how eye tracking data can expose personal information",
    tags: ["Unity", "Varjo XR-3", "SteamVR", "Ready Player Me", "OpenAI API", "AWS Polly", "Python", "Eye Tracking"],
    category: "non-game",
    body:
      "This project is part of a research-focused virtual reality experiment developed at the Technical University of Munich. " +
      "The goal was to investigate whether sensitive personal information—such as age, gender, ethnicity, or body weight—can be inferred from eye tracking data alone. " +
      "We built a Unity-based XR application featuring several interactive task rooms, each designed to elicit distinct gaze and behavioral patterns while participants performed simple tasks in VR.\n\n" +
      "Sixty-nine participants completed the study using the Varjo XR-3 headset with integrated 200 Hz eye tracking. " +
      "Each room targeted a specific attribute: a gender-based object ranking task, an age-based memory reconstruction task, an ethnicity-based NPC interaction scene, and a food preference task related to BMI. " +
      "Statistical analysis confirmed measurable correlations between gaze behavior and personal attributes, demonstrating the privacy risks of future XR systems.\n\n" +
      "The experiment also integrated AI-driven NPCs powered by the OpenAI API, Amazon Polly for speech synthesis, and Ready Player Me avatars for realistic diversity. " +
      "Python scripts were used for data analysis (Mann–Whitney U tests, regression models, and visualization). " +
      "This project highlights both the scientific potential and the privacy challenges of eye tracking in modern immersive environments.",
    links: [
      { label: "📄 Report", href: "https://marinaweber.me/privacyReport.pdf" },
      { label: "📈 Analysis Scripts", href: "https://github.com/marina1745/idp_analysis_scripts/tree/master" },
    ],
    media: [
      I("ageroom (1).png", "Privacy VR – Age room"),
      I("ethnicityroom (1).png", "Privacy VR – Ethnicity room"),
      I("genderroom.png", "Privacy VR – Gender room"),
      I("robot.png", "Privacy VR – Robot task"),
      I("weightroom.png", "Privacy VR – BMI/food preference room"),
      I("tutorialroom.png", "Privacy VR – Tutorial room"),
    ],
  },

  // -------------------------------------------------------------------------------
  // Patient Information System
  // -------------------------------------------------------------------------------
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
      { label: "📄 Full Thesis (PDF)", href: "/patienteninformationssystem.pdf" },
    ],
  },

  // -------------------------------------------------------------------------------
  // Bachelor Thesis — Integrity of Space
  // -------------------------------------------------------------------------------
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
      // Add an image later if you have one: I("bachelor_thesis.png", "Thesis – Diagram"),
    ],
  },

  // -------------------------------------------------------------------------------
  // Terrain Rendering Project
  // -------------------------------------------------------------------------------
  {
    slug: "renderproject",
    title: "Terrain Rendering Project",
    summary: "Experiment that visualizes procedural terrain generation using DirectX 11",
    tags: ["C++", "DirectX 11", "DXUT", "Procedural Generation", "Shader Programming", "HLSL"],
    category: "non-game",
    body:
      "In this project, I implemented a terrain rendering framework from scratch using DirectX 11. The system procedurally generates realistic landscapes via a diamond-square algorithm and renders them with dynamic lighting and texturing. " +
      "The pipeline includes a custom shader for lighting and texture blending, vertex and index buffer generation for large terrains, and real-time camera navigation. " +
      "The project showcases the complete workflow from data generation (heightmap, colormap, and normal map creation) to GPU-accelerated rendering and shader management.",
    media: [
      I("rendergame.png", "Terrain Rendering – Screenshot"),
    ],
    github: "https://github.com/marina1745/ged_upload",
  },

  // -------------------------------------------------------------------------------
  // Birthday Paradox
  // -------------------------------------------------------------------------------
  {
    slug: "brithday paradox",
    title: "Birthday Paradox Implementation",
    summary: "Low-level experiment exploring mathematical probability and assembly optimization",
    tags: ["C", "Assembly (x86-64)", "SSE", "GCC"],
    category: "non-game",
    body:
      "In this project, we implemented the formula to compute the probability that two people share the same birthday given a room of n people entirely in Assembly. " +
      "We did not use high-level library calls and instead implemented different approaches to compute the square root and logarithms, such as the Taylor expansion. " +
      "Our implementation then was compared to a compiler-optimized C implementation in terms of runtime and precision.",
    media: [
      I("analysis.png", "Birthday Paradox – Analysis 1"),
      I("analysis2.png", "Birthday Paradox – Analysis 2"),
    ],
    github: "https://github.com/marina1745/geburtstagsparadoxon",
  },

  // -------------------------------------------------------------------------------
  // React Debate Trainer
  // -------------------------------------------------------------------------------
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
      "This project served as a prototype for experimenting with large language model interaction patterns and prompt design within a web-based educational tool. " +
      "Also, the website is available in German, English and Mandarin Chinese.",
    media: [
      I("debate.png", "React Debate Trainer – Screenshot"),
    ],
    github: "https://github.com/marina1745/ReactDebateTrainer",
  },

  // -------------------------------------------------------------------------------
  // RTS Demo (Unreal)
  // -------------------------------------------------------------------------------
  {
    slug: "rts_demo_unreal",
    title: "RTS Demo in Unreal",
    summary: "Small prototype built to explore real-time strategy mechanics in Unreal Engine",
    tags: ["C++", "Unreal Engine", "HUD", "Terrain Creation", "RTS Mechanics"],
    category: "game",
    body:
      "RTS Demo in Unreal is a small real-time strategy prototype I created to get hands-on experience with Unreal Engine’s gameplay framework and C++ workflow. " +
      "The project includes core RTS features such as selecting and commanding units, placing buildings, and managing player input through a custom heads-up display. " +
      "I also experimented with terrain sculpting and material painting to create an interactive environment suitable for base building and navigation. " +
      "This project served as a personal sandbox to better understand how RTS systems can be structured in Unreal — from input handling and unit control to camera movement and actor communication.",
    media: [
      I("rts1.png", "RTS Demo – Screenshot"),
    ],
    github: "https://github.com/marina1745/RTS_Demo",
  },
];

// Quick lookup map (optional)
export const projectsBySlug = Object.fromEntries(projects.map(p => [p.slug, p]));
