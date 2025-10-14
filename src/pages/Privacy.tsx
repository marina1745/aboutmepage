export default function Privacy() {
    return (
        <div className="min-h-screen bg-[#0E0E10] text-zinc-200 antialiased">
            
        <main className="mx-auto max-w-3xl px-5 py-20 text-zinc-200">
            <h1 className="font-serif text-4xl mb-6">Privacy Policy</h1>

            <p>
                This website does not collect, store, or process any personal data. No
                cookies, analytics tools, or tracking services are used. No embedded
                third-party content (such as videos, maps, or fonts loaded from external
                servers) is included.
            </p>

            <h2 className="font-serif text-2xl mt-10 mb-3">Contact by email</h2>
            <p>
                If you contact me by email, your message will be processed solely for
                the purpose of responding to your inquiry. It will not be shared with
                third parties.
            </p>

            <h2 className="font-serif text-2xl mt-10 mb-3">
                Responsible entity (Article 4 (7) GDPR)
            </h2>
            <p>
                Marina Weber<br />
                Email:{" "}
                <a
                    href="mailto:marina.weber@tum.de"
                    className="underline hover:text-white"
                >
                    marina.weber@tum.de
                </a>
            </p>

            <h2 className="font-serif text-2xl mt-10 mb-3">Hosting</h2>
            <p>
                This website is hosted within the European Union. Access logs are stored
                by the hosting provider only to ensure technical operation and security
                of the website and are automatically deleted after a short period.
            </p>

           
            </main>
        </div>
    );
}
