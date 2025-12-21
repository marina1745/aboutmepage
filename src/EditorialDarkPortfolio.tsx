
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin } from "lucide-react";
// top of file
import { Suspense, lazy, useEffect, useRef, useState } from "react";
// ↓ replace direct import
// import AestheticCarousel from "./components/AestheticCarousel";
const AestheticCarousel = lazy(() => import("./components/AestheticCarousel"));

import { useLocation, Link } from "react-router-dom";
import { projects } from "./lib/projects";

// EDITORIAL DARK — Single-file React component
// - TailwindCSS for styling
// - Framer Motion for tasteful motion
// - Serif display + sans body (configure fonts in your app.css / index.html):
//   Headline: "Playfair Display" or "Literata"; Body: "Inter" or "General Sans"
// Add to your router or render as <EditorialDarkPortfolio />


// put ?imagetools FIRST
import pic1 from './assets/holidaypics/1.jpeg?imagetools&w=480;768;1200;1600&format=avif;webp;jpg&as=picture';
import pic2 from './assets/holidaypics/2.jpeg?imagetools&w=480;768;1200;1600&format=avif;webp;jpg&as=picture';
import pic3 from './assets/holidaypics/3.jpeg?imagetools&w=480;768;1200;1600&format=avif;webp;jpg&as=picture';
import pic4 from './assets/holidaypics/4.jpeg?imagetools&w=480;768;1200;1600&format=avif;webp;jpg&as=picture';
import pic5 from './assets/holidaypics/5.jpeg?imagetools&w=480;768;1200;1600&format=avif;webp;jpg&as=picture';
import pic6 from './assets/holidaypics/6.jpeg?imagetools&w=480;768;1200;1600&format=avif;webp;jpg&as=picture';

import p1Tiny from './assets/holidaypics/1.jpeg?imagetools&w=24&as=base64';
import p2Tiny from './assets/holidaypics/2.jpeg?imagetools&w=24&as=base64';
import p3Tiny from './assets/holidaypics/3.jpeg?imagetools&w=24&as=base64';
import p4Tiny from './assets/holidaypics/4.jpeg?imagetools&w=24&as=base64';
import p5Tiny from './assets/holidaypics/5.jpeg?imagetools&w=24&as=base64';
import p6Tiny from './assets/holidaypics/6.jpeg?imagetools&w=24&as=base64';




const pics = [
  { meta: pic1, tiny: p1Tiny, alt: "Vienna light show", overlayText:"Colored beams interacting with fog, bark, and ground, revealing the challenge of volumetric scattering and color propagation in real time." },
  { meta: pic2, tiny: p2Tiny, alt: "Cologne Dome", overlayText:"Stained glass transforms sunlight into soft, indirect illumination" },
  { meta: pic3, tiny: p3Tiny , alt: "Hokkaido", overlayText:"Tiny light sources define the entire mood: Specular reflections, subtle ripples, and low-light exposure all need to remain readable without noise or flicker"},
  { meta: pic4, tiny: p4Tiny, alt: "shirakawa-go",overlayText:"Snow appears is a complex topic in rendering: High albedo, soft shadows, and sky-tinted bounce light expose the limits of standard shading models in real-time rendering"},
  { meta: pic5, tiny: p5Tiny, alt: "Hongkong", overlayText: "The neon lights tint entire buildings and streets, challenging real-time pipelines to approximate color bleeding, emissive materials, and lens response."},
  { meta: pic6, tiny: p6Tiny, alt: "Singapore", overlayText:"City lights stretch across water and atmosphere, demanding stable real-time reflections, HDR exposure control, and believable depth through light." },
];


type PictureMeta = {
  img: { src: string; srcset?: string; w?: number; h?: number };
  sources: { avif?: string; webp?: string; jpeg?: string };
};


export default function EditorialDarkPortfolio() {
    return (
        <div className="min-h-screen bg-[#0E0E10] text-zinc-100 antialiased">
            
            <ReadingProgress />
            <main>      
                <Hero />
                <Writing />
                <Interests/>
                <Work />
                <About />
                <Contact />
            </main>
          
        </div>
    );
}



