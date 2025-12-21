import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PanInfo } from "framer-motion";

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




type PictureMeta =
  | { img: { src: string; srcset?: string }; sources?: { avif?: string; webp?: string; jpeg?: string } } // as=picture
  | { src: string; srcset?: string }; // as=meta

type Slide = {
  meta: PictureMeta;
  tiny: string;
  alt: string;
  overlayText?: string;
};


type Props = {
  images: Slide[];
  /** width / height ratio for the whole band (very wide by default) */
  aspect?: number;     // e.g. 36/9 or 32/9
  /** each tile’s width as % of the container; all three tiles use this equally */
  tilePct?: number;    // 60–72 is the sweet spot; default 65
  /** pixel gap between the center tile and the side tiles */
  innerPad?: number;   // a “couple of pixels” look: 8–14
};




export default function AestheticCarousel({
  images,
  aspect = 36 / 9,
  tilePct = 65,
  innerPad = 10,
}: Props) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [animating, setAnimating] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

      const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 768px)").matches;

const effectiveAspect = isMobile ? 16 / 9 : aspect;
const paddingTop = `${(1 / effectiveAspect) * 100}%`;
const W = isMobile ? 92 : tilePct;
const centerWidth = `${W}%`;


  // --- sizing / positions ---

  const leftLeft = `calc(50% - ${W / 2}% - ${innerPad}px - ${W}%)`;
  const rightLeft = `calc(50% + ${W / 2}% + ${innerPad}px)`;
    console.log(images);
  // --- controls with animation lock ---
  const prev = () => { setDir(-1); setIdx((i) => (i - 1 + images.length) % images.length); };
  const next = () => { setDir(1);  setIdx((i) => (i + 1) % images.length); };
  const safePrev = () => { if (!animating) { setAnimating(true); prev(); } };
  const safeNext = () => { if (!animating) { setAnimating(true); next(); } };

  // drag/swipe
  const dragProps = {
    drag: "x" as const,
    dragElastic: 0.12,
    dragConstraints: { left: 0, right: 0 },
    onDragEnd: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -50) safeNext();
      else if (info.offset.x > 50) safePrev();
    },
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

  if (!images || images.length === 0) return null;

  // neighbor helpers (only render current ±1)
  const at = (i: number) => images[(i + images.length) % images.length];
  const slides = useMemo(() => [at(idx - 1), at(idx), at(idx + 1)], [idx, images]);
  console.log(slides);
  return (
    <div
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-white/[0.02] border-y border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Showcase"
      aria-live="polite"
    >
      {/* Aspect box controls height */}
      <div
  className="relative w-full min-h-[240px] sm:min-h-0"
  style={{ paddingTop }}
>
        {/* Subtle edge mask; above images but doesn’t block clicks */}
        <div className="pointer-events-none absolute inset-0 z-20 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" />

        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            variants={prefersReducedMotion ? undefined : slideVariants}
            initial={prefersReducedMotion ? false : "enter"}
            animate={prefersReducedMotion ? {} : "center"}
            exit={prefersReducedMotion ? undefined : "exit"}
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    x: { duration: 0.35, ease: "easeOut" },
                    opacity: { duration: 0.25, ease: "linear" },
                  }
            }
            className="absolute inset-0 z-10 will-change-transform will-change-opacity"
            {...dragProps}
            onAnimationComplete={() => setAnimating(false)}
          >
           {/* CENTER */}
{/* CENTER */}
<SlidePicture
  slide={slides[1]}
  style={{ width: centerWidth }}
  isCenter
  className="absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 rounded-xl z-[5]"
/>


{/* LEFT */}
{!isMobile && (
<SlidePicture
  slide={slides[0]}
  style={{ width: centerWidth, left: leftLeft }}
  className="absolute top-1/2 -translate-y-1/2 h-full rounded-xl object-cover z-0 pointer-events-none"
  inert
/>)}

{/* RIGHT */}
{!isMobile && (
<SlidePicture
  slide={slides[2]}
  style={{ width: centerWidth, left: rightLeft }}
  className="absolute top-1/2 -translate-y-1/2 h-full rounded-xl object-cover z-0 pointer-events-none"
  inert
/>)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <button
        aria-label="Previous slide"
        onClick={safePrev}
        className="group absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur hover:bg-black/70 z-40"
      >
        <ChevronLeft className="h-6 w-6 text-zinc-200 group-hover:text-white" />
      </button>
      <button
        aria-label="Next slide"
        onClick={safeNext}
        className="group absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur hover:bg-black/70 z-40"
      >
        <ChevronRight className="h-6 w-6 text-zinc-200 group-hover:text-white" />
      </button>
    </div>
  );
}


function SlidePicture({
  slide,
  className,
  style,
  inert,
  isCenter = false,
}: {
  slide: Slide;
  className?: string;
  style?: React.CSSProperties;
  inert?: boolean;
  isCenter?: boolean;
}) {

  const { meta, tiny, alt } = slide;

  // Be robust at runtime: try picture shape, then meta shape
  const m: any = meta as any;
  const imgSrc: string =
    m?.img?.src ?? m?.src ?? tiny; // last resort: tiny
  const imgSrcset: string | undefined =
    m?.img?.srcset ?? m?.srcset ?? undefined;

  const sizes = `(min-width:1024px) ${Number((style as any)?.["--tilePct"] ?? 60)}vw, 95vw`;

 return (
  <div
    style={{
      ...style,
      backgroundImage: `url('${tiny}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    className={[
      className,
      isCenter ? "group cursor-pointer" : "",
    ].join(" ")}
    {...(inert ? { "aria-hidden": true } : {})}
  >
    {/* Image */}
    <img
      src={imgSrc}
      srcSet={imgSrcset}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover rounded-xl transition duration-300 group-hover:brightness-50"
    />

    {/* Overlay (center only) */}
    {isCenter && slide.overlayText && (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl px-4">
  <span
    className="
      w-[80%]
      text-center
      text-white text-lg md:text-xl font-medium tracking-wide
      opacity-0 group-hover:opacity-100
      transition-opacity duration-300
      drop-shadow-lg
    "
  >
          {slide.overlayText}
        </span>
      </div>
    )}
  </div>
);

  
}


