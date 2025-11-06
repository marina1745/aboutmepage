import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "../../lib/projects";
const tabs = [
    { key: "game", label: "Game Projects" },
    { key: "non-game", label: "Non-Game Projects" },
];
export default function ArchivePage() {
    const [sp, setSp] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (!sp.get("type")) {
            navigate("/archive?type=game", { replace: true });
        }
    }, [sp, navigate]);
    const active = (sp.get("type") ?? "game");
    const filtered = projects.filter(p => p.category === active);
    useEffect(() => {
        const q = sp.get("type");
        if (!q) {
            const saved = sessionStorage.getItem("archiveType");
            const fallback = saved ?? "game";
            sessionStorage.setItem("archiveType", fallback);
            navigate(`/archive?type=${fallback}`, { replace: true });
        }
        else {
            sessionStorage.setItem("archiveType", q);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (_jsxs("section", { className: "py-8", children: [_jsx("div", { className: "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "mb-6 flex items-center gap-4", children: [_jsx("h1", { className: "text-3xl font-semibold", children: "Archive" }), _jsx("div", { className: "ml-auto inline-flex rounded-full bg-zinc-900/60 p-1 ring-1 ring-zinc-800", children: tabs.map(t => {
                                const isActive = t.key === active;
                                return (_jsx("button", { onClick: () => {
                                        sp.set("type", t.key);
                                        setSp(sp, { replace: true });
                                        sessionStorage.setItem("from", "archive");
                                        sessionStorage.setItem("archiveType", t.key);
                                    }, className: `px-4 py-1.5 text-sm rounded-full transition ${isActive
                                        ? "bg-zinc-100 text-zinc-900"
                                        : "text-zinc-300 hover:text-white hover:bg-zinc-800/70"}`, children: t.label }, t.key));
                            }) })] }) }), _jsxs("div", { className: "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: filtered.map(p => (_jsxs(Link, { to: `/work/${p.slug}`, className: "group block rounded-2xl bg-zinc-900/60 ring-1 ring-zinc-800 p-5 hover:bg-zinc-900 hover:ring-zinc-700 transition", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsx("h3", { className: "text-lg font-medium text-zinc-100", children: p.title }), _jsx("span", { className: "text-zinc-400 group-hover:translate-x-0.5 transition", children: "\u2192" })] }), _jsx("p", { className: "mt-2 text-sm text-zinc-400", children: p.summary }), !!p.tags?.length && (_jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: p.tags.map(t => (_jsx("span", { className: "text-[11px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 ring-1 ring-zinc-700", children: t }, t))) }))] }, p.slug))) }), _jsxs("div", { className: "mt-12 text-center border-t border-zinc-800 pt-8", children: [_jsx("img", { src: "marina2D/MarinaComm2.png", alt: "Archive footer illustration", className: "mx-auto mb-4 max-w-xs rounded-xl opacity-90" }), _jsx("p", { className: "text-sm text-zinc-400 italic", children: "The archive is under construction and will be updated." })] })] })] }));
}