function ReadingProgress() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement;
            const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
            setProgress(scrolled);
        };
        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <div className="fixed left-0 top-[52px] z-50 hidden h-[2px] w-screen bg-transparent md:block">
            <div
                className="h-[2px] bg-zinc-200 transition-[width]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}



function Hero() {

    const location = useLocation();
    const atHome = location.pathname === "/";
    const makeLink = (id: string, label: string) => (
        <a
            href={atHome ? `#${id}` : `/#${id}`}
            onClick={(e) => {
                if (atHome) {
                    e.preventDefault();
                    smoothScroll(id);
                }
            }}
            className="navlink"
        >
            {label}
        </a>
    );
    const smoothScroll = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    return (
        <section id="top" className="relative overflow-hidden">
  <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-end gap-10 px-5 pb-24 pt-20 md:grid-cols-12 md:pt-28">

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="md:col-span-7 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl"
    >
      Games Engineer turned Computer Graphics Researcher at TUM
    </motion.h1>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="md:col-span-5 md:pl-8"
    >
      <p className="max-w-xl text-zinc-300 md:text-lg text-balance">
    I am fascinated by how light, materials, and geometry can be approximated under
  real-time constraints. My work explores physically based rendering, neural
  representations, and high-fidelity lighting with the goal of making complex
  visual phenomena interactive, stable, and controllable.
  </p>
     <div className="mt-6 flex flex-wrap gap-3">
      
        <span className="rounded-2xl border border-white/20 bg-white text-black px-5 py-3 text-sm font-medium hover:bg-zinc-200 inline-flex items-center transition-colors">
          {makeLink("interests", "Learn about my interests")}
          <ArrowUpRight className="ml-1 inline h-4 w-4" />
        </span>
        
        
      </div>
    </motion.div>
  </div>

  <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
    <DeferredCarousel images={pics} />
    <p className="mt-2 text-sm text-zinc-400 text-center">Personal explorations of light, color, and atmosphere in the real world that inform my interest in real-time rendering and appearance modeling (Hover for more info)</p>
  </div>
</section>
    )
}
type Slide = { meta: PictureMeta; tiny: string; alt: string };
type Props = { images: Slide[] };



function slideUrl(s: any): string | null {
  // supports your ?imagetools&as=picture shape OR meta shape
  return s?.meta?.img?.src ?? s?.meta?.src ?? null;
}

function preloadOne(url: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve();
    img.onerror = () => resolve(); // don't block forever on errors
    img.src = url;
  });
}

/** Preload a list; optionally limit concurrency */
async function preloadMany(urls: string[], concurrency = 3) {
  let i = 0;

  async function worker() {
    while (i < urls.length) {
      const cur = urls[i++];
      await preloadOne(cur);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, urls.length) }, worker);
  await Promise.all(workers);
}

function DeferredCarousel({ images }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [nearViewport, setNearViewport] = useState(false);
  const [initialReady, setInitialReady] = useState(false);

  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNearViewport(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport || !images?.length) return;

    // 1) warm up the lazy component module (so it’s ready when we render)
    import("./components/AestheticCarousel");

    // 2) preload first 3 (block carousel until done)
    const first = images.slice(0, 3).map(slideUrl).filter(Boolean) as string[];

    // 3) preload the rest in the background after first 3
    const rest = images.slice(3).map(slideUrl).filter(Boolean) as string[];

    let cancelled = false;

    (async () => {
      // Preload first 3 ASAP (higher concurrency is fine here)
      await preloadMany(first, 3);
      if (cancelled) return;
      setInitialReady(true);

      // Background preload the remaining (lower concurrency so it doesn't hog)
      // fire-and-forget; no need to await
      preloadMany(rest, 2);
    })();

    return () => {
      cancelled = true;
    };
  }, [nearViewport, images]);

  return (
    <div ref={ref} className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <Suspense fallback={<CarouselSkeleton />}>
        {nearViewport && initialReady ? (
          <AestheticCarousel images={images} aspect={36 / 9} innerPad={14} tilePct={70} />
        ) : (
          <CarouselSkeleton />
        )}
      </Suspense>
    </div>
  );
}


function CarouselSkeleton() {
  return (
    <div className="h-[40vw] max-h-[420px] min-h-[220px] bg-white/[0.03] animate-pulse rounded-none" />
  );
}


