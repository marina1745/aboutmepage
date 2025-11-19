import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    { meta: pic1, tiny: p1Tiny, alt: "Vienna light show" },
    { meta: pic2, tiny: p2Tiny, alt: "Cologne Dome" },
    { meta: pic3, tiny: p3Tiny, alt: "Hokkaido" },
    { meta: pic4, tiny: p4Tiny, alt: "shirakawa-go" },
    { meta: pic5, tiny: p5Tiny, alt: "Hongkong" },
    { meta: pic6, tiny: p6Tiny, alt: "Singapore" },
];
export default function EditorialDarkPortfolio() {
    return (_jsxs("div", { className: "min-h-screen bg-[#0E0E10] text-zinc-100 antialiased", children: [_jsx(ReadingProgress, {}), _jsxs("main", { children: [_jsx(Hero, {}), _jsx(Work, {}), _jsx(Writing, {}), _jsx(About, {}), _jsx(Contact, {})] })] }));
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
    return (_jsx("div", { className: "fixed left-0 top-[52px] z-50 hidden h-[2px] w-screen bg-transparent md:block", children: _jsx("div", { className: "h-[2px] bg-zinc-200 transition-[width]", style: { width: `${progress}%` } }) }));
}
function Hero() {
    const location = useLocation();
    const atHome = location.pathname === "/";
    const makeLink = (id, label) => (_jsx("a", { href: atHome ? `#${id}` : `/#${id}`, onClick: (e) => {
            if (atHome) {
                e.preventDefault();
                smoothScroll(id);
            }
        }, className: "navlink", children: label }));
    const smoothScroll = (id) => {
        const el = document.getElementById(id);
        if (el)
            el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    return (_jsxs("section", { id: "top", className: "relative overflow-hidden", children: [_jsxs("div", { className: "relative mx-auto grid max-w-6xl grid-cols-1 items-end gap-10 px-5 pb-24 pt-20 md:grid-cols-12 md:pt-28", children: [_jsx(motion.h1, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7 }, className: "md:col-span-7 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl", children: "Games Engineer, Visual Computation & XR Researcher, Pretty Chill Girl" }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.1 }, className: "md:col-span-5 md:pl-8", children: [_jsx("p", { className: "max-w-xl text-zinc-300 md:text-lg ", children: "I work at the intersection of graphics, perception, and interaction \u2014 exploring how humans see, move, and connect in virtual worlds. My background in games engineering meets my curiosity for research, and together they keep me chasing beauty in systems, whether it\u2019s light in a shader or data in an eye tracker." }), _jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [_jsxs("span", { className: "rounded-2xl border border-white/20 bg-white text-black px-5 py-3 text-sm font-medium hover:bg-zinc-200 inline-flex items-center transition-colors", children: [makeLink("work", "See Selected Work"), _jsx(ArrowUpRight, { className: "ml-1 inline h-4 w-4" })] }), _jsx(Link, { to: "/personal", className: "rounded-2xl border border-white/20 px-5 py-3 text-sm text-zinc-200 hover:border-white/40 inline-flex", children: "Meet me" })] })] })] }), _jsx("div", { className: "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]", children: _jsx(DeferredCarousel, { images: pics }) })] }));
}
function DeferredCarousel({ images }) {
    const ref = useRef(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const el = ref.current;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                setShow(true);
                io.disconnect();
            }
        }, { rootMargin: '600px' });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return (_jsx("div", { ref: ref, className: "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]", children: _jsx(Suspense, { fallback: _jsx(CarouselSkeleton, {}), children: show ? (_jsx(AestheticCarousel
            // pass fully-described images to your carousel
            , { 
                // pass fully-described images to your carousel
                images: images, aspect: 36 / 9, innerPad: 14, tilePct: 70 })) : _jsx(CarouselSkeleton, {}) }) }));
}
function CarouselSkeleton() {
    return (_jsx("div", { className: "h-[40vw] max-h-[420px] min-h-[220px] bg-white/[0.03] animate-pulse rounded-none" }));
}
function Work() {
    const chosen = [
        "privacy_vr", "campus_wars", "sneaky_sneaky"
    ];
    const filtered = projects.filter(p => chosen.includes(p.slug));
    return (_jsx("section", { id: "work", className: "border-t border-white/10", children: _jsxs("div", { className: "mx-auto max-w-6xl px-5 py-20", children: [_jsxs("div", { className: "mb-10 flex items-end justify-between", children: [_jsx("h2", { className: "font-serif text-4xl md:text-5xl", children: "Selected Work" }), _jsx(Link, { to: "/archive?type=game", className: "text-sm text-zinc-400 hover:text-zinc-200", children: "Archive \u2192" })] }), _jsx("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-3", children: filtered.map(p => (_jsxs(Link, { to: `/work/${p.slug}`, onClick: () => sessionStorage.setItem("from", "home"), className: "group block rounded-2xl bg-zinc-900/60 ring-1 ring-zinc-800 p-5 hover:bg-zinc-900 hover:ring-zinc-700 transition", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsx("h3", { className: "text-lg font-medium text-zinc-100", children: p.title }), _jsx("span", { className: "text-zinc-400 group-hover:translate-x-0.5 transition", children: "\u2192" })] }), _jsx("p", { className: "mt-2 text-sm text-zinc-400", children: p.summary }), !!p.tags?.length && (_jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: p.tags.map(t => (_jsx("span", { className: "text-[11px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 ring-1 ring-zinc-700", children: t }, t))) }))] }, p.slug))) })] }) }));
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
    return (_jsx("section", { id: "writing", className: "border-t border-white/10", children: _jsxs("div", { className: "mx-auto max-w-6xl px-5 py-20", children: [_jsx("h2", { className: "mb-10 font-serif text-4xl md:text-5xl", children: "Academic papers" }), _jsx("h3", { children: "tbd" }), _jsx("div", { className: "divide-y divide-white/5 border-y border-white/10", children: posts.map((p) => (_jsxs("a", { href: p.href, className: "group block px-2 py-6 transition hover:bg-white/[0.015]", children: [_jsxs("div", { className: "flex items-baseline justify-between gap-4", children: [_jsx("h3", { className: "font-serif text-2xl leading-tight group-hover:underline", children: p.title }), _jsx("time", { className: "shrink-0 text-xs uppercase tracking-wider text-zinc-400", children: p.date })] }), _jsx("p", { className: "mt-2 max-w-3xl text-zinc-300", children: p.desc })] }, p.title))) })] }) }));
}
function About() {
    const skills = [
        "React", "TypeScript", "Unity", "C#", "Varjo XR", "OpenXR", "OpenCV", "SQL", "DirectX", "C/C++", "Java",
        "Python", "Pandas", "NumPy", "TensorFlow", "GLSL", "Vulkan", "SpringBoot", "Unreal", "CUDA", "3ds Max",
    ];
    return (_jsx("section", { id: "about", className: "border-t border-white/10", children: _jsxs("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 md:grid-cols-12", children: [_jsxs("div", { className: "md:col-span-6", children: [_jsx("h2", { className: "font-serif text-4xl md:text-5xl", children: "About" }), _jsx("p", { className: "mt-6 max-w-prose text-zinc-300 md:text-lg", children: "I\u2019m an engineer working across XR, real-time rendering, and data systems. My background combines computer graphics, databases, and low-level programming in C/C++, enabling me to build efficient and scalable systems. I develop both research and game projects focused on game engine technology and computational visualization." }), _jsx("p", { className: "mt-4 max-w-prose text-zinc-400", children: "I like understanding how things work; Whether it\u2019s code, systems, or people. I care about clarity and building things that make sense. Currently based in Munich. Studying Computer Science at Technical University of Munich (TUM)." }), _jsx(Link, { to: "/personal", className: "mt-8 inline-flex rounded-2xl border border-white/20 px-5 py-3 text-sm text-zinc-200 hover:border-white/40", children: "Meet me" })] }), _jsx("div", { className: "md:col-span-6 md:pl-8", children: _jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.03] p-6", children: [_jsx("h3", { className: "font-serif text-2xl", children: "Skills & Tools" }), _jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: skills.map((s) => (_jsx("span", { className: "rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-300", children: s }, s))) }), _jsxs("div", { className: "mt-6 grid grid-cols-2 gap-4 text-sm text-zinc-300", children: [_jsxs("div", { children: [_jsx("p", { className: "text-zinc-400", children: "Currently interested in" }), _jsxs("ul", { className: "mt-1 list-disc pl-5", children: [_jsx("li", { children: "XR and graphics engineering" }), _jsx("li", { children: "Game engine architecture" }), _jsx("li", { children: "Data-oriented design and performance" }), _jsx("li", { children: "Query optimization" })] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-zinc-400", children: "Highlights" }), _jsxs("ul", { className: "mt-1 list-disc pl-5", children: [_jsx("li", { children: "Developed an XR eye-tracking study from prototype to analysis" }), _jsx("li", { children: "Built multiple game projects" }), _jsx("li", { children: "Specialized in databases and low-level systems during my master's" })] })] })] })] }) })] }) }));
}
function Contact() {
    return (_jsx("section", { id: "contact", className: "border-t border-white/10", children: _jsx("div", { className: "mx-auto max-w-6xl px-5 py-20", children: _jsx("div", { className: "grid grid-cols-1 gap-10 md:grid-cols-12", children: _jsxs("div", { className: "md:col-span-6 items-center", children: [_jsx("h2", { className: "font-serif text-4xl md:text-5xl", children: "Contact" }), _jsx("p", { className: "mt-6 max-w-prose text-zinc-300 md:text-lg mb-4", children: "Want to collaborate or chat about XR & graphics? Drop a line." }), _jsxs("div", { className: "mt-0 flex flex-wrap items-center gap-3", children: [_jsxs("a", { href: "mailto:marina.weber@tum.de", className: "rounded-2xl bg-white text-black px-5 py-3 text-sm font-semibold tracking-wide transition hover:-translate-y-0.5", children: [_jsx(Mail, { className: "mr-2 inline h-4 w-4" }), " Email me"] }), _jsxs("a", { href: "https://github.com/marina1745", className: "rounded-2xl border border-white/20 px-5 py-3 text-sm text-zinc-200 transition hover:-translate-y-0.5 hover:border-white/40", children: [_jsx(Github, { className: "mr-2 inline h-4 w-4" }), " GitHub"] }), _jsxs("a", { href: "https://www.linkedin.com/in/marina-weber-35056738a/", className: "rounded-2xl border border-white/20 px-5 py-3 text-sm text-zinc-200 transition hover:-translate-y-0.5 hover:border-white/40", children: [_jsx(Linkedin, { className: "mr-2 inline h-4 w-4" }), " LinkedIn"] })] })] }) }) }) }));
}
// Tailwind helper classes (use with className)
// .btn-* and .navlink rely on Tailwind being configured.
const _styleGuide = (_jsx("style", { children: `
  .navlink { @apply text-zinc-300 hover:text-white tracking-wide; }
  .btn-primary { @apply rounded-2xl bg-white text-black px-5 py-3 text-sm font-semibold tracking-wide transition hover:-translate-y-0.5; }
  .btn-secondary { @apply rounded-2xl border border-white/20 px-5 py-3 text-sm text-zinc-200 transition hover:-translate-y-0.5 hover:border-white/40; }
  .btn-ghost { @apply rounded-2xl px-5 py-3 text-sm text-zinc-200 hover:text-white; }
` }));
// Inject helper styles once
function StyleInjector() {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current)
            return;
        const root = document.createElement("div");
        root.innerHTML = _styleGuide.props.children;
        document.head.appendChild(root.firstChild);
    }, []);
    return _jsx("div", { ref: ref });
}
// Mount helper styles at app root
function StyleMount() {
    return _jsx(StyleInjector, {});
}
// Ensure the styles mount when the page renders
// (Place <StyleMount /> inside the layout if you split files.)
StyleMount;
