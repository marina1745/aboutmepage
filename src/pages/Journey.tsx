import { motion } from "framer-motion";


import imgF from "../assets/mypictures/dqisland.jpeg";
export default function Journey() {
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
                    My Computer Science Journey
                </motion.h1>

                {/* Early life */}
                <section className="mt-10 grid gap-6 md:grid-cols-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4 }}
                        className="md:col-span-8"
                    >
                        <h2 className="font-serif text-2xl md:text-3xl">Early spark</h2>
                        <p className="mt-3 text-zinc-300 md:text-lg">
                            I grew up playing video games endlessly — fascinated by how entire worlds could exist inside a computer.
                            During middle school, I naturally gravitated toward the natural sciences, but I had no clear idea of what I wanted to do in life. 
                            That changed when I visited the <em>Tag der offenen Tür</em> at HTBLA Kaindorf. 
                            I was so captivated by what the teachers showed us that I stayed until they closed the doors. 
                            From that moment on, I had a new goal: to find out <strong>how computers really work.</strong>
                        </p>
                    </motion.div>
                    <motion.aside
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="md:col-span-4"
                    >

                       
                        <img
                            src={imgF}
                            alt="My obsession"
                            className="w-full rounded-2xl object-cover md:h-64 lg:h-80"
                        />
                        <p className="mt-2 text-sm text-zinc-400 text-center">My obsession</p>
                    </motion.aside>
                </section>

                {/* High school */}
                <section className="mt-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-serif text-2xl md:text-3xl"
                    >
                        HTBLA Kaindorf
                    </motion.h2>
                    <p className="mt-3 text-zinc-300 md:text-lg">
                        I finished high school as <em>Jahrgangsbeste</em> — top of my class. 
                        There, I learned software engineering, project management, and programming in Java and C/C++. 
                        My favorite elective was <em>Games Programming</em>, which combined logic, art, and interactivity. 
                        Yet even after five years, I still felt that I hadn’t truly understood how computers worked underneath it all.
                    </p>
                </section>

                {/* Bachelor */}
                <section className="mt-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-serif text-2xl md:text-3xl"
                    >
                        Bachelor at TUM – Informatics: Games Engineering
                    </motion.h2>
                    <p className="mt-3 text-zinc-300 md:text-lg">
                        While researching universities, I discovered the <strong>Games Engineering program at TUM</strong>. 
                        The curriculum instantly fascinated me: rendering, game physics, a touch of design, and a solid foundation in computer science. 
                        So I moved to Germany to study there, where I created multiple game projects during my Bachelor’s. 
                        I loved how each project merged <em>creativity</em> and <em>engineering</em> - two sides of what I love most.
                    </p>
                </section>

                {/* Master */}
                <section className="mt-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-serif text-2xl md:text-3xl"
                    >
                        Master's in Informatics – Visual Computing & XR
                    </motion.h2>
                    <p className="mt-3 text-zinc-300 md:text-lg">
                        For my Master’s, I specialized in <strong>Visual Computing, Rendering, and VR/XR</strong> — 
                        a natural continuation of what fascinated me during my Bachelor. 
                        My focus shifted toward “future topics”: improving 3D graphics and exploring emerging technologies like XR. 
                        I began conducting research projects, analyzing data in Python, and writing my master thesis in visual computing.
                        I also delved into how <strong>AI models</strong> are used in graphics — learning how they are trained and how they shape the next generation of rendering.
                    </p>
                </section>

                {/* Theory / Low-level */}
                <section className="mt-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-serif text-2xl md:text-3xl"
                    >
                        Diving deeper – the low level side
                    </motion.h2>
                    <p className="mt-3 text-zinc-300 md:text-lg">
                        After years of programming, I realized I still wanted to understand the <em>real</em> mechanisms beneath everything. 
                        That curiosity led me to theoretical and low-level courses: automata and complexity theory, 
                        databases and memory management, and even GPU programming with CUDA and assembly-level reasoning. 
                        These gave me a new appreciation for how deeply layered computer systems really are. I also started teaching Theory of Computation as a tutor at university.
                    </p>
                </section>

                {/* Closing reflection */}
                <section className="mt-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-serif text-2xl md:text-3xl"
                    >
                        Looking ahead
                    </motion.h2>
                    <p className="mt-3 text-zinc-300 md:text-lg">
                        My journey through computer science has been shaped by curiosity — 
                        from wondering how Pokémon battles were possible on a Game Boy to exploring real-time rendering, VR, and AI models today.
                        What keeps me motivated is the same question that started it all: 
                        <strong>how does it really work? And how can we make it even better?</strong>
                    </p>
                </section>
            </main>
        </div>
    );
}
