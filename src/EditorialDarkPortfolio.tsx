import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin } from "lucide-react";

import AestheticCarousel from "./components/AestheticCarousel";
import { useLocation, Link } from "react-router-dom";
import { projects } from "./lib/projects";

// EDITORIAL DARK — Single-file React component
// - TailwindCSS for styling
// - Framer Motion for tasteful motion
// - Serif display + sans body (configure fonts in your app.css / index.html):
//   Headline: "Playfair Display" or "Literata"; Body: "Inter" or "General Sans"
// Add to your router or render as <EditorialDarkPortfolio />

const pics = [
    "/holidaypics/holidaypic (1).jpeg",
    "/holidaypics/holidaypic (2).jpeg",
    "/holidaypics/holidaypic (3).jpeg",
    "/holidaypics/holidaypic (4).jpeg",
    "/holidaypics/holidaypic (5).jpeg",
    "/holidaypics/holidaypic (6).jpeg",
];


export default function EditorialDarkPortfolio() {
    return (
        <div className="min-h-screen bg-[#0E0E10] text-zinc-100 antialiased">
            
            <ReadingProgress />
            <main>
                <Hero />
                <Work />
                <Writing />
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
            {/* Full-bleed editorial hero */}
            <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-end gap-10 px-5 pb-24 pt-20 md:grid-cols-12 md:pt-28">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="col-span-7 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl"
                >
                    Games Engineer, Visual Computation & XR Researcher, Pretty Chill Girl
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="col-span-5 md:pl-8"
                >
                    <p className="max-w-xl text-zinc-300 md:text-lg">
                        I work at the intersection of graphics, perception, and interaction - exploring how humans see, move, and connect in virtual worlds. My background in games engineering meets my curiosity for research, and together they keep me chasing beauty in systems, whether it’s light in a shader or data in an eye tracker.

                      
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">

                        
                        
                        
                        <span
                            className="rounded-2xl border border-white/20 bg-white text-black px-5 py-3 text-sm font-medium 
                            hover:bg-zinc-200 inline-flex items-center transition-colors"
                        >
                            {makeLink("work", "See Selected Work")}<ArrowUpRight className="ml-1 inline h-4 w-4" ></ArrowUpRight></span> 
                        <Link to="/personal" className="rounded-2xl border border-white/20 px-5 py-3 text-sm text-zinc-200 hover:border-white/40 inline-flex">
                            Meet me
                        </Link>

                    </div>
                </motion.div>
            </div>

           
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <AestheticCarousel
                images={pics}
                aspect={36 / 9}                     // wider vs height; try 32/9 or 28/9 if too short                     // show more/less of side images
                innerPad={14}                     // space between center and peeks
                tilePct={70}                      // all three are 70% of container width (equal)
               
            /></div>
           
         

        </section>
    );
}

function Work() {
    const chosen = [
        "privacy_vr", "campus_wars", "sneaky_sneaky"
    ];
    const filtered = projects.filter(p => chosen.includes(p.slug));

    return (
        <section id="work" className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-5 py-20">
                <div className="mb-10 flex items-end justify-between">
                    <h2 className="font-serif text-4xl md:text-5xl">Selected Work</h2>
                    <Link to="/archive?type=game"  className="text-sm text-zinc-400 hover:text-zinc-200">
                        Archive →
                    </Link>
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
            title: "What eye‑tracking can infer in XR",
            date: "tbd",
            desc: "A practical tour of features (fixations, saccades) and the scary bits of inference.",
            href: "#",
        },
        
    ];

    return (
        <section id="writing" className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-5 py-20">
                <h2 className="mb-10 font-serif text-4xl md:text-5xl">Academic papers</h2>
                <h3>tbd</h3>
                <div className="divide-y divide-white/5 border-y border-white/10">
                    {posts.map((p) => (
                        <a
                            key={p.title}
                            href={p.href}
                            className="group block px-2 py-6 transition hover:bg-white/[0.015]"
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

function About() {
    const skills = [
        "React", "TypeScript", "Unity", "C#", "Varjo XR", "OpenXR", "OpenCV", "SQL", "DirectX","C/C++","Java",
        "Python", "Pandas", "GLSL","Vulkan", "SpringBoot", "Unreal" ,
    ];
    return (
        <section id="about" className="border-t border-white/10">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 md:grid-cols-12">
  <div className="md:col-span-6">
    <h2 className="font-serif text-4xl md:text-5xl">About</h2>
    <p className="mt-6 max-w-prose text-zinc-300 md:text-lg">
      I’m an engineer working across XR, real-time rendering, and data systems. My background combines computer graphics, databases, and low-level programming in C/C++, enabling me to build efficient and scalable systems. I develop both research and game projects focused on game engine technology and computational visualization.
    </p>
    <p className="mt-4 max-w-prose text-zinc-400">
      I like understanding how things work; Whether it’s code, systems, or people. I care about clarity and building things that make sense. Currently based in Munich. Studying Computer Science at Technical University of Munich (TUM).
    </p>
    <Link
      to="/personal"
      className="mt-8 inline-flex rounded-2xl border border-white/20 px-5 py-3 text-sm text-zinc-200 hover:border-white/40"
    >
      Meet me
    </Link>
  
</div>


                <div className="md:col-span-6 md:pl-8">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <h3 className="font-serif text-2xl">Skills & Tools</h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {skills.map((s) => (
                                <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-300">
                                    {s}
                                </span>
                            ))}
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-zinc-300">
                            <div>
                                <p className="text-zinc-400">Currently interested in</p>
                                <ul className="mt-1 list-disc pl-5">
                                    <li>XR and graphics engineering</li>
                                    <li>Game engine architecture</li>
                                    <li>Data-oriented design and performance</li>
                                    <li>Query optimization</li>
                                </ul>
                            </div>
                            <div>
                                <p className="text-zinc-400">Highlights</p>
                                <ul className="mt-1 list-disc pl-5">
                                    <li>Developed an XR eye-tracking study from prototype to analysis</li>
                                    <li>Built multiple game projects</li>
                                    <li>Specialized in databases and low-level systems during my master's</li>
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
                            Want to collaborate or chat about XR & graphics? Drop a line.
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
