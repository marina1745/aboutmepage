import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
/** Cross-fade slide variants — incoming stack is rendered above outgoing */
const slideVariants = {
    enter: (dir) => ({
        x: dir === 1 ? 40 : -40,
        opacity: 0,
        zIndex: 1,
    }),
    center: {
        x: 0,
        opacity: 1,
        zIndex: 1,
    },
    exit: (dir) => ({
        x: dir === 1 ? -40 : 40,
        opacity: 0,
        zIndex: 0,
    }),
};
export default function AestheticCarousel({ images, aspect = 36 / 9, tilePct = 65, innerPad = 10, }) {
    const [idx, setIdx] = useState(0);
    const [dir, setDir] = useState(1);
    const [animating, setAnimating] = useState(false);
    const prefersReducedMotion = typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;
    // --- sizing / positions ---
    const paddingTop = `${(1 / aspect) * 100}%`; // fix the band’s height by ratio
    const W = tilePct; // tile width (%)
    const centerWidth = `${W}%`;
    const leftLeft = `calc(50% - ${W / 2}% - ${innerPad}px - ${W}%)`;
    const rightLeft = `calc(50% + ${W / 2}% + ${innerPad}px)`;
    console.log(images);
    // --- controls with animation lock ---
    const prev = () => { setDir(-1); setIdx((i) => (i - 1 + images.length) % images.length); };
    const next = () => { setDir(1); setIdx((i) => (i + 1) % images.length); };
    const safePrev = () => { if (!animating) {
        setAnimating(true);
        prev();
    } };
    const safeNext = () => { if (!animating) {
        setAnimating(true);
        next();
    } };
    // drag/swipe
    const dragProps = {
        drag: "x",
        dragElastic: 0.12,
        dragConstraints: { left: 0, right: 0 },
        onDragEnd: (_, info) => {
            if (info.offset.x < -50)
                safeNext();
            else if (info.offset.x > 50)
                safePrev();
        },
    };
    // keyboard
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft")
                safePrev();
            if (e.key === "ArrowRight")
                safeNext();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [animating, images.length]);
    if (!images || images.length === 0)
        return null;
    // neighbor helpers (only render current ±1)
    const at = (i) => images[(i + images.length) % images.length];
    const slides = useMemo(() => [at(idx - 1), at(idx), at(idx + 1)], [idx, images]);
    console.log(slides);
    return (_jsxs("div", { className: "relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-white/[0.02] border-y border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]", role: "region", "aria-roledescription": "carousel", "aria-label": "Showcase", "aria-live": "polite", children: [_jsxs("div", { className: "relative w-full", style: { paddingTop }, children: [_jsx("div", { className: "pointer-events-none absolute inset-0 z-20 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" }), _jsx(AnimatePresence, { initial: false, custom: dir, children: _jsxs(motion.div, { custom: dir, variants: prefersReducedMotion ? undefined : slideVariants, initial: prefersReducedMotion ? false : "enter", animate: prefersReducedMotion ? {} : "center", exit: prefersReducedMotion ? undefined : "exit", transition: prefersReducedMotion
                                ? undefined
                                : {
                                    x: { duration: 0.35, ease: "easeOut" },
                                    opacity: { duration: 0.25, ease: "linear" },
                                }, className: "absolute inset-0 z-10 will-change-transform will-change-opacity", ...dragProps, onAnimationComplete: () => setAnimating(false), children: [_jsx(SlidePicture, { slide: slides[1], style: { width: centerWidth }, className: "absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 rounded-xl object-cover z-[5]" }), _jsx(SlidePicture, { slide: slides[0], style: { width: centerWidth, left: leftLeft }, className: "absolute top-1/2 -translate-y-1/2 h-full rounded-xl object-cover z-0 pointer-events-none", inert: true }), _jsx(SlidePicture, { slide: slides[2], style: { width: centerWidth, left: rightLeft }, className: "absolute top-1/2 -translate-y-1/2 h-full rounded-xl object-cover z-0 pointer-events-none", inert: true })] }, idx) })] }), _jsx("button", { "aria-label": "Previous slide", onClick: safePrev, className: "group absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur hover:bg-black/70 z-40", children: _jsx(ChevronLeft, { className: "h-6 w-6 text-zinc-200 group-hover:text-white" }) }), _jsx("button", { "aria-label": "Next slide", onClick: safeNext, className: "group absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur hover:bg-black/70 z-40", children: _jsx(ChevronRight, { className: "h-6 w-6 text-zinc-200 group-hover:text-white" }) })] }));
}
function SlidePicture({ slide, className, style, inert, }) {
    const { meta, tiny, alt } = slide;
    // Be robust at runtime: try picture shape, then meta shape
    const m = meta;
    const imgSrc = m?.img?.src ?? m?.src ?? tiny; // last resort: tiny
    const imgSrcset = m?.img?.srcset ?? m?.srcset ?? undefined;
    const sizes = `(min-width:1024px) ${Number(style?.["--tilePct"] ?? 60)}vw, 95vw`;
    return (_jsx("div", { style: {
            ...style,
            backgroundImage: `url('${tiny}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }, className: className, ...(inert ? { "aria-hidden": true } : {}), children: _jsx("img", { src: imgSrc, srcSet: imgSrcset, sizes: sizes, alt: alt, loading: "lazy", decoding: "async", className: "h-full w-full object-cover rounded-xl" }) }));
}
