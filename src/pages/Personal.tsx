import { motion } from "framer-motion";

export default function Personal() {
    return (
        <div className="min-h-screen bg-[#0E0E10] text-zinc-200 antialiased">
            <main className="mx-auto max-w-5xl px-5 py-20">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-serif text-4xl md:text-5xl"
                >
                    Personal Information
                </motion.h1>

                {/* Manifesto / values */}
                
                    <section className="mt-10 grid gap-6 md:grid-cols-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.4 }}
                            className="md:col-span-8"
                        >
                            <h2 className="font-serif text-2xl md:text-3xl">Small girl with big dreams</h2>
                            <p className="mt-3 text-zinc-300 md:text-lg">
                            I grew up in a small Austrian town, surrounded by vineyards, cornfields, and routine.
                            At some point I realized I wanted to see what lay beyond both - so I left, curious to explore the world and understand how it works.
                            Along the way, I moved often, met people from every kind of background, and learned as much about myself as I did about others.
                            Change became my constant, curiosity my rhythm.
And ever since the day a four-year-old me first obsessed over Pokemon Stadium 2, technology has stayed the quiet thread running through it all.</p>
                        </motion.div>

                        <motion.aside
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.4, delay: 0.05 }}
                            className="md:col-span-4"
                        >
                            <img
                                src="/mypictures/image0 (1).jpeg"
                                alt="look 1"
                                className="w-full rounded-2xl object-cover md:h-64 lg:h-80"
                            />
                        </motion.aside>
                  
                    {/*
                    <motion.aside
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="md:col-span-5 md:pl-8"
                    >
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                            <h3 className="font-serif text-xl">Currently into</h3>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {[
                                    "XR graphics",
                                    "shader studies",
                                    "alt fashion",
                                    "long runs",
                                    "otome lore",
                                ].map((t) => (
                                    <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-300">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.aside>*/}
                </section>
                <section>
                    <motion.h2 
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-serif text-2xl md:text-3xl"
                    >
                        Recent events
                    </motion.h2>
                    {/* Vertical line on the left */}
                    <div className="mt-8 border-l border-white/10">
                        {[
                            { year: "NOW", text: "Finishing my Master's, started my master thesis" },
                            { year: "2024", text: "Research project in VR/XR" },
                            { year: "2023-2024", text: "Exploring Japan & Asia" }, // use EN DASH
                            { year: "2023", text: "Finished my Games Engineering Bachelor" },
                        ].map((i) => (
                            // Each row: relative so the dot can anchor to it; padding makes gutter
                            <div key={i.year} className="relative pl-12 py-3">
                                {/* DOT — centered on the line and vertically centered in the row */}
                                <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-zinc-300" />

                                {/* TEXT */}
                                <p className="text-sm leading-5 uppercase tracking-wide text-zinc-400">{i.year}</p>
                                <p className="mt-1 text-zinc-300">{i.text}</p>
                            </div>
                        ))}
                    </div>

                </section>


                {/* Cards: favorites / aesthetics / fun facts */}
                <section className="mt-16 grid gap-6 md:grid-cols-12">
                    {/* Favorites */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4 }}
                        className="md:col-span-4"
                    >
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                            <h3 className="font-serif text-xl">Favorites</h3>
                            <ul className="mt-3 space-y-2 text-zinc-300">
                                <li><span className="text-zinc-400">Games: </span>RPGs, Strategy, City-Builder</li>
                                <li><span className="text-zinc-400">Coffee: </span>Milk but no sugar</li>
                                <li><span className="text-zinc-400">Palette: </span>monochrome + carmine red or royal blue</li>
                                <li><span className="text-zinc-400">Pet: </span>Cats</li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="md:col-span-5"
                    >
                        <div className="rounded-2xl border border-white/10 p-1">
                            <div className="grid grid-cols-3 gap-2">
                                {/* Replace src with your own /assets images */}
                                <img src="/mypictures/image0 (7).jpeg" alt="look 1" className="aspect-square w-full rounded-xl object-cover" />
                                <img src="/mypictures/image0 (6).jpeg" alt="look 2" className="aspect-square w-full rounded-xl object-cover" />
                                <img src="/mypictures/image0 (2).jpeg" alt="moodboard" className="aspect-square w-full rounded-xl object-cover" />
                                <img src="/mypictures/image0 (3).jpeg" alt="outfit 2" className="aspect-square w-full rounded-xl object-cover" />
                                <img src="/mypictures/image0 (4).jpeg" alt="shader art" className="aspect-square w-full rounded-xl object-cover" />
                                <img src="/mypictures/image0 (5).jpeg" alt="scenery" className="aspect-square w-full rounded-xl object-cover" />
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-zinc-400 text-center">Spooky make-up display</p>
                    </motion.div>

                    {/* Fun facts */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4, delay: 0.08 }}
                        className="md:col-span-3"
                    >
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                            <h3 className="font-serif text-xl">Music interests</h3>
                            <ul className="mt-3 list-disc pl-5 text-zinc-300">
                                <li>Passionate guitarist & pianist</li>
                                <li>Played in orchestra, jazz band, Austrian traditional music group</li>
                                <li>Passionate VKei lover (which explains the aesthetics)</li>
                            </ul>
                        </div>
                    </motion.div>
                </section>

                {/* CTA */}
                <section className="mt-16">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <h3 className="font-serif text-xl">Let's have a chat!</h3>
                        <p className="mt-2 text-zinc-300">
                            Want to talk to me about computer science, research, video games, fashion or music? 
                        </p>
                        <div className="mt-4">
                            <a href="mailto:marina.weber@tum.de" className="rounded-2xl bg-white text-black px-5 py-3 text-sm font-semibold tracking-wide inline-flex items-center">
                                Email me
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
