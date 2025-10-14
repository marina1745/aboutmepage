
import type { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
    
    return (
        <div className="min-h-screen bg-[#0E0E10] text-zinc-200 antialiased">
            <TopBar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

function Footer() {
    return (
        <footer className="border-t border-white/10">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 md:flex-row">
                <p className="text-sm text-zinc-500">
                    {"\u00A9"} {new Date().getFullYear()} Marina Weber
                </p>
                <div className="flex gap-6 text-sm text-zinc-400">
                    {/* HashRouter links – change to BrowserRouter <Link to="/impressum"> if you switched */}
                    <Link to="/impressum" className="hover:text-zinc-200">Legal Notice</Link>
                    <Link to="/privacy" className="hover:text-zinc-200">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}

function TopBar() {
    const { pathname } = useLocation();
    const showMenu = pathname === "/"; 

    const location = useLocation();
    const atHome = location.pathname === "/";

    const smoothScroll = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const makeLink = (id: string, label: string) => (
        <a
            href={atHome ? `#${id}` : `/#${id}`}
            onClick={(e) => {
                if (atHome) {
                    e.preventDefault();
                    smoothScroll(id);
                }
            }}
            className="navlink"
        >
            {label}
        </a>
    );

    return (
        
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0E0E10]/70 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                <a href="/" className="font-semibold tracking-wide">
                    <span className="font-serif text-xl">Marina&nbsp;Weber</span>
                </a>
               
                {showMenu &&
                    <nav className="hidden gap-7 text-sm md:flex">
                        {/* Use absolute hash links so they work from subpages too */}
                        {makeLink("work", "Work")}
                        {makeLink("writing", "Academic papers")}
                        {makeLink("about", "About")}
                        {makeLink("contact", "Contact")}
                    </nav>
                }
            </div>
        </header>
    );
}
