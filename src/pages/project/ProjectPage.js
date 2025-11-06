import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/project/ProjectPage.tsx
import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { projects } from "../../lib/projects";
export default function ProjectPage() {
    const { slug } = useParams();
    const project = projects.find(p => p.slug === slug);
    const backType = useMemo(() => sessionStorage.getItem("archiveType") ?? "non-game", []);
    const cameFrom = useMemo(() => sessionStorage.getItem("from") ?? "archive", []);
    const backHref = cameFrom === "home" ? "/" : `/archive?type=${backType}`;
    const backLabel = cameFrom === "home" ? "← Back to Home" : "← Back to Archive";
    if (!project) {
        return (_jsxs("div", { className: "mx-auto max-w-5xl px-5 py-10", children: [_jsx("p", { className: "text-zinc-300", children: "Project not found." }), _jsx(Link, { to: backHref, className: "text-sm text-zinc-400 hover:text-white", children: backLabel })] }));
    }
    return (_jsxs("article", { className: "mx-auto max-w-5xl px-5 py-10 space-y-8", children: [_jsxs("header", { className: "space-y-2", children: [_jsx(Link, { to: backHref, className: "text-sm text-zinc-400 hover:text-white", children: backLabel }), _jsx("h1", { className: "text-3xl font-semibold text-zinc-100", children: project.title }), _jsx("p", { className: "text-zinc-400", children: project.summary }), !!project.tags?.length && (_jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: project.tags.map(t => (_jsx("span", { className: "text-[11px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 ring-1 ring-zinc-700", children: t }, t))) }))] }), project.body && (_jsx("section", { className: "prose prose-invert prose-zinc max-w-none", children: project.body.split("\n").map((line, i) => line.startsWith("- ")
                    ? _jsx("li", { className: "ml-5", children: line.replace("- ", "") }, i)
                    : line.trim() === "" ? _jsx("br", {}, i) : _jsx("p", { children: line }, i)) })), project.github && (_jsx("div", { className: "mt-3", children: _jsxs("a", { href: project.github, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 rounded-2xl bg-zinc-900/40 px-3 py-1.5 text-sm text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800 hover:text-white", children: [_jsx("svg", { viewBox: "0 0 16 16", "aria-hidden": "true", className: "h-4 w-4", children: _jsx("path", { fill: "currentColor", d: "M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38\r\n                  0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01\r\n                  1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95\r\n                  0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82a7.62 7.62 0 0 1 2-.27c.68 0 1.36.09\r\n                  2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.15\r\n                  0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19\r\n                  0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" }) }), "View on GitHub"] }) })), project.links && project.links.length > 0 && (_jsx("div", { className: "mt-3 flex flex-wrap gap-3", children: project.links.map(l => (_jsx("a", { href: l.href, target: "_blank", rel: "noopener noreferrer", className: "rounded-xl border border-white/20 px-3 py-1 text-sm hover:bg-white/10", children: l.label }, l.href))) })), project.media && project.media.length > 0 && (_jsxs("section", { className: "mt-10 space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold text-zinc-100", children: "Gallery" }), _jsx("div", { className: `grid gap-4 ${project.media.length === 1
                            ? "grid-cols-2"
                            : project.media.length === 2
                                ? "grid-cols-1 sm:grid-cols-2"
                                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`, children: project.media.map((m, i) => (_jsx("figure", { className: "rounded-2xl overflow-hidden ring-1 ring-zinc-800 bg-zinc-900/40", children: m.type === "image" ? (RenderImage(m.src, m.alt ?? project.title)) : m.type === "audio" ? (_jsx("audio", { src: m.src, controls: true, className: "w-full" })) : (_jsx("video", { src: m.src, controls: true, className: "w-full h-full" })) }, i))) })] }))] }));
}
function RenderImage(src, alt, cls = "w-full h-full object-cover") {
    const sizes = "(min-width:1024px) 50vw, 100vw";
    // string from /public or external URL
    if (typeof src === "string") {
        return _jsx("img", { src: src, alt: alt, className: cls, loading: "lazy" });
    }
    // imagetools <picture>
    if ("img" in src && "sources" in src) {
        return (_jsxs("picture", { children: [src.sources.avif && _jsx("source", { type: "image/avif", srcSet: src.sources.avif, sizes: sizes }), src.sources.webp && _jsx("source", { type: "image/webp", srcSet: src.sources.webp, sizes: sizes }), src.sources.jpeg && _jsx("source", { type: "image/jpeg", srcSet: src.sources.jpeg, sizes: sizes }), _jsx("img", { src: src.img.src, srcSet: src.img.srcset, sizes: sizes, alt: alt, className: cls, loading: "lazy" })] }));
    }
    // imagetools meta
    if ("src" in src) {
        return _jsx("img", { src: src.src, srcSet: src.srcset, sizes: sizes, alt: alt, className: cls, loading: "lazy" });
    }
    return null;
}
