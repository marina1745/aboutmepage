import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0E0E10] text-zinc-200 antialiased">
            <TopBar />
            <div>{children}</div>
            <Footer />
        </div>
    );
}
function Footer() {
    return (
        <footer className="border-t border-white/10">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 md:flex-row">
                <p className="text-sm text-zinc-500">
                    © {new Date().getFullYear()} Marina Weber
                </p>
                <footer className="...">
                    <div className="flex gap-6 text-sm text-zinc-400">
                        <Link to="/impressum" className="hover:text-zinc-200">Legal Notice</Link>
                        <Link to="/privacy" className="hover:text-zinc-200">Privacy Policy</Link>
                    </div>
                </footer>
            </div>
        </footer>

    );
}
function TopBar() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0E0E10]/70 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                <a href="#top" className="font-semibold tracking-wide">
                    <span className="font-serif text-xl">Marina&nbsp;Weber</span>
                </a>
                <nav className="hidden gap-7 text-sm md:flex">
                    <a className="text-zinc-300 hover:text-white tracking-wide" href="#work">Work</a>
                    <a className="text-zinc-300 hover:text-white tracking-wide" href="#writing">Writing</a>
                    <a className="text-zinc-300 hover:text-white tracking-wide" href="#about">About</a>
                    <a className="text-zinc-300 hover:text-white tracking-wide" href="#contact">Contact</a>
                </nav>

            </div>
        </header>
    );
}