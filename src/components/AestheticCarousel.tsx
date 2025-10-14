import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Cross-fade slide variants — incoming stack is rendered above outgoing */
const slideVariants = {
    enter: (dir: 1 | -1) => ({
        x: dir === 1 ? 40 : -40,
        opacity: 0,
        zIndex: 1,
    }),
    center: {
        x: 0,
        opacity: 1,
        zIndex: 1,
    },
    exit: (dir: 1 | -1) => ({
        x: dir === 1 ? -40 : 40,
        opacity: 0,
        zIndex: 0,
    }),
};

type Props = {
    images: string[];
    /** width / height ratio for the whole band (very wide by default) */
    aspect?: number;     // e.g. 36/9 or 32/9
    /** each tile’s width as % of the container; all three tiles use this equally */
    tilePct?: number;    // 60–72 is the sweet spot; default 65
    /** pixel gap between the center tile and the side tiles */
    innerPad?: number;   // a “couple of pixels” look: 8–14
};

/**
 * Full-width landscape carousel:
 * - equal-sized tiles (center + left + right)
 * - center fully visible, sides peek in
 * - smooth cross-fade slide
 * - drag/swipe + keyboard + arrows
 * - no “skip” or overlay/ghost issues
 */
export default function AestheticCarousel({
    images,
    aspect = 36 / 9,
    tilePct = 65,
    innerPad = 10,
}: Props) {
    const [idx, setIdx] = useState(0);
    const [dir, setDir] = useState<1 | -1>(1);
    const [animating, setAnimating] = useState(false);

    if (!images || images.length === 0) return null;
    const at = (i: number) => images[(i + images.length) % images.length];

    // --- sizing / positions ---
    const paddingTop = `${(1 / aspect) * 100}%`; // fix the band’s height by ratio
    const W = tilePct;                            // tile width (%)
    const centerWidth = `${W}%`;

    // Exact left offsets: center edge ± gap ± tile width
    const leftLeft = `calc(50% - ${W / 2}% - ${innerPad}px - ${W}%)`;
    const rightLeft = `calc(50% + ${W / 2}% + ${innerPad}px)`;

    // --- navigation with animation lock (prevents “skips”) ---
    const prev = () => {
        setDir(-1);
        setIdx((i) => (i - 1 + images.length) % images.length);
    };
    const next = () => {
        setDir(1);
        setIdx((i) => (i + 1) % images.length);
    };
    const safePrev = () => {
        if (!animating) {
            setAnimating(true);
            prev();
        }
    };
    const safeNext = () => {
        if (!animating) {
            setAnimating(true);
            next();
        }
    };

    // keyboard
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") safePrev();
            if (e.key === "ArrowRight") safeNext();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [animating, images.length]);

    // drag/swipe
    const dragProps = {
        drag: "x" as const,
        dragElastic: 0.12,
        dragConstraints: { left: 0, right: 0 },
        onDragEnd: (_: any, info: { offset: { x: number } }) => {
            if (info.offset.x < -50) safeNext();
            else if (info.offset.x > 50) safePrev();
        },
    };

    return (
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-white/[0.02] border-y border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            {/* Aspect box controls height */}
            <div className="relative w-full" style={{ paddingTop }}>
                {/* Subtle edge mask; above images but doesn’t block clicks */}
                <div className="pointer-events-none absolute inset-0 z-20 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" />

                <AnimatePresence initial={false} custom={dir}>
                    <motion.div
                        key={idx}
                        custom={dir}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { duration: 0.35, ease: "easeOut" },
                            opacity: { duration: 0.25, ease: "linear" },
                        }}
                        className="absolute inset-0 z-10 will-change-transform will-change-opacity"
                        {...dragProps}
                        onAnimationComplete={() => setAnimating(false)}
                    >
                        {/* CENTER — on top of side tiles */}
                        <img
                            src={at(idx)}
                            alt=""
                            style={{ width: centerWidth }}
                            className="absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 rounded-xl object-cover z-[5]"
                            loading="lazy"
                        />

                        {/* LEFT — equal size, mostly off-canvas; doesn’t capture events */}
                        <img
                            src={at(idx - 1)}
                            alt=""
                            style={{ width: centerWidth, left: leftLeft }}
                            className="absolute top-1/2 -translate-y-1/2 h-full rounded-xl object-cover z-0 pointer-events-none"
                            loading="lazy"
                        />

                        {/* RIGHT — equal size, mostly off-canvas; doesn’t capture events */}
                        <img
                            src={at(idx + 1)}
                            alt=""
                            style={{ width: centerWidth, left: rightLeft }}
                            className="absolute top-1/2 -translate-y-1/2 h-full rounded-xl object-cover z-0 pointer-events-none"
                            loading="lazy"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls — always above everything */}
            <button
                aria-label="Previous"
                onClick={safePrev}
                className="group absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur hover:bg-black/70 z-40"
            >
                <ChevronLeft className="h-6 w-6 text-zinc-200 group-hover:text-white" />
            </button>
            <button
                aria-label="Next"
                onClick={safeNext}
                className="group absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur hover:bg-black/70 z-40"
            >
                <ChevronRight className="h-6 w-6 text-zinc-200 group-hover:text-white" />
            </button>
        </div>
    );
}
