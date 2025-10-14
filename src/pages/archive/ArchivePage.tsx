import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "../../lib/projects";

const tabs = [
    { key: "game", label: "Game Projects" },
    { key: "non-game", label: "Non-Game Projects" },
] as const;

export default function ArchivePage() {
    const [sp, setSp] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sp.get("type")) {
            navigate("/archive?type=game", { replace: true });
        }
    }, [sp, navigate]);

    const active = (sp.get("type") ?? "game") as "game" | "non-game";
    const filtered = projects.filter(p => p.category === active);

    useEffect(() => {
        const q = sp.get("type");
        if (!q) {
            const saved = sessionStorage.getItem("archiveType") as "game" | "non-game" | null;
            const fallback = saved ?? "game";
            sessionStorage.setItem("archiveType", fallback);
            navigate(`/archive?type=${fallback}`, { replace: true });
        } else {
            sessionStorage.setItem("archiveType", q as "game" | "non-game");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="py-8">
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center gap-4">
                    <h1 className="text-3xl font-semibold">Archive</h1>

                    <div className="ml-auto inline-flex rounded-full bg-zinc-900/60 p-1 ring-1 ring-zinc-800">
                        {tabs.map(t => {
                            const isActive = t.key === active;
                            return (
                                <button
                                    key={t.key}
                                    onClick={() => {
                                        sp.set("type", t.key);
                                        setSp(sp, { replace: true });
                                        sessionStorage.setItem("from", "archive");
                                        sessionStorage.setItem("archiveType", t.key);
                                    }}
                                    className={`px-4 py-1.5 text-sm rounded-full transition ${isActive
                                            ? "bg-zinc-100 text-zinc-900"
                                            : "text-zinc-300 hover:text-white hover:bg-zinc-800/70"
                                        }`}
                                >
                                    {t.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map(p => (
                        <Link
                            key={p.slug}
                            to={`/work/${p.slug}`}
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

                {/* Footer section */}
                <div className="mt-12 text-center border-t border-zinc-800 pt-8">
                    <img
                        src="projectmedia/kaindorf.PNG"
                        alt="Archive footer illustration"
                        className="mx-auto mb-4 max-w-xs rounded-xl opacity-90"
                    />
                    <p className="text-sm text-zinc-400 italic">
                        This list is not exhaustive and will be updated.
                    </p>
                </div>
            </div>
        </section>
    );
}
