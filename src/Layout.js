import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation, Link } from "react-router-dom";
export default function Layout({ children }) {
    return (_jsxs("div", { className: "min-h-screen bg-[#0E0E10] text-zinc-200 antialiased", children: [_jsx(TopBar, {}), _jsx("main", { children: children }), _jsx(Footer, {})] }));
}
function Footer() {
    return (_jsx("footer", { className: "border-t border-white/10", children: _jsxs("div", { className: "mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 md:flex-row", children: [_jsxs("p", { className: "text-sm text-zinc-500", children: ["\u00A9", " ", new Date().getFullYear(), " Marina Weber"] }), _jsxs("div", { className: "flex gap-6 text-sm text-zinc-400", children: [_jsx(Link, { to: "/impressum", className: "hover:text-zinc-200", children: "Legal Notice" }), _jsx(Link, { to: "/privacy", className: "hover:text-zinc-200", children: "Privacy Policy" })] })] }) }));
}
function TopBar() {
    const { pathname } = useLocation();
    const showMenu = pathname === "/";
    const location = useLocation();
    const atHome = location.pathname === "/";
    const smoothScroll = (id) => {
        const el = document.getElementById(id);
        if (el)
            el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const makeLink = (id, label) => (_jsx("a", { href: atHome ? `#${id}` : `/#${id}`, onClick: (e) => {
            if (atHome) {
                e.preventDefault();
                smoothScroll(id);
            }
        }, className: "navlink", children: label }));
    return (_jsx("header", { className: "sticky top-0 z-50 border-b border-white/10 bg-[#0E0E10]/70 backdrop-blur", children: _jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-4", children: [_jsx("a", { href: "/", className: "font-semibold tracking-wide", children: _jsx("span", { className: "font-serif text-xl", children: "Marina\u00A0Weber" }) }), showMenu &&
                    _jsxs("nav", { className: "hidden gap-7 text-sm md:flex", children: [makeLink("work", "Work"), makeLink("writing", "Academic papers"), makeLink("about", "About"), makeLink("contact", "Contact")] })] }) }));
}
