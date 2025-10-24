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
}

export const projects: Project[] = [
  {
    slug: "campus_wars",
    title: "Campus Wars",
    summary: "Mobile game, quiz, serious game, social game",
    tags: ["Android Studio", "Java", "Mongo DB", "Flask", "python", "Google Maps"],
    category: "game",
    body:
      "Build a team with other students and try to conquer all the lecture halls at uni! " +
      "To conquer a lecture hall, defeat other players in the lecture hall in quizzes regarding the currently held lecture hall. " +
      "This game aims to connect students and motivate them to study while playing a fun game." +
      " To implement this game, we monitored the communication of the campus.tum.de web page to access the necessary information to implement the game (lecture timetable, student information, ...) "
	  ,
    media: [
      { type: "image", src: "/projectmedia/campuswars1.png" },
      { type: "image", src: "/projectmedia/campuswars2.png" },
	  { type: "image", src: "/projectmedia/campuswars3.png" },
	 
		  
    ],
    github: "https://ww.google.com",
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
    title: "Kingdom Of Colors",
    summary: "Tile-Matching Puzzle Game",
    tags: ["OpenCV", "AR", "C++"],
    category: "game",
    body:
      "A simple game where you have to match sides of the same color to receive points. The more sides of one tile you match correctly, the higher your score."+
	  " There are randomized missions for extra points."
	  +"\n The game was developed using only OpenCV and C++." ,
    media: [
     
     { type: "video", src: "/projectmedia/kingdom.mp4" },
    ],
  },
  {
    slug: "Escape_ancient_china",
    title: "Escape Ancient China VR",
    summary: "VR Escape Room",
    tags: ["Unity", "C#", "Varjo", "SteamVR", "OpenAI API"],
    category: "game",
    body:
      "You are teleported into ancient China, where evil men hold you hostage. Try to escape before they return!"+
	  "\n In this game, you have to escape three rooms, each representing a different time period and dynasty of Ancient China. Use your knowledge "+
	  "about Chinese history to escape!\n"+
	  "In this game, there are talking portraits who assist the player in case they are stuck. Their answers are generated using OpenAI API and their lip movement and eyes are synced to the speech using the D-iD API.",
    media: [
     
     { type: "image", src: "/projectmedia/china (1).png" },
	 { type: "image", src: "/projectmedia/china (4).png" },
	 { type: "image", src: "/projectmedia/china (3).png" },
	 { type: "image", src: "/projectmedia/china (2).png" },
    ],
  },
{
    slug: "kaindorf_story",
    title: "Just Another Kaindorf Story",
    summary: "2D puzzle game",
    tags: ["Unity", "C#", "Pixel Art"],
    category: "game",
    body: "Your friends mysteriously disappear in school. The school principal seems to know more. There are "+
	"weird noises coming out of the school's basement. Rescue your friends! But be careful, the principal randomly spawns and keeps an "+
	"eye on misbehaving students.",
   media: [
     
     { type: "image", src: "/projectmedia/kaindorf.PNG" },
	
    ],
  },
  
  {
    slug: "database_impl",
    title: "Simple Database Implementation",
    summary: "Small, functional relational database",
    tags: ["C++"],
    category: "non-game",
    body: "I developed my own, small database and learned how to handle aspects such as "+
	"\n- Memory Management"+
	"\n- Query execution"+
	"\n- Query optimization"+
	"\n- Compression" ,
   media: [
    ],
  },
  {
    slug: "privacy",
    title: "Privacy VR Project",
    summary: "Experiment that showcases privacy concerns with VR",
    tags: ["Unity", "SteamVR", "Varjo", "Apple Vision", "Eye Tracking", "Ready Player Me", "Python"],
    category: "non-game",
    body: "In this experiment, we created rooms in which participants are asked to complete simple tasks in "+
	"a VR environment. While doing so, we tracked their eye data (eye movement, fixation, saccades,... )"+
	" and proved that we can confidently predict private information (age, BMI, gender, ethnicity, ...) based on "+
	"eye tracking data alone.",
   media: [
   { type: "image", src: "/projectmedia/ageroom (1).png" },
   { type: "image", src: "/projectmedia/ethnicityroom (1).png" }
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
