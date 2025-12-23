import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "../../lib/projects";

const tabs = [
    {key: "academic", label: "Theses & Research"},
    { key: "game", label: "Game Projects" },
    { key: "non-game", label: "Other" },
] as const;

export default function ArchivePage() {
    const [sp, setSp] = useSearchParams();
    const navigate = useNavigate();
    sessionStorage.setItem("from", "archive");
    useEffect(() => {
        if (!sp.get("type")) {
            navigate("/archive?type=game", { replace: true });
        }
    }, [sp, navigate]);

    const active = (sp.get("type") ?? "game") as "game" | "non-game" | "academic";
    const filtered = projects.filter(p => p.category === active);

    useEffect(() => {
        const q = sp.get("type");
        if (!q) {
            const saved = sessionStorage.getItem("archiveType") as "game" | "non-game" | "academic"| null;
            const fallback = saved ?? "game";
            sessionStorage.setItem("archiveType", fallback);
            navigate(`/archive?type=${fallback}`, { replace: true });
        } else {
            sessionStorage.setItem("archiveType", q as "game" | "non-game" | "academic");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="py-8">
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">

                    <h1 className="text-3xl font-semibold">Archive</h1>
                    <div className="w-full sm:w-auto sm:ml-auto inline-flex rounded-full bg-zinc-900/60 p-1 ring-1 ring-zinc-800">

                        <div className="ml-auto inline-flex max-w-full rounded-full bg-zinc-900/60 p-1 ring-1 ring-zinc-800 overflow-x-auto [-webkit-overflow-scrolling:touch]">
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
        className={`shrink-0 whitespace-nowrap rounded-full text-center transition
          px-3 py-1 text-xs
          sm:px-4 sm:py-1.5 sm:text-sm sm:w-40
          ${isActive
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
            </div>

            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map(p => (
                        <Link
                            key={p.slug}
                            to={`/work/${p.slug}`}
                            className="flex-1 min-w-0 px-3 py-1 text-xs sm:flex-none sm:w-40 sm:px-4 sm:py-1.5 sm:text-sm rounded-full text-center whitespace-nowrap transition "
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
                        src="marina2D/MarinaComm2.png"
                        alt="Archive footer illustration"
                        className="mx-auto mb-4 max-w-xs rounded-xl opacity-90"
                    />
                    <p className="text-sm text-zinc-400 italic">
                        The archive is under construction and will be updated.
                    </p>
                </div>
            </div>
        </section>
    );
}
