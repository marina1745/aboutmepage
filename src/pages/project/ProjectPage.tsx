// src/pages/project/ProjectPage.tsx
import { useParams, Link } from "react-router-dom";
import { useMemo} from "react";
import { projects } from "../../lib/projects";

export default function ProjectPage() {
    const { slug } = useParams<{ slug: string }>();
    const project = projects.find(p => p.slug === slug);
    
    const backType = useMemo(
        () => (sessionStorage.getItem("archiveType") as "game" | "non-game") ?? "non-game",
        []
    );
    const cameFrom = useMemo(
        () => (sessionStorage.getItem("from") as "home" | "archive") ?? "archive",
        []
    );
    const backHref = cameFrom === "home" ? "/" : `/archive?type=${backType}`;
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

{/* Action bar: GitHub button only when provided */}
        {project.github && (
          <div className="mt-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900/40 px-3 py-1.5 text-sm text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800 hover:text-white"
            >
              {/* tiny GitHub mark (svg) */}
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
                <path
                  fill="currentColor"
                  d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38
                  0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
                  1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                  0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82a7.62 7.62 0 0 1 2-.27c.68 0 1.36.09
                  2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.15
                  0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19
                  0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                />
              </svg>
              View on GitHub
            </a>
          </div>
        )}



{project.links && project.links.length > 0 && (
  <div className="mt-3 flex flex-wrap gap-3">
    {project.links.map(l => (
      <a
        key={l.href}
        href={l.href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl border border-white/20 px-3 py-1 text-sm hover:bg-white/10"
      >
        {l.label}
      </a>
    ))}
  </div>
)}



            {/* Media Gallery */}
            
            {project.media && project.media.length > 0 && (
                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-zinc-100">Gallery</h2>
                    <div
                        className={`grid gap-4 ${project.media.length === 1
                                ? "grid-cols-3"
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
                                  m.type === "audio" ? (
            <audio
              src={m.src}
              controls
              className="w-full"
            />) :
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