function Work() {

   
    const chosen = [
        "sneaky_sneaky", "renderproject", "escape_ancient_china"
    ];
    const filtered = projects.filter(p => chosen.includes(p.slug));

    return (
        <section id="work" className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-5 py-20">
                <div className="mb-10 flex items-end justify-between">
                    <h2 className="font-serif text-4xl md:text-5xl">Games & Other Projects</h2> 
                   
                    
                </div>

                 
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {filtered.map(p => (
                        <Link
                            key={p.slug}
                            to={`/work/${p.slug}`}
                            onClick={() => sessionStorage.setItem("from", "home")}
                            className="group block rounded-2xl bg-zinc-900/60 ring-1 ring-zinc-800 p-5 hover:bg-zinc-900 hover:ring-zinc-700 transition"
                        >
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-medium text-zinc-100">{p.title}</h3>
                                <span className="text-zinc-400 group-hover:translate-x-0.5 transition">→</span>
                            </div>
                            <p className="mt-2 text-sm text-zinc-400">{p.summary}</p>
                            {!!p.tags?.length && (
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {p.tags.map(t => (
                                        <span
                                            key={t}
                                            className="text-[11px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 ring-1 ring-zinc-700"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
                     <div className="mt-6 flex flex-wrap gap-3">
                    <p>
                      Over the years, I built a portfolio consisting of projects across different disciplines. I worked on multiple game projects with peers, wrote theses at university and school, and worked on other game and game engine related projects. A comprehensive list of my work can be found in the archive.
                    </p>
                    </div>
     <div className="mt-6 flex flex-wrap gap-3">

                    <span className="rounded-2xl border border-white/20 bg-white text-black px-5 py-3 text-sm font-medium hover:bg-zinc-200 inline-flex items-center transition-colors">
          <Link to="/archive?type=game"  >
                        Archive
                    </Link>
                    
          <ArrowUpRight className="ml-1 inline h-4 w-4" />
          
        </span>
        </div>

            </div>
                                
            

           
        </section>
    );
}

/*function BandQuote() {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_0%,transparent_30%,transparent_70%,rgba(255,255,255,0.06)_100%)]" />
            <div className="mx-auto max-w-6xl px-5 py-16">
                <blockquote className="max-w-3xl text-balance font-serif text-2xl italic text-zinc-200 md:text-3xl">
                    "Design is how it works—and how it feels. I aim for systems that are clear, fast, and quietly delightful."
                </blockquote>
            </div>
        </div>
    );
}
*/

function Writing() {
    const posts = [
      {
            title: "Real-Time Relighting of Temporally Coherent Cloud-Based Gaussian Volumes ",
            date: "2026",
            desc: "Master Thesis",
            href: "/#/work/master_thesis",
        },
      {
            title: "Exploring the Impact of LLM-Powered Virtual Spaces on Privacy",
            date: "2025",
            desc: "Interdisciplinary Research Project in VR",
            href: "/#/work/privacy_vr",
        },
      {
            title: "A Functional Gamespace Model – Hierarchical Graphs and Spatial Partitioning Based on the Integrity of Space",
            date: "2023",
            desc: "Bachelor Thesis",
            href: "/#/work/bachelor_thesis_integrity_space",
        },
        {
            title: "Patient  Information System",
            date: "2019",
            desc: "Diploma Thesis in corporation with Boom Software AG",
            href: "/#/work/patient_information_system",
        },
        
    ];

    return (
        <section id="writing" className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-5 py-20">
                <h2 className="mb-10 font-serif text-4xl md:text-5xl">Theses & Research</h2>
               
                
                <div className="divide-y divide-white/5 border-y border-white/10">
                    {posts.map((p) => (
                        <a
                            key={p.title}
                            href={p.href}
                            className="group block px-2 py-6 transition hover:bg-white/[0.015]"
                            onClick={() => sessionStorage.setItem("from", "home")}
                        >
                            <div className="flex items-baseline justify-between gap-4">
                                <h3 className="font-serif text-2xl leading-tight group-hover:underline">
                                    {p.title}
                                </h3>
                                <time className="shrink-0 text-xs uppercase tracking-wider text-zinc-400">
                                    {p.date}
                                </time>
                            </div>
                            <p className="mt-2 max-w-3xl text-zinc-300">{p.desc}</p>
                        </a>
                    ))}
               </div>
            </div>
        </section>
    );
}

function Interests() {
  const areas = [
    {
      title: "Real-Time Lighting & Global Illumination",
      points: [
        "How can complex light transport (scattering, indirect light, volumetrics) be approximated stably and efficiently for interactive applications?",
        "Temporal stability matters: minimizing flicker, noise, and lighting “pops” under dynamic views and illumination.",
        "Bridging physically based foundations with real-time constraints and artist-friendly controls.",
      ],
      keywords: ["Lighting", "GI", "Volumetrics", "Temporal Stability", "PBR"],
    },
    {
  title: "Alternative Representations for Real-Time Graphics",
  points: [
    "Exploring representations beyond classical meshes, such as Gaussian primitives, voxel-based models, and neural radiance fields (NeRFs), to represent geometry, appearance, and volume.",
    "Analyzing tradeoffs in controllability, editability, and relightability when using alternative or learned representations in real-time pipelines.",
    ],
  keywords: [
    "Alternative Representations",
    "Gaussians",
    "Voxels",
    "NeRF",
    "Hybrid Pipelines",
    "Real-Time Constraints",
    "Relighting",
  ],
},
    {
      title: "Physically Based Appearance Models",
      points: [
        "Investigating how materials, surfaces, and volumes remain visually plausible under aggressive performance budgets.",
        "Appearance modeling beyond “pretty”: consistency across views, exposure, and lighting conditions.",
        "Where physically-based modeling is essential vs. where learned priors can substitute.",
      ],
      keywords: ["BRDF/BSDF", "SVBRDF", "Materials", "Scattering", "Plausibility"],
    },
    {
      title: "High-Fidelity Visuals for Interactive Media",
      points: [
        "Translating ideas from offline rendering and film into real-time without sacrificing coherence or control.",
        "Balancing realism, performance, and usability in production pipelines.",
        "Building systems that enable “impossible” scenes to feel stable and interactive.",
      ],
      keywords: ["Real-Time", "Film → Games", "Performance", "Tooling", "Visual Fidelity"],
    },
  ];

  return (
    <section id="interests" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-10">
          <h2 className="font-serif text-4xl md:text-5xl">Interests</h2>
          <p className="mt-4  text-zinc-300 md:text-lg">
            I am particularly interested in research questions at the intersection of real-time rendering, physical plausibility, and neural representations.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {areas.map((a) => (
            <div
              key={a.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/20 transition"
            >
              <h3 className="font-serif text-2xl">{a.title}</h3>

              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

             
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}


function About() {
    const skills = [
        "C/C++","React", "TypeScript", "Unity", "C#", "Varjo XR", "OpenXR", "OpenCV", "SQL", "DirectX","Java",
        "Python", "Pandas", "NumPy", "HLSL","Vulkan", "SpringBoot", "Unreal", "CUDA" , "3ds Max", "OCaml",
    ];
    return (
        <section id="about" className="border-t border-white/10">
  <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 md:grid-cols-12">
    <div className="md:col-span-6">
      <h2 className="font-serif text-4xl md:text-5xl">About</h2>
      <p className="mt-6 max-w-prose text-zinc-300 md:text-lg">
  I initially came to Munich with the goal of building visually stunning games
  and interactive experiences. During my studies, however, I realized that
  creating beautiful results was not enough for me — I wanted to understand
  why they work, where their limitations lie, and how those limits could be
  pushed further.
</p>

<p className="mt-4 max-w-prose text-zinc-300 md:text-lg">
  During my studies, I realized that producing beautiful results was not enough
  for me. I became increasingly interested in understanding the underlying
  technology, where current
  real-time pipelines break down, and how new rendering and representation
  techniques could push these limits further. This shift led me toward
  research-driven work focused on advancing the foundations of real-time
  graphics.
</p>

<p className="mt-4 max-w-prose text-zinc-400">
  I am currently based in Munich and completing my Master’s degree in Computer
  Science at the Technical University of Munich (TUM), with a strong focus on
  computer graphics and real-time rendering.
</p>
      <div className= "gap-3 py-3">
      <Link
        to="/personal"
       className="rounded-2xl gap-3 border border-white/20 bg-white text-black px-5 py-3 text-sm font-medium hover:bg-zinc-200 inline-flex items-center transition-colors">
        Read about my personal information
      </Link>
      </div>
    </div>

    <div className="md:col-span-6 md:pl-8">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h3 className="font-serif text-2xl">Technical Background</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-300"
            >
              {s}
            </span>
          ))}
        </div>

       <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-zinc-300">
  <div>
    <p className="text-zinc-400">Research preparation</p>
    <ul className="mt-1 list-disc pl-5">
      <li>
        Master’s studies focused on real-time rendering, visual computing,
        and graphics programming
      </li>
      <li>
        Research-driven projects combining theory with hands-on
        implementation and evaluation
      </li>
      <li>
        Experience designing experimental systems to study visual behavior
        and perception
      </li>
    </ul>
  </div>

  <div>
    <p className="text-zinc-400">Engineering background</p>
    <ul className="mt-1 list-disc pl-5">
      <li>
        Multiple internships and working student positions during my studies
      </li>
      <li>
        Experience ranging from low-level programming to full-stack development (totally not showing off on this website😉)
      </li>
      <li>
        Comfortable moving between high-level system design and
        performance-critical implementation
      </li>
    </ul>
  </div>
</div>

      </div>
    </div>
  </div>
</section>

    );
}

function Contact() {
    return (
        <section id="contact" className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-5 py-20">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
                    <div className="md:col-span-6 items-center">
                        <h2 className="font-serif text-4xl md:text-5xl">Contact</h2>
                        <p className="mt-6 max-w-prose text-zinc-300 md:text-lg mb-4">
                            Want to collaborate or chat about games & graphics? Drop a line.
                        </p>

                        <div className="mt-0 flex flex-wrap items-center gap-3">
                        <a href="mailto:marina.weber@tum.de"
                            className="rounded-2xl bg-white text-black px-5 py-3 text-sm font-semibold tracking-wide transition hover:-translate-y-0.5">
                            <Mail className="mr-2 inline h-4 w-4" /> Email me
                        </a>
                            <a href="https://github.com/marina1745"
                            className="rounded-2xl border border-white/20 px-5 py-3 text-sm text-zinc-200 transition hover:-translate-y-0.5 hover:border-white/40">
                            <Github className="mr-2 inline h-4 w-4" /> GitHub
                        </a>
                            <a href="https://www.linkedin.com/in/marina-weber-35056738a/"
                            className="rounded-2xl border border-white/20 px-5 py-3 text-sm text-zinc-200 transition hover:-translate-y-0.5 hover:border-white/40">
                            <Linkedin className="mr-2 inline h-4 w-4" /> LinkedIn
                        </a>
                        </div>
                    </div>

                    
                </div>
            </div>
        </section>
    );
}


// ——— Tiny utility styles as Tailwind component classes (add to globals if desired) ———
// You can move these to a CSS file with @layer components and the same class names.
declare global {
    interface HTMLElementTagNameMap { }
}

// Tailwind helper classes (use with className)
// .btn-* and .navlink rely on Tailwind being configured.
const _styleGuide = (
    <style>{`
  .navlink { @apply text-zinc-300 hover:text-white tracking-wide; }
  .btn-primary { @apply rounded-2xl bg-white text-black px-5 py-3 text-sm font-semibold tracking-wide transition hover:-translate-y-0.5; }
  .btn-secondary { @apply rounded-2xl border border-white/20 px-5 py-3 text-sm text-zinc-200 transition hover:-translate-y-0.5 hover:border-white/40; }
  .btn-ghost { @apply rounded-2xl px-5 py-3 text-sm text-zinc-200 hover:text-white; }
`}</style>
);

// Inject helper styles once
function StyleInjector() {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!ref.current) return;
        const root = document.createElement("div");
        root.innerHTML = (_styleGuide as any).props.children;
        document.head.appendChild(root.firstChild as Node);
    }, []);
    return <div ref={ref} />;
}

// Mount helper styles at app root
function StyleMount() {
    return <StyleInjector />;
}

// Ensure the styles mount when the page renders
// (Place <StyleMount /> inside the layout if you split files.)
StyleMount;
