// src/pages/project/ProjectPage.tsx
import { useParams, Link } from "react-router-dom";
import { useMemo} from "react";
import { projects } from "../../lib/projects";

export default function ProjectPage() {
    const { slug } = useParams<{ slug: string }>();
    const project = projects.find(p => p.slug === slug);
    const backType = useMemo(
        () => (sessionStorage.getItem("archiveType") as "game" | "non-game") ?? "game",
        []
    );
    const cameFrom = useMemo(
        () => (sessionStorage.getItem("from") as "home" | "archive") ?? "archive",
        []
    );
    const backHref = cameFrom === "home" ? "/" : "/archive?type=${backType}";
    const backLabel = cameFrom === "home" ? "← Back to Home" : "← Back to Archive";
   
    if (!project) {
        return (
            <div className="mx-auto max-w-5xl px-5 py-10">
                <p className="text-zinc-300">Project not found.</p>
                <Link to={backHref} className="text-sm text-zinc-400 hover:text-white">
                    {backLabel}
                </Link>
            </div>
        );
    }

    return (
        <article className="mx-auto max-w-5xl px-5 py-10 space-y-8">
            {/* Header */}
            <header className="space-y-2">
                <Link to={backHref} className="text-sm text-zinc-400 hover:text-white">{backLabel}</Link>
                <h1 className="text-3xl font-semibold text-zinc-100">{project.title}</h1>
                <p className="text-zinc-400">{project.summary}</p>
                {!!project.tags?.length && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {project.tags.map(t => (
                            <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 ring-1 ring-zinc-700">
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* Body */}
            {project.body && (
                <section className="prose prose-invert prose-zinc max-w-none">
                    {project.body.split("\n").map((line, i) =>
                        line.startsWith("- ")
                            ? <li key={i} className="ml-5">{line.replace("- ", "")}</li>
                            : line.trim() === "" ? <br key={i} /> : <p key={i}>{line}</p>
                    )}
                </section>
            )}

            {/* Media Gallery */}
            
            {project.media && project.media.length > 0 && (
                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-zinc-100">Gallery</h2>
                    <div
                        className={`grid gap-4 ${project.media.length === 1
                                ? "grid-cols-1"
                                : project.media.length === 2
                                    ? "grid-cols-1 sm:grid-cols-2"
                                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            }`}
                    >
                        {project.media.map((m, i) => (
                            <figure
                                key={i}
                                className="rounded-2xl overflow-hidden ring-1 ring-zinc-800 bg-zinc-900/40"
                            >
                                {/*m.type === "youtube" ? (
                                    <div className="aspect-video w-full rounded-2xl overflow-hidden ring-1 ring-zinc-800">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${m.id}`}
                                            title={m.alt ?? project.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    </div>
                                ) :*/
                                    m.type === "image" ? (
                                    <img src={m.src} alt={m.alt} className="w-full h-full object-cover" />
                                ) : (
                                    <video src={m.src} controls className="w-full h-full" />
                                )}
                                {m.caption && (
                                    <figcaption className="p-3 text-xs text-zinc-400">
                                        {m.caption}
                                    </figcaption>
                                )}
                            </figure>
                        ))}
                    </div>
                </section>
            
            )}
        </article>
    );
}
