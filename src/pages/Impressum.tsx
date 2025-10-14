export default function Impressum() {
    return (
        <div className="min-h-screen bg-[#0E0E10] text-zinc-200 antialiased">
           
        <main className="mx-auto max-w-3xl px-5 py-20 text-zinc-200">
            <h1 className="font-serif text-4xl mb-6">Legal Notice (Impressum)</h1>

            <p>This website is a private, non-commercial portfolio created and maintained by:</p>

            <p className="mt-4">
                <strong>Marina Weber</strong><br />
                Email:{" "}
                <a
                    href="mailto:marina@example.com"
                    className="underline hover:text-white"
                >
                    marina.weber@tum.de
                </a>
            </p>

            <p className="mt-6">
                To protect personal privacy, the full postal address is not published
                    online. In accordance with {"\u00A7" } 5 TMG, complete provider information can
                be provided upon legitimate request via email.
            </p>

            <p className="mt-10 text-sm text-zinc-400">
                    {"\u00A9"} {new Date().getFullYear()} Marina Weber
            </p>
            </main>
        </div>
    );
}
